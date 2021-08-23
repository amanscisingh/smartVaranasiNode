console.log('sw.js loaded');
const itemsCached = [
    '/home',
    '/waste',
    '/traffic',
    '/pollution',
    '/images/logo192.png', 
    '/images/ADMIN.png',
    '/images/comingSoon.jpeg',
    '/images/empty.png',
    '/images/filled.png',
    '/images/HOME.jpeg',
    '/images/POLLUTION.png',
    '/images/TRAFFIC.png',
    '/images/WASTE.png',
    '/images/wastePoster.jpg',
    '/css/main.css'
] 



// self.addEventListener('install', e => {
//     e.waitUntil(
//         caches.open("c1").then(cache => {
//             return cache.addAll(itemsCached)
//         })
//         .then(self.skipWaiting())
//     )

// })


// self.addEventListener('fetch', e => {
//     e.respondWith(
//         caches.match(e.request).then(response => {
//             return response || fetch(e.request)
//         })
//     )
// })




self.addEventListener('activate', function(event) {
  console.log('this event triggers when the service worker activates')
})



self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('c2')
        .then(function(e) {
          return e.addAll(itemsCached)
        }).then(self.skipWaiting())
        
    )
})


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== 'c2') {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})



self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then( response => {
      return response || fetch(e.request)
    })
  )
})

