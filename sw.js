/* VERSION:20261122212702 */
var CACHE='school-20261122212702',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-m-192.png','icon-m-512.png','apple-touch-icon.png','favicon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    /* الصفحة والملفات الثابتة: من المحفوظ فوراً وتتحدّث في الخلفية */
    e.respondWith(caches.open(CACHE).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
      var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(function(){return hit});
      return hit||net})}));
  }
});
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(self.clients.matchAll({type:'window'}).then(function(l){if(l.length)return l[0].focus();return self.clients.openWindow('./')}))});
self.addEventListener('push',function(e){var d={};try{d=e.data?e.data.json():{}}catch(x){}
  e.waitUntil(self.registration.showNotification(d.title||'تقييمي',{body:d.body||'',tag:d.tag||'note',icon:'icon-192.png',badge:'favicon.png',dir:'rtl',lang:'ar',renotify:true}))});
