# دليلك التعليمي والعملي - تطبيق الموبايل

تطبيق React Native (Expo) للمنصة العربية التي تجمع أفضل الموارد التعليمية والمهنية المجانية.

## المتطلبات

- Node.js 20+
- Expo CLI
- EAS CLI (للبناء)

## التشغيل

```bash
npm install
expo start
```

## البناء

```bash
eas build --platform android
eas build --platform ios
```

## الهيكل

```
mobile/
├── app/                    # تطبيق React Native
│   ├── screens/            # الشاشات
│   ├── navigation/         # التنقل
│   ├── components/         # المكونات
│   └── context/            # السياقات (Theme)
├── shared/                 # كود مشترك مع الويب
│   ├── types/              # الأنواع
│   ├── data/               # البيانات
│   ├── services/           # الخدمات
│   ├── store/              # الحالة (Zustand)
│   └── utils/              # الأدوات
└── assets/                 # الأصول (أيقونات، صور)
```

## التقنيات

- Expo SDK 54
- React Native 0.81
- React Navigation 6
- Zustand (إدارة الحالة)
- TypeScript
