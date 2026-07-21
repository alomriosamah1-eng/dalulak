# استراتيجية الأداء (Performance)

## Bundle Optimization

### Code Splitting
```typescript
// Lazy loading for all feature pages
const LearningPage = lazy(() => import('./features/learning/LearningPage'));
const AiPage = lazy(() => import('./features/ai/AiPage'));
```

### Chunk Strategy
```
vendor-react      → React, ReactDOM
vendor-lucide     → Icons (lazy loaded per page)
vendor-router     → React Router
vendor-utils      → Zustand, clsx, tailwind-merge
feature-*         → Per-feature chunks
```

### Tree Shaking
- استيراد محدد من المكتبات (`import { Heart } from 'lucide-react'`)
- عدم استيراد المكتبات كاملة
- استخدام `sideEffects: false` في package.json

## Image Optimization

- جميع الصور بصيغة SVG (حجم صغير)
- Lazy loading للصور (`loading="lazy"`)
- `width` و `height` لمنع CLS
- `aspect-ratio` في CSS

## Rendering Optimization

### Virtual List (للبيانات الكبيرة)
```typescript
// استخدام react-window أو tanstack-virtual
<VirtualList
  items={resources}
  itemHeight={200}
  overscan={5}
/>
```

### Memoization
```typescript
const filteredItems = useMemo(
  () => searchResources(data, query),
  [data, query]
);
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse PWA | ≥ 90 |
| Bundle Size (gzip) | < 100KB |
| Time to Interactive | < 2s |
| First Input Delay | < 50ms |
| Total Blocking Time | < 200ms |
| Speed Index | < 2s |
