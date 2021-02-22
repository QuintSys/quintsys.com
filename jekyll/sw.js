const version = "0.0.1";
const cacheName = `quintsys-${version}`;
self.addEventListener('install', e => {
    const timeStamp = Date.now();
    e.waitUntil(caches.open(cacheName).then(cache => {
        return cache.addAll(['/', '/index.html']).then(() => self.skipWaiting());
      }
    ));
  }
);

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  }
);

self.addEventListener('fetch', event => {
    event.respondWith(caches.open(cacheName).then(cache => cache.match(event.request, {
      ignoreSearch: true
    })).then(response => {
        return response || fetch(event.request);
      }
    ));
  }
);
