// Registering service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('Registration was successful.');
  }).catch(function(err){
    console.log('Registration failed.');
  })
}

let restaurantCacheName = "restaurant-v1";

// Caching files after installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurantCacheName').then(function(cache){
      return cache.addAll(
        [
          '/',
          '/index.html',
          '/restaurant.html',
          '/css/styles.css',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js'
        ]
      );
    })
  );
});

// Requesting files saved in cache for offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});

// Updating cache, removing older cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != restaurantCacheName;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});
