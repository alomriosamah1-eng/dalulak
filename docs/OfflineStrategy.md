# استراتيجية Offline

## Overview

نظام تخزين Offline يسمح للمستخدم بحفظ الموارد للوصول إليها بدون إنترنت.

## التقنيات

| التقنية | الاستخدام |
|---------|-----------|
| IndexedDB | تخزين Offline في المتصفح |
| localStorage | تفضيلات المستخدم (ثيم، مفضلة) |
| Service Worker | تخزين مؤقت للصفحات |
| SQLite | تخزين محلي لتطبيقات الجوال |

## البيانات المدعومة للحفظ Offline

| نوع البيانات | التخزين | الحجم التقريبي |
|-------------|---------|----------------|
| Resource metadata | IndexedDB | ~2KB لكل مورد |
| Screenshots | IndexedDB (blob) | ~100KB لكل صورة |
| Logo | IndexedDB (blob) | ~20KB لكل شعار |
| Articles | IndexedDB | ~50KB لكل مقال |
| Search index | IndexedDB | ~500KB للفهرس الكامل |
| User preferences | localStorage | ~10KB |

## IndexedDB Schema

```typescript
interface DalylakDB {
  resources: {
    key: string;          // resource.id
    value: Resource;
    indexes: ['category', 'language', 'type'];
  };
  screenshots: {
    key: string;          // resource.id + index
    value: Blob;
  };
  logos: {
    key: string;          // resource.id
    value: Blob;
  };
  searchIndex: {
    key: string;
    value: SearchIndexEntry;
  };
  browsingHistory: {
    key: string;          // timestamp
    value: HistoryEntry;
  };
}
```

## استراتيجية المزامنة

```
Online → تخزين في IndexedDB → مزامنة مع localStorage
     ↓
Offline → قراءة من IndexedDB → عرض البيانات المحفوظة
     ↓
Online ← مزامنة التغييرات ← تحديث البيانات
```
