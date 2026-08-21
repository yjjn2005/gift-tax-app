/* 유앤김 패밀리 증여 레지스트리 — 서비스워커
   버전이 바뀌면 캐시를 통째로 갈아끼워 옛 화면이 남지 않게 한다. */
const VERSION = '20260821-1447';
const CACHE = 'gift-' + VERSION;
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.pathname.startsWith('/api/')) return;  // 동기화 API는 항상 네트워크

  // 화면(HTML) 요청은 캐시를 건너뛰고 항상 최신을 받아온다. 오프라인일 때만 캐시로 대체.
  const isPage = e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/';
  if (isPage) {
    e.respondWith(
      fetch(new Request(e.request, { cache: 'no-store' }))
        .then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
        .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request))
  );
});
