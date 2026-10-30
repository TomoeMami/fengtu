/* 缝图 · 长图拼接 — Service Worker
 *
 * 缓存策略：
 *   1. 页面导航（HTML）：网络优先。这样每次发布新版本会立刻生效；
 *      断网时回退到缓存，保证离线也能打开。
 *   2. 其余同源静态资源：缓存优先，未命中再联网并写入缓存。
 *
 * 注意：修改本文件或 icons / manifest 等静态资源后，请递增 VERSION，
 * 浏览器检测到 sw.js 内容变化后才会安装新版本并换用新缓存。
 */

const VERSION = 'v1';
const CACHE = `fengtu-${VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/favicon.svg',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // 只处理同源的 GET 请求
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 页面导航：网络优先，失败回退缓存
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('./index.html'))
            .then((cached) => cached || Response.error())
        )
    );
    return;
  }

  // 其他静态资源：缓存优先
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      });
    })
  );
});
