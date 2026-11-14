const C='vvfont-v2';
const FONTS=['./fonts/SweiFanSerif-Light.woff2','./fonts/SweiFanSerif-Regular.woff2','./fonts/SweiFanSerif-Bold.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FONTS.concat(['./icon.png','./manifest.json']))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)));await self.clients.claim();const cs=await self.clients.matchAll({type:'window'});for(const c of cs){try{await c.navigate(c.url)}catch(err){}}})())});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const url=new URL(req.url);
  const isPage=req.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('index.html')||url.pathname.endsWith('sw.js');
  if(isPage){
    e.respondWith(fetch(req).then(res=>{if(res.ok){const cl=res.clone();caches.open(C).then(c=>c.put(req,cl))}return res}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{if(res.ok&&url.origin===location.origin){const cl=res.clone();caches.open(C).then(c=>c.put(req,cl))}return res})));
  }
});
