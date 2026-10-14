const configuredOrigin = Deno.env.get("ADMIN_SITE_URL") ?? "https://admin.santkarlleveque.com";

export function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  const allowedOrigin = origin === configuredOrigin || isLocal ? origin : configuredOrigin;

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin"
  };
}

