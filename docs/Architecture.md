# العمارة العامة (Architecture)

## Clean Architecture Layers

```
┌─────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                   │
│  (React / React Native / PWA / Desktop)              │
│  - Pages (Features)                                  │
│  - Components (UI, Layout, Cards, Modals)            │
│  - Hooks                                             │
└────────────────────┬────────────────────────────────┘
                     │ depends on
┌────────────────────▼────────────────────────────────┐
│                  APPLICATION LAYER                    │
│  (Use Cases / Services)                              │
│  - searchService                                     │
│  - storageService                                    │
│  - exportService                                     │
│  - crawlerService (separate process)                 │
│  - taxonomyService                                   │
└────────────────────┬────────────────────────────────┘
                     │ depends on
┌────────────────────▼────────────────────────────────┐
│                  DOMAIN LAYER                         │
│  (Entities / Business Logic)                         │
│  - Resource Entity                                   │
│  - Category Entity                                   │
│  - Tag Entity                                        │
│  - Taxonomy Tree                                     │
│  - Value Objects                                     │
│  - Repository Interfaces                             │
└────────────────────┬────────────────────────────────┘
                     │ depends on
┌────────────────────▼────────────────────────────────┐
│                  DATA LAYER                           │
│  (Repositories / Data Sources)                       │
│  - LocalStorage (favorites, theme)                   │
│  - IndexedDB (offline cache)                         │
│  - SQLite (React Native)                             │
│  - JSON files (static data)                          │
│  - Crawler output (JSON)                             │
└─────────────────────────────────────────────────────┘
```

## Principles

### SOLID
- **S**ingle Responsibility: كل مكون مسؤول عن شيء واحد
- **O**pen/Closed: قابل للتوسعة، مغلق للتعديل
- **L**iskov Substitution: الأنواع قابلة للتبديل
- **I**nterface Segregation: واجهات محددة ومتخصصة
- **D**ependency Inversion: الاعتماد على التجريدات

### DRY
- استخراج logic مشترك إلى hooks/services
- Component composition بدلاً من التكرار
- Utility functions للمهام المتكررة

### KISS
- مكونات صغيرة ومركزة
- Props بسيطة وواضحة
- تدفق بيانات أحادي الاتجاه

## Data Flow (Crawler → Database → App)

```
Crawler (Playwright)
    │
    ▼
Raw JSON Data
    │
    ▼
Data Cleaner & Validator
    │
    ▼
Canonical JSON (src/data/*.ts)
    │
    ▼
TypeScript Types (Resource[])
    │
    ▼
React App (Zustand + Components)
    │
    ▼
User Interface
```
