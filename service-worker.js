// =============================
// NOMBRE DEL CACHE
// Cambiar versión cuando se actualice la app
// =============================

const CACHE_NAME = "cuentas-claras-v10";


// =============================
// ARCHIVOS A GUARDAR OFFLINE
// =============================

const urlsToCache = [

"./",
"./index.html",
"./styles.css",
"./app.js",
"./manifest.json",
"./icons/icon-192.png",
"./icons/icon-512.png"

];


// =============================
// INSTALACIÓN DEL SERVICE WORKER
// =============================

self.addEventListener("install", event => {

self.skipWaiting();

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))

);

});


// =============================
// ACTIVACIÓN
// LIMPIA CACHE VIEJO
// =============================

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(cacheNames => {

return Promise.all(

cacheNames.map(cache => {

if (cache !== CACHE_NAME) {
return caches.delete(cache);
}

})

);

})

);

self.clients.claim();

});


// =============================
// INTERCEPTAR PETICIONES
// =============================

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => response || fetch(event.request))

);

});
