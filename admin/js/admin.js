import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const config = window.SKL_ADMIN_CONFIG ?? {};
const allowedDevelopmentHosts = new Set(["localhost", "127.0.0.1", ""]);
const isPublicGitHubHost = location.hostname.endsWith("github.io");

if (isPublicGitHubHost) {
  location.replace(config.publicSiteUrl || "../index.html");
}

const selectors = {
  setup: document.querySelector("[data-setup-screen]"),
  auth: document.querySelector("[data-auth-screen]"),
  app: document.querySelector("[data-admin-app]"),
  loginForm: document.querySelector("[data-login-form]"),
  loginMessage: document.querySelector("[data-login-message]"),
  loginSubmit: document.querySelector("[data-login-submit]"),
  inviteDialog: document.querySelector("[data-invite-dialog]"),
  inviteForm: document.querySelector("[data-invite-form]"),
  inviteMessage: document.querySelector("[data-invite-message]"),
  usersBody: document.querySelector("[data-users-body]"),
  userResults: document.querySelector("[data-user-results]"),
  userSearch: document.querySelector("[data-user-search]"),
  toastRegion: document.querySelector("[data-toast-region]")
};

const roleLabels = {
  super_admin: "Super administrateur",
  admin: "Administrateur",
  editor: "Éditeur",
  publisher: "Responsable de publication",
  viewer: "Lecteur"
};

let supabase;
let currentProfile = null;
let administrators = [];

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function setScreen(screen) {
  selectors.setup.hidden = screen !== "setup";
  selectors.auth.hidden = screen !== "auth";
  selectors.app.hidden = screen !== "app";
  requestAnimationFrame(refreshIcons);
}

function setPending(button, pending, pendingLabel = "Traitement...") {
  if (!button) return;
  if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.querySelector("span")?.textContent ?? button.textContent;
  button.disabled = pending;
  const label = button.querySelector("span");
  if (label) label.textContent = pending ? pendingLabel : button.dataset.defaultLabel;
}

function showMessage(element, message = "", success = false) {
  element.textContent = message;
  element.classList.toggle("is-success", success);
}

function toast(message, type = "success") {
  const element = document.createElement("div");
  element.className = `toast${type === "error" ? " error" : ""}`;
  element.textContent = message;
  selectors.toastRegion.append(element);
  window.setTimeout(() => element.remove(), 4500);
}

function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "SK";
}

function formatDate(value) {
  if (!value) return "Jamais";
  return new Intl.DateTimeFormat("fr-HT", { dateStyle: "medium" }).format(new Date(value));
}

async function invokeAdmin(action, payload = {}) {
  const { data, error } = await supabase.functions.invoke("admin-users", { body: { action, ...payload } });
  if (error) {
    let message = error.message;
    try {
      const context = await error.context?.json();
      if (context?.error) message = context.error;
    } catch {}
    throw new Error(message || "L’opération a échoué.");
  }
  if (data?.error) throw new Error(data.error);
  return data;
}

async function loadProfile(user) {
  const { data, error } = await supabase.from("profiles").select("id, email, full_name, role, is_active").eq("id", user.id).single();
  if (error || !data) throw new Error("Votre profil administratif n’est pas configuré.");
  if (!data.is_active) throw new Error("Ce compte administratif est suspendu.");
  currentProfile = data;
  document.querySelector("[data-user-name]").textContent = data.full_name || user.email;
  document.querySelector("[data-user-email]").textContent = user.email;
  document.querySelector("[data-user-role]").textContent = roleLabels[data.role] ?? data.role;
  document.querySelector("[data-user-initials]").textContent = initials(data.full_name);
  const adminLink = document.querySelector('[data-view-link="administrators"]');
  const inviteButton = document.querySelector("[data-open-invite]");
  const canManageAdmins = data.role === "super_admin";
  adminLink.hidden = !canManageAdmins;
  inviteButton.hidden = !canManageAdmins;
  return data;
}

async function initializeSession() {
  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    setScreen("setup");
    return;
  }
  const isExpectedHost = location.hostname === "admin.santkarlleveque.com" || allowedDevelopmentHosts.has(location.hostname);
  if (!isExpectedHost) {
    location.replace(config.publicSiteUrl || "../index.html");
    return;
  }
  supabase = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    setScreen("auth");
    return;
  }
  try {
    await loadProfile(session.user);
    setScreen("app");
    await loadAdministrators();
  } catch (error) {
    await supabase.auth.signOut();
    setScreen("auth");
    showMessage(selectors.loginMessage, error.message);
  }
}

