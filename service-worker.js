const CACHE_NAME = "flappy-seas-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./js/inicio.js",
  "./js/Juego.js",
  "./js/gameover.js",
  "./js/main.js",

  "./img/fondo.png",
  "./img/boton1.png",
  "./img/boton2.png",
  "./img/1.png",
  "./img/2.png",
  "./img/3.png",
  "./img/Torre.png",

  "./audio/musica.mp3",

  "https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.js"
];

// INSTALAR
self.addEventListener("install", (event) => {
  console.log("SW instalado");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// ACTIVAR
self.addEventListener("activate", (event) => {
  console.log("SW activado");

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// FETCH (offline)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {

      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          console.log("Offline:", event.request.url);
        });
    })
  );
});
