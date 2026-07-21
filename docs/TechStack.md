# التقنيات المستخدمة

## Core Platform

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| TypeScript | 5.5+ | لغة التطوير الأساسية |
| React | 18.3+ | مكتبة UI |
| Vite | 5.4+ | Build tool |
| Tailwind CSS | 3.4+ | Styling framework |
| Zustand | 4.5+ | State management |

## Data & Crawling

| التقنية | الاستخدام |
|---------|-----------|
| Playwright | Web crawling و automation |
| Node.js | تشغيل الـ crawler |
| JSON | تخزين البيانات الأساسي |
| IndexedDB | تخزين Offline في المتصفح |

## Future (Phase 3+)

| التقنية | الاستخدام |
|---------|-----------|
| React Native + Expo | تطبيقات Android/iOS |
| SQLite | تخزين محلي للجوال |
| Tauri | تطبيق Desktop |
| Workbox | Service Worker لـ PWA |

## Why This Stack?

### React + Vite (not Next.js)
- المشروع SPA بحت، لا يحتاج SSR
- HMR سريع جداً مع Vite
- build صغير الحجم وسريع
- نشر سهل على GitHub Pages

### Zustand (not Redux)
- بدون Boilerplate
- TypeScript first
- حجم صغير (~1KB)
- سهل التعلم والصيانة

### Tailwind CSS (not styled-components)
- build-time styling، بدون runtime overhead
- حجم CSS صغير بعد الـ purge
- توافق ممتاز مع RTL
- توثيق غني ومجتمع كبير
