const CACHE = 'static'
const timeout = 500

self.addEventListener('install', (event) => {
  console.info('ServiceWorker installed')
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('chrome-extension')) {
    return
  }

  if (event.request.method !== 'GET') {
    console.info('ServiceWorker is working', event.request)
    return
  }

  event.respondWith(
    fromNetwork(event.request, timeout)
      .then(async (response) => {
        const open = await caches.open(CACHE)
        await open.put(event.request, response.clone())
        return response
      })
      .catch(async (e) => {
        console.error(e)
        try {
          const response = await fromCache(event.request)
          setTimeout(() => update(event.request), 0)
          return response
        } catch (e) {
          console.info('No cached data')
          return update(event.request)
        }
      })
  )
})

async function fromCache(request) {
  const cache = await caches.open(CACHE)
  const matching = await cache.match(request)
  return matching || Promise.reject('no-match')
}

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout)
    fetch(request).then((response) => {
      clearTimeout(timeoutId)
      fulfill(response)
    }, reject)
  })
}

async function update(request) {
  try {
    const open = await caches.open(CACHE)
    const data = await fetch(request)
    await open.put(request, data.clone())
    return data
  } catch (e) {
    console.error(e)
    return
  }
}
