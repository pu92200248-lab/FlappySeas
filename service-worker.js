const CACHE_NAME = "flappy-seas-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./inicio.js",
  "./Juego.js",
  "./gameover.js",
  "./main.js",

  "./img/fondo.png",
  "./img/boton1.png",
  "./img/boton2.png",
  "./img/Calaca.png",
  "./img/fantasma.png",

  "./audio/musica.mp3",

  "https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
