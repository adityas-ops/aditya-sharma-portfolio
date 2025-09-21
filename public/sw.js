const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/assets/logo.svg',
  '/assets/adity.png',
  '/fonts/SFMono/SFMono-Regular.woff2',
  '/fonts/Calibre/Calibre-Regular.woff2',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
