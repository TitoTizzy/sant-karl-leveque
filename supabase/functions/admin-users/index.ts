import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

type AppRole = "super_admin" | "admin" | "editor" | "publisher" | "viewer";
type AdminAction = "list" | "invite" | "update" | "remove";

const allowedRoles = new Set<AppRole>(["super_admin", "admin", "editor", "publisher", "viewer"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function response(request: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request) });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(request) });
  if (request.method !== "POST") return response(request, { error: "Méthode non autorisée." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const publishableKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !publishableKey || !serviceRoleKey) {
    return response(request, { error: "Configuration serveur incomplète." }, 500);
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return response(request, { error: "Session requise." }, 401);

  const callerClient = createClient(supabaseUrl, publishableKey, {
    global: { headers: { Authorization: authorization } },
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const token = authorization.slice("Bearer ".length);
  const { data: userData, error: userError } = await callerClient.auth.getUser(token);
  if (userError || !userData.user) return response(request, { error: "Session invalide ou expirée." }, 401);

  const { data: caller, error: profileError } = await serviceClient
    .from("profiles")
    .select("id, role, is_active")
    .eq("id", userData.user.id)
    .single();
  if (profileError || !caller?.is_active || caller.role !== "super_admin") {
    return response(request, { error: "Cette action est réservée au super administrateur." }, 403);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return response(request, { error: "Corps de requête JSON invalide." }, 400);
  }

  const action = payload.action as AdminAction;
  if (!(["list", "invite", "update", "remove"] as AdminAction[]).includes(action)) {
    return response(request, { error: "Action inconnue." }, 400);
  }

  try {
    if (action === "list") {
      const { data: profiles, error } = await serviceClient
        .from("profiles")
        .select("id, email, full_name, role, is_active, last_seen_at, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return response(request, { users: profiles });
    }

    if (action === "invite") {
      const email = String(payload.email ?? "").trim().toLowerCase();
      const fullName = String(payload.fullName ?? "").trim();
      const role = String(payload.role ?? "editor") as AppRole;
      if (!emailPattern.test(email)) return response(request, { error: "Adresse courriel invalide." }, 422);
      if (fullName.length < 2 || fullName.length > 160) return response(request, { error: "Nom invalide." }, 422);
      if (!allowedRoles.has(role)) return response(request, { error: "Rôle invalide." }, 422);

      const redirectTo = `${Deno.env.get("ADMIN_SITE_URL") ?? "https://admin.santkarlleveque.com"}/`;
      const { data, error } = await serviceClient.auth.admin.inviteUserByEmail(email, {
        redirectTo,
        data: { full_name: fullName }
      });
      if (error) throw error;

      const { error: updateError } = await serviceClient
        .from("profiles")
        .upsert({ id: data.user.id, email, full_name: fullName, role, is_active: true });
      if (updateError) {
        await serviceClient.auth.admin.deleteUser(data.user.id);
        throw updateError;
      }
      await serviceClient.auth.admin.updateUserById(data.user.id, { app_metadata: { user_role: role } });
      await serviceClient.from("audit_logs").insert({
        actor_id: caller.id,
        action: "admin.invite",
        entity_table: "profiles",
        entity_id: data.user.id,
        new_values: { email, full_name: fullName, role, is_active: true }
      });
      return response(request, { user: { id: data.user.id, email, full_name: fullName, role, is_active: true } }, 201);
    }

    const userId = String(payload.userId ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(userId)) return response(request, { error: "Identifiant utilisateur invalide." }, 422);
    if (userId === caller.id && action === "remove") {
      return response(request, { error: "Vous ne pouvez pas supprimer votre propre compte." }, 409);
    }

    const { data: target, error: targetError } = await serviceClient
      .from("profiles")
      .select("id, email, full_name, role, is_active")
      .eq("id", userId)
      .single();
    if (targetError || !target) return response(request, { error: "Administrateur introuvable." }, 404);

    if (action === "update") {
      const role = String(payload.role ?? target.role) as AppRole;
      const isActive = typeof payload.isActive === "boolean" ? payload.isActive : target.is_active;
      if (!allowedRoles.has(role)) return response(request, { error: "Rôle invalide." }, 422);
      if (userId === caller.id && (role !== "super_admin" || !isActive)) {
        return response(request, { error: "Vous ne pouvez pas retirer votre propre accès super administrateur." }, 409);
      }

      const { data: updated, error } = await serviceClient
        .from("profiles")
        .update({ role, is_active: isActive })
        .eq("id", userId)
        .select("id, email, full_name, role, is_active, last_seen_at, created_at")
        .single();
      if (error) throw error;
      await serviceClient.auth.admin.updateUserById(userId, {
        app_metadata: { user_role: role },
        ban_duration: isActive ? "none" : "876000h"
      });
      await serviceClient.from("audit_logs").insert({
        actor_id: caller.id,
        action: isActive ? "admin.update" : "admin.suspend",
        entity_table: "profiles",
        entity_id: userId,
        old_values: target,
        new_values: updated
      });
      return response(request, { user: updated });
    }

    const { error: deleteError } = await serviceClient.auth.admin.deleteUser(userId);
    if (deleteError) throw deleteError;
    await serviceClient.from("audit_logs").insert({
      actor_id: caller.id,
      action: "admin.remove",
      entity_table: "profiles",
      entity_id: userId,
      old_values: target
    });
    return response(request, { success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Une erreur serveur est survenue.";
    return response(request, { error: message }, 500);
  }
});

