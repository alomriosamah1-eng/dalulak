# إمكانية الوصول (Accessibility)

## المعايير

- WCAG 2.1 Level AA
- ARIA best practices
- RTL support
- Keyboard navigation
- Screen reader support

## القواعد المطبقة

### 1. HTML Semantics
- استخدام عناصر HTML5 صحيحة: `<nav>`, `<main>`, `<aside>`, `<section>`
- عناوين متسلسلة (h1 → h2 → h3)
- `<label>` لكل `<input>`

### 2. ARIA
```html
<button aria-label="إضافة إلى المفضلة" aria-pressed="false">
<nav aria-label="القائمة الرئيسية">
<main role="main">
```

### 3. Keyboard Navigation
- Tab order منطقي
- Focus indicators واضحة
- Skip to content link
- ESC لإغلاق النوافذ المنبثقة

### 4. Color & Contrast
- نسبة تباين ≥ 4.5:1 للنص العادي
- ≥ 3:1 للنص الكبير
- عدم الاعتماد على اللون فقط

### 5. Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0s !important;
    transition-duration: 0s !important;
  }
}
```

### 6. RTL Specific
- تحديد `dir="rtl"` على `<html>`
- استخدام `logical properties` بدلاً من `left/right`
- محاذاة النصوص بشكل صحيح
- أيقونات معكوسة للـ RTL عند الحاجة
