var CACHE='lapland-v1';
var SHELL=['/','/index.html','/manifest.json','/icons/icon-192.png','/icons/icon-512.png','/icons/apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return; // data requests: handled by the page with localStorage fallback
  e.respondWith(fetch(e.request).then(function(r){var copy=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,copy);});return r;}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('/index.html');});}));
});
