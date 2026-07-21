# استراتيجية الاختبار

## Testing Pyramid

```
     ╱ E2E ╲          Playwright (critical flows)
    ╱─── Integration ───╲     Component + Service tests
   ╱────── Unit ──────────╲     Pure logic + Utils
```

## Unit Tests

| الهدف | الأداة | الموقع |
|-------|--------|--------|
| Services | Vitest | src/services/*.test.ts |
| Utils | Vitest | src/utils/*.test.ts |
| Store | Vitest | src/store/*.test.ts |
| Types | Vitest | src/types/*.test.ts |

## Component Tests

| الهدف | الأداة |
|-------|--------|
| UI Components | Vitest + @testing-library/react |
| Pages | Vitest + @testing-library/react |
| Hooks | Vitest + @testing-library/react-hooks |

## Crawler Tests

| الهدف | الوصف |
|-------|-------|
| Queue | اختبار enqueue/dequeue/persist |
| RateLimiter | اختبار التأخير والإعادة |
| RobotsParser | اختبار تحليل rules |
| Extractors | اختبار استخراج البيانات |
| Validators | اختبار التحقق من الصحة |

## E2E Tests (Future)

- Playwright لاختبار التصفح الكامل
- اختبار RTL
- اختبار Dark/Light mode
- اختبار Offline

## Coverage Target
- Services: 90%+
- Utils: 95%+
- Components: 80%+
- Store: 85%+
- Crawler: 75%+
