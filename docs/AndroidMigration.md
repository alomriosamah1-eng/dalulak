# خطة الانتقال إلى Android

## الخيارات

### الخيار 1: PWA (أسهل)
- نفس الكود الحالي
- إضافة manifest.json
- Service Worker للتخزين المؤقت
- متجر Google Play عبر Trusted Web Activity (TWA)

**المزايا**: تكلفة منخفضة، صيانة واحدة
**العيوب**: أداء أقل، وصول محدود للأجهزة

### الخيار 2: React Native + Expo (موصى به)
- مشاركة 60-70% من الكود
- أداء أصلي
- وصول كامل للأجهزة
- متجر Google Play و App Store

### الخيار 3: Kotlin (أصلي)
- أداء أفضل
- تكلفة تطوير عالية
- صيانة منفصلة
**غير موصى به** للمشروع الحالي.

## الهيكل المقترح لتطبيق الجوال

```
dalylak-mobile/
├── src/
│   ├── shared/           # رمز مشترك مع الويب
│   │   ├── types/
│   │   ├── data/
│   │   ├── services/
│   │   └── store/
│   ├── screens/
│   │   ├── Dashboard.tsx
│   │   ├── Learning.tsx
│   │   ├── Youtube.tsx
│   │   └── ...
│   ├── components/
│   │   ├── ResourceCard.tsx
│   │   ├── SearchBox.tsx
│   │   └── ...
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── storage/
│   │   └── SQLiteStorage.ts
│   └── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```
