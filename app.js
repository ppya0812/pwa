// const webpush = require('web-push')
// import webpush from 'web-push'
// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys()
// webpush.setGCMAPIKey('AIzaSyAzmUBkSjdqZQgQ1zOPyebSefM3E5NHcDE')
// webpush.setVapidDetails(
//   'yafangpi@gmail.com',
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// );

// 发送消息
const sendMessageToSW = msg => navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg)
// const sendMessageToSW = msg => new Promise((resolve, reject) => {
//     const messageChannel = new MessageChannel()
//     messageChannel.port1.onmessage = _ => {
//         console.log('channel', _.data)
//         if (_.data.error) {
//             reject(_.data.error)
//         } else {
//             resolve(_.data)
//         }
//     }

//     navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg, [messageChannel.port2])
// })

// 将base64的applicationServerKey转换成UInt8Array
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0, max = rawData.length; i < max; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

// 订阅推送
function subscribeUserToPush(registration, publicKey) {
    console.log('subscribeUserToPush')
    return registration.pushManager.subscribe({ // 2. 订阅
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('AIzaSyAzmUBkSjdqZQgQ1zOPyebSefM3E5NHcDE') // push 客户端公钥
    })
    .then(pushSubscription => {
        console.log('subscription')
        // 3. 发送推送订阅对象到服务器，具体实现中发送请求到后端api
        // {endpoint}
        // sendSubscriptionToServer(subscription);
        // webpush.sendNotification(pushSubscription, 'Your Push Payload Text')
    })
    .catch(e => {
        if (Notification.permission === 'denied') {
            // 用户拒绝了订阅请求
            console.error('用户拒绝了订阅请求')
        }
        console.log('eee', e)
    })
}

// 判断浏览器是否支持serviceWorker
if ('serviceWorker' in navigator) {
    // 注册sw
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
          console.log('Service Worker Registered at scope', registration.scope)
           // 如果还处于默认情况下，则进行询问
            // 检查订阅
            return subscribeUserToPush(registration, 'AIzaSyAzmUBkSjdqZQgQ1zOPyebSefM3E5NHcDE')
            // registration.pushManager.getSubscription()
            .then(subscription => {
                Notification.requestPermission(function(result) {
                    console.log('result', result)
                    registration.showNotification('Vibration Sample', {
                        body: 'Buzz! Buzz!',
                        icon: '/img/mario.png',
                        vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: 'vibration-sample'
                    })
                })
                
                // 检查是否已经被订阅
                // if (!subscription) {
                // // 没有
                //     return;
                // }
                // 有
                // doSth();
            })
            .catch(err => {
                console.log('Error during getSubscription()', err.stack)
            });

      })
      .catch(err => console.log(`registration failed with ${err.stack}`))
      .then(() => {
        sendMessageToSW('Hello, ppya service worker.')
      })
    // navigator.serviceWorker.ready.then(function(reg) {subscribe(reg)});
  //   navigator.serviceWorker.ready.then(function (reg) {
  //     reg.pushManager.getSubscription()
  //         .then(function (subscription) {
  //             subscription.unsubscribe()
  //                 .then(function (successful) {
  //                     //
  //                 })
  //                 .catch(function (e) {
  //                     //
  //                 })
  //         })
  //   })
}
navigator.serviceWorker.addEventListener('message',  e => {
    document.querySelector('.work-say').innerHTML = e.data
    // 此处可以操作页面的 DOM 元素啦
})


let statusEl = document.querySelector('#network-status')
if (!navigator.onLine) {
    statusEl.classList = ['is-offline']
    statusEl.innerText = 'Offline'
}

fetch('http://localhost:8081/userinfo')
.then(res => {
    return res.text()
})
.then(res => {
    res = JSON.parse(res)
    document.querySelector('.sign').innerHTML = res.first_name + res.last_name
})



    // 添加横幅显示
//     var dfdPrompt = null;
// var button = document.getElementById('btn');

// window.addEventListener('beforeinstallprompt', function (e) {
//   console.log('beforeinstallprompt')
//     // 存储事件
//     dfdPrompt = e;
//     // 显示按钮
//     button.style.display = 'block';
//     // 阻止默认事件
//     e.preventDefault();
//     return false;
// });

// button.addEventListener('click', function (e) {
//   console.log('dfdPrompt click', dfdPrompt)
//     if (dfdPrompt == null) {
//         return;
//     }
//     // 通过按钮点击事件触发横幅显示
//     dfdPrompt.prompt();
//     // 监控用户的安装行为
//     dfdPrompt.userChoice.then(function (choiceResult) {
//         console.log(choiceResult.outcome);
//     });
//     // 隐藏按钮
//     button.style.display = 'none';
//     dfdPrompt = null;
// });