async function loadAdministrators() {
  if (currentProfile?.role !== "super_admin") return;
  selectors.userResults.textContent = "Chargement des comptes...";
  try {
    const data = await invokeAdmin("list");
    administrators = data.users ?? [];
    document.querySelector("[data-admin-count]").textContent = administrators.filter((user) => user.is_active).length;
    renderAdministrators();
  } catch (error) {
    selectors.usersBody.replaceChildren(createEmptyRow(error.message));
    selectors.userResults.textContent = "Impossible de charger les comptes.";
  }
}

function createEmptyRow(message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 5;
  cell.className = "empty-state";
  cell.textContent = message;
  row.append(cell);
  return row;
}

function createPersonCell(user) {
  const cell = document.createElement("td");
  const wrapper = document.createElement("div");
  wrapper.className = "person-cell";
  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = initials(user.full_name);
  const copy = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = user.full_name || "Nom non renseigné";
  const email = document.createElement("small");
  email.textContent = user.email;
  copy.append(name, email);
  wrapper.append(avatar, copy);
  cell.append(wrapper);
  return cell;
}

function createRoleCell(user) {
  const cell = document.createElement("td");
  const select = document.createElement("select");
  select.className = "role-select";
  select.setAttribute("aria-label", `Rôle de ${user.full_name || user.email}`);
  for (const [value, label] of Object.entries(roleLabels)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = value === user.role;
    select.append(option);
  }
  select.disabled = user.id === currentProfile.id;
  select.addEventListener("change", async () => {
    select.disabled = true;
    try {
      const data = await invokeAdmin("update", { userId: user.id, role: select.value, isActive: user.is_active });
      Object.assign(user, data.user);
      toast("Le rôle a été mis à jour.");
    } catch (error) {
      select.value = user.role;
      toast(error.message, "error");
    } finally {
      select.disabled = false;
    }
  });
  cell.append(select);
  return cell;
}

function createActionsCell(user) {
  const cell = document.createElement("td");
  const actions = document.createElement("div");
  actions.className = "row-actions";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "icon-button";
  toggle.title = user.is_active ? "Suspendre" : "Réactiver";
  toggle.setAttribute("aria-label", `${toggle.title} ${user.full_name || user.email}`);
  toggle.innerHTML = `<i data-lucide="${user.is_active ? "user-round-x" : "user-round-check"}" aria-hidden="true"></i>`;
  toggle.disabled = user.id === currentProfile.id;
  toggle.addEventListener("click", async () => {
    toggle.disabled = true;
    try {
      const data = await invokeAdmin("update", { userId: user.id, role: user.role, isActive: !user.is_active });
      Object.assign(user, data.user);
      renderAdministrators();
      toast(user.is_active ? "Le compte a été réactivé." : "Le compte a été suspendu.");
    } catch (error) {
      toggle.disabled = false;
      toast(error.message, "error");
    }
  });
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "icon-button danger";
  remove.title = "Supprimer l’accès";
  remove.setAttribute("aria-label", `Supprimer l’accès de ${user.full_name || user.email}`);
  remove.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>';
  remove.disabled = user.id === currentProfile.id;
  remove.addEventListener("click", async () => {
    const confirmed = window.confirm(`Supprimer définitivement l’accès de ${user.full_name || user.email} ?`);
    if (!confirmed) return;
    remove.disabled = true;
    try {
      await invokeAdmin("remove", { userId: user.id });
      administrators = administrators.filter((administrator) => administrator.id !== user.id);
      renderAdministrators();
      toast("L’accès administratif a été supprimé.");
    } catch (error) {
      remove.disabled = false;
      toast(error.message, "error");
    }
  });
  actions.append(toggle, remove);
  cell.append(actions);
  return cell;
}

function renderAdministrators() {
  const query = selectors.userSearch.value.trim().toLocaleLowerCase("fr");
  const filtered = administrators.filter((user) => `${user.full_name} ${user.email}`.toLocaleLowerCase("fr").includes(query));
  selectors.usersBody.replaceChildren();
  if (!filtered.length) selectors.usersBody.append(createEmptyRow("Aucun compte ne correspond à la recherche."));
  for (const user of filtered) {
    const row = document.createElement("tr");
    row.append(createPersonCell(user), createRoleCell(user));
    const stateCell = document.createElement("td");
    const state = document.createElement("span");
    state.className = `state-badge ${user.is_active ? "active" : "suspended"}`;
    state.textContent = user.is_active ? "Actif" : "Suspendu";
    stateCell.append(state);
    const dateCell = document.createElement("td");
    const time = document.createElement("time");
    time.dateTime = user.created_at;
    time.textContent = formatDate(user.created_at);
    dateCell.append(time);
    row.append(stateCell, dateCell, createActionsCell(user));
    selectors.usersBody.append(row);
  }
  selectors.userResults.textContent = `${filtered.length} compte${filtered.length > 1 ? "s" : ""}`;
  refreshIcons();
}

