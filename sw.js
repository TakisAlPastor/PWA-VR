const CACHE_NAME = 'visor-vr-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/aframe.min.js',
  '/js/app.js',
  '/assets/city.jpg',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
  // Nota: Agrega aquí las rutas a los iconos 'icon-192.png' y 'icon-512.png' cuando los crees
];

// Instalación del Service Worker: Guardar recursos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados exitosamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones de red: Estrategia "Cache First" (Caché primero, luego red)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta desde la caché si existe, si no, hace la petición a la red
        return response || fetch(event.request);
      })
  );
});

// Activación del Service Worker: Limpiar cachés antiguos si se actualiza la versión
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
