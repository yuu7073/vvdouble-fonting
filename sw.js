const C='vvfont-v1';
const A=['./','./index.html','./manifest.json','./icon.png','./fonts/SweiFanSerif-Light.woff2','./fonts/SweiFanSerif-Regular.woff2','./fonts/SweiFanSerif-Bold.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(e.request.method==='GET'&&res.ok){const cl=res.clone();caches.open(C).then(c=>c.put(e.request,cl))}return res})))});
