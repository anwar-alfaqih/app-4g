const CACHE_NAME = 'anwar-alfaqih-v2';
const ASSETS_TO_CACHE = [
  'index.html',
  'icon-512.png',
  'icon-192.png',
  'y4g.mp3',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'
];

// تثبيت الخدمة وتخزين الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// استراتيجية "الشبكة أولاً مع العودة للتخزين المؤقت"
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// تنظيف النسخ القديمة من الكاش
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