function showView(name) {
  if (name === "administrators" && currentProfile?.role !== "super_admin") name = "overview";
  document.querySelectorAll("[data-view]").forEach((view) => { view.hidden = view.dataset.view !== name; });
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    if (link.dataset.viewLink === name) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const title = name === "administrators" ? "Administrateurs" : "Vue d’ensemble";
  document.querySelector("[data-context-title]").textContent = title;
  history.replaceState(null, "", `#${name}`);
  document.querySelector("[data-sidebar]").classList.remove("is-open");
}

selectors.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage(selectors.loginMessage);
  if (!selectors.loginForm.reportValidity()) return;
  const data = new FormData(selectors.loginForm);
  setPending(selectors.loginSubmit, true, "Connexion...");
  const { data: result, error } = await supabase.auth.signInWithPassword({ email: data.get("email"), password: data.get("password") });
  if (error) {
    showMessage(selectors.loginMessage, "Connexion impossible. Vérifiez vos identifiants.");
    setPending(selectors.loginSubmit, false);
    return;
  }
  try {
    await loadProfile(result.user);
    setScreen("app");
    showView(location.hash.slice(1) || "overview");
    await loadAdministrators();
  } catch (profileError) {
    await supabase.auth.signOut();
    showMessage(selectors.loginMessage, profileError.message);
  } finally {
    setPending(selectors.loginSubmit, false);
  }
});

document.querySelector("[data-reset-password]").addEventListener("click", async () => {
  const email = selectors.loginForm.elements.email.value.trim();
  if (!email) {
    selectors.loginForm.elements.email.focus();
    showMessage(selectors.loginMessage, "Saisissez d’abord votre adresse courriel.");
    return;
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${config.adminSiteUrl}/` });
  showMessage(selectors.loginMessage, error ? "La demande n’a pas pu être envoyée." : "Un lien de réinitialisation a été envoyé.", !error);
});

document.querySelector("[data-toggle-password]").addEventListener("click", (event) => {
  const input = selectors.loginForm.elements.password;
  input.type = input.type === "password" ? "text" : "password";
  event.currentTarget.setAttribute("aria-label", input.type === "password" ? "Afficher le mot de passe" : "Masquer le mot de passe");
});

document.querySelectorAll("[data-view-link]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  showView(link.dataset.viewLink);
}));

document.querySelector("[data-open-invite]").addEventListener("click", () => {
  showMessage(selectors.inviteMessage);
  selectors.inviteDialog.showModal();
  document.querySelector("#invite-name").focus();
});
document.querySelectorAll("[data-close-invite]").forEach((button) => button.addEventListener("click", () => selectors.inviteDialog.close()));

selectors.inviteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectors.inviteForm.reportValidity()) return;
  const submit = document.querySelector("[data-invite-submit]");
  const data = new FormData(selectors.inviteForm);
  setPending(submit, true, "Envoi...");
  showMessage(selectors.inviteMessage);
  try {
    await invokeAdmin("invite", { fullName: data.get("fullName"), email: data.get("email"), role: data.get("role") });
    selectors.inviteForm.reset();
    selectors.inviteDialog.close();
    toast("L’invitation a été envoyée.");
    await loadAdministrators();
  } catch (error) {
    showMessage(selectors.inviteMessage, error.message);
  } finally {
    setPending(submit, false);
  }
});

selectors.userSearch.addEventListener("input", renderAdministrators);
document.querySelector("[data-sign-out]").addEventListener("click", async () => {
  await supabase.auth.signOut();
  currentProfile = null;
  setScreen("auth");
});

const accountTrigger = document.querySelector("[data-account-trigger]");
const accountPopover = document.querySelector("[data-account-popover]");
accountTrigger.addEventListener("click", () => {
  const expanded = accountTrigger.getAttribute("aria-expanded") === "true";
  accountTrigger.setAttribute("aria-expanded", String(!expanded));
  accountPopover.hidden = expanded;
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".account-menu")) {
    accountTrigger.setAttribute("aria-expanded", "false");
    accountPopover.hidden = true;
  }
});

document.querySelector("[data-sidebar-open]").addEventListener("click", () => document.querySelector("[data-sidebar]").classList.add("is-open"));
document.querySelector("[data-sidebar-close]").addEventListener("click", () => document.querySelector("[data-sidebar]").classList.remove("is-open"));
document.querySelector("[data-current-date]").dateTime = new Date().toISOString();
document.querySelector("[data-current-date]").textContent = new Intl.DateTimeFormat("fr-HT", { dateStyle: "full" }).format(new Date());

window.addEventListener("load", refreshIcons);
initializeSession();

