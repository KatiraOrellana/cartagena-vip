const C='ctg-vip-v1';
const SHELL=['./','index.html','meta.json','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
if(e.request.method!=='GET')return;
const u=new URL(e.request.url);
const same=u.origin===location.origin, font=u.host.endsWith('fonts.googleapis.com')||u.host.endsWith('fonts.gstatic.com');
if(!same&&!font)return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request.mode==='navigate'?'index.html':e.request,cp))}return r}).catch(()=>caches.match(e.request.mode==='navigate'?'index.html':e.request,{ignoreSearch:true})));
});
