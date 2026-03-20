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
  "./img/Calaca.png",
  "./img/fantasma.png",

  "./audio/musica.mp3",

  "https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.js"
];

// INSTALAR
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVAR
self.addEventListener("activate", (event) => {
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

// FETCH
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
