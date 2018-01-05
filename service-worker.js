console.log('script loaded')

var cacheStorageKey = 'mario-pwa-1'

var cacheList = [
  '/',
  '/index.html',
  '/main.css',
  '/app.js',
  '/img/mario.png',
  '/img/pwa-fonts.png'
]

console.log(self)
console.log('caches', caches)

// install
self.addEventListener('install', function(e) {
  // cache event
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('adding to cache:', cacheList)
      return cache.addAll(cacheList)
    })
    .then(function () {
      console.log('skip waiting')
      return self.skipWaiting()
    })
  )
})

// activate
self.addEventListener('activate', function(e) {
  console.log('Activate event')
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      console.log('Clients claims.')
      return self.clients.claim()
    })
  )
})


// fetch
self.addEventListener('fetch', function(e) {
  console.log('Fetch event:', e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        console.log('Using cache for:', e.request.url)
        return response
      }
      console.log('Fallback to fetch:', e.request.url)
      return fetch(e.request.url)
    })
  )
})
