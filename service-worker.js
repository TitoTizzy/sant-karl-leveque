const VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const CACHE = `skl-${VERSION}`;
const CORE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  `./css/styles.css?v=${VERSION}`,
  `./js/app.js?v=${VERSION}`,
  `./js/translations.js?v=${VERSION}`,
  `./js/content-data.js?v=${VERSION}`,
  `./js/institution-data.js?v=${VERSION}`,
  "./assets/skl-logo-160.webp",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallbackUrl) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || (fallbackUrl ? caches.match(fallbackUrl) : Response.error());
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isCodeAsset = url.origin === self.location.origin && ["script", "style", "worker"].includes(event.request.destination);

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request, "./offline.html"));
    return;
  }

  if (isCodeAsset) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(event.request, response.clone());
    }
    return response;
  })));
});
