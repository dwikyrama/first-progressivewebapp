const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/icon.png",
  "/manifest.json",
  "/pages/beranda.html",
  "/pages/bahasa.html",
  "/pages/wilayah.html",
  "/pages/tentang.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/images/indonesia.png",
  "/images/jawa_bali.png",
  "/images/kalimantan.png",
  "/images/maluku.png",
  "/images/nusa_tenggara.png",
  "/images/papua.png",
  "/images/sulawesi.png",
  "/images/sumatra.png"
];

//Save assets to cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//Get assets from cache
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});

//Delete old caches
self.addEventListener("activate", function(event) {
event.waitUntil(
    caches.keys().then(function(cacheNames) {
    return Promise.all(
        cacheNames.map(function(cacheName) {
        if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});