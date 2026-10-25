/* ShivAnsh Builders & Developers - Production Offline Service Worker */
const CACHE_NAME = 'shivansh-offline-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS_TO_CACHE = [
  OFFLINE_URL,
  '/',
  '/index.html',
  '/portfolio.html',
  '/contacts.html'
];

// Install: pre-cache the offline fallback page and essential landing pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate: purge any obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first for navigation requests, fallback to offline.html if network fails
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' && event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedOffline = await cache.match(OFFLINE_URL);
        return cachedOffline || new Response('You are offline. Please reconnect and refresh.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      })
    );
  }
  // All non-navigation requests pass through untouched
});
