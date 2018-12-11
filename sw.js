let CACHE_KEY = 'mario-pwa-' + Date.now()

let cacheList = [
  '/',
  '/index.html',
  '/src/main.css',
  '/app.js',
  '/img/mario.png',
  '/img/pwa-fonts.png'
]

self.addEventListener('message', e => {
  console.log('message', e.data)
})

// install
self.oninstall = e => {
  console.log('install')
  // cache event
  e.waitUntil(
    caches.open(CACHE_KEY)
      .then(cache => {
        return cache.addAll(cacheList)
      })
      .then(_ => {
        console.log('skip waiting')
        return self.skipWaiting()
      })
  )
}

// activate 缓存更新
self.onactivate = e => {
  console.log('activate222...')
  e.waitUntil(
    caches.keys().then(cacheList => Promise.all(
      // 更新缓存
      cacheList
        .filter(v => v !== CACHE_KEY)
        .map(name => caches.delete(name))
    ))
    .then(() => {
      return self.clients.matchAll()
        .then(clients => {
          if (clients && clients.length) {
              clients.forEach((v,i) => {
                  // 发送字符串'sw.update'
                  v.postMessage('sw '+i+' update')
              })
          }
        })
    })
  )
  return self.clients.claim()
}


// fetch 配置缓存策略
self.onfetch = e => {
  const fixedUrl = `${e.request.url}`
  const fetched = fetch(fixedUrl, {cache: "no-store"})
  const fetchedCopy = fetched.then(resp => resp.clone())

  e.respondWith(
    caches.match(e.request).then(response => {
      if (response != null) {
        return response
      }
      console.log('Fallback to fetch:', e.request.url)
      // return fetch(e.request.url, {cache: 'no-store'})
      let requestToCache = e.request.clone() //          
      return fetch(requestToCache).then(response => {
          if (!response) {      
            return response
          }
          let responseToCache = response.clone()       
          caches.open(CACHE_KEY)                           
            .then(cache => {
              cache.put(requestToCache, responseToCache)
            })
          return response
        })
    })
  )
  // Update the cache with the version we fetched (only for ok status)
  // e.waitUntil(
  //   Promise.all([fetchedCopy, caches.open(CACHE_KEY)])
  //     .then(([response, cache]) => response.ok && cache.put(e.request, response))
  //     .catch(_ => {
  //       console.log('waitUntil', _.stack)
  //     })
  // )
}

// function cacheFallbackToNetwork(req) {
//   // 缓存优先
//   return caches.match(req)
//     .then(res => {
//       if (!res) {
//         throw new Error('cache miss')
//       }
//       return res
//     })
//     .catch(err => {
//       return fetch(req).then(res => {
//         return caches.open(CACHE_KEY).then(cache => {
//           createCachedResponse(res).then(res => cache.put(req, res))
//           return res
//         })
//       })
//     })
// }

// function networkFallbackToCache(req) {
//   // 网络优先
//   return fetch(req)
//     .then(res => {
//       return caches.open(CACHE_KEY).then(cache => {
//         createCachedResponse(res).then(res => cache.put(req, res))
//         return res
//       })
//     })
//     .catch(err => {
//       return caches.match(req)
//       .then(res => {
//         if (!res) {
//           throw new Error('cache miss')
//         }
//         return res
//       })
//     })
// }



// _______________________________________________________________



// push 消息推送
self.addEventListener('push', function(event) {
  var title = 'lalalalala.';
  var body = 'We have received a push message.';
  var icon = '/img/mario.png';
  var tag = 'simple-push-demo-notification-tag';
  var data = {
    doge: {
        wow: 'such amaze notification data'
    }
  };
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data: data
    })
  );
})

// 询问用户是否授权订阅消息
// function askPermission() {
//   return new Promise(function (resolve, reject) {
//       var permissionResult = Notification.requestPermission(function (result) {
//           // 旧版本
//           resolve(result);
//       });
//       if (permissionResult) {
//           // 新版本
//           permissionResult.then(resolve, reject);
//       }
//   })
//   .then(function (permissionResult) {
//       if (permissionResult !== 'granted') {
//           // 用户未授权
//       }
//   });
// }

// askPermission（）


// notificationclick
// 在 SW 中使用
// self.registration.showNotification("New mail from Alice", {
//   actions: [{action: 'archive', title: "Archive"}]
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   // event action -----  archive/like/reply
//   if (event.action === 'archive') {
//     silentlyArchiveEmail();
//   } else {
//     clients.openWindow("/inbox");
//   }
// }, false);

