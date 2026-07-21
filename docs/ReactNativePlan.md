# خطة الانتقال إلى React Native

## استراتيجية مشاركة الكود

### Code Sharing Strategy
```
shared/                    # 60-70% من الكود
├── domain/               # Entities, Value Objects
├── types/                # TypeScript interfaces
├── data/                 # Resource data
├── services/             # Search, Export, Storage
├── store/                # Zustand stores
└── utils/                # Helper functions

platform/                 # 30-40% من الكود
├── web/                  # React (Vite)
│   ├── components/       # UI components
│   ├── features/         # Pages
│   └── styles/           # CSS/Tailwind
└── mobile/              # React Native (Expo)
    ├── components/       # Native components
    ├── features/         # Pages
    └── styles/           # Native styles
```

### خطة الهجرة

| المرحلة | المدة | الوصف |
|---------|-------|-------|
| 1 | أسبوع 1 | إنشاء مشروع Expo، مشاركة data/services |
| 2 | أسبوع 2 | بناء مكونات UI الأساسية المنقولة |
| 3 | أسبوع 3-4 | بناء الصفحات الرئيسية (6 أقسام) |
| 4 | أسبوع 5 | تجربة المستخدم (Dark/Light, Gestures) |
| 5 | أسبوع 6 | Offline (SQLite) |
| 6 | أسبوع 7 | اختبار ونشر (iOS + Android) |

### Expo vs Bare React Native

| الخاصية | Expo (موصى به) | Bare RN |
|---------|----------------|---------|
| Setup time | دقائق | ساعات |
| OTA Updates | ✅ | ❌ |
| Expo SDK | 50+ modules | تحتاج setup يدوي |
| Native modules | WatermelonDB | أي module |
| Build | EAS Build | يدوي |
| Performance | جيد جداً | أفضل قليلاً |

**القرار: Expo** لأنه يغطي احتياجاتنا بالكامل.

### Target platforms
- iOS 15+
- Android 8+
- Tablet (iPad, Android tablets)
