const webpush = require('web-push')

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys()

webpush.setGCMAPIKey('xxxxxxxxxAIzaSyAzmUBkSjdqZQgQ1zOPyebSefM3E5NHcDExxxxx')
webpush.setVapidDetails(
  'yafangpi@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
  endpoint: '.....',
  keys: {
    auth: '.....',
    p256dh: '.....'
  }
}

function psuhMessage(subscription, data = {}) {

}

webpush.sendNotification(pushSubscription, 'Your Push Payload Text')
