if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
           .then(function(registration) {
             console.log('Service Worker Registered')
           })
}

var statusEl = document.querySelector('#network-status')
    if (!navigator.onLine) {
      statusEl.classList = ['is-offline']
      statusEl.innerText = 'Offline'
    }

    fetch('./data.json')
