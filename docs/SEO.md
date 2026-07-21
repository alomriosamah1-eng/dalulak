# استراتيجية تحسين محركات البحث (SEO)

## Technical SEO

### Meta Tags لكل قسم
```html
<!-- Example: AI tools section -->
<title>أدوات الذكاء الاصطناعي المجانية - دليلك التعليمي والعملي</title>
<meta name="description" content="أفضل أدوات ومنصات الذكاء الاصطناعي المجانية. اكتشف ChatGPT وClaude وMidjourney وأكثر من 50 أداة AI." />
<meta property="og:title" content="أدوات الذكاء الاصطناعي - دليلك" />
<meta property="og:description" content="أكبر دليل عربي لأدوات الذكاء الاصطناعي المجانية" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

### Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "دليلك التعليمي والعملي",
  "description": "أكبر دليل عربي للموارد التعليمية والعملية",
  "url": "https://dalylak.app",
  "inLanguage": "ar",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Coursera",
        "url": "https://www.coursera.org",
        "description": "منصة تعليمية عالمية..."
      }
    ]
  }
}
```

## On-Page SEO

### هيكل العناوين
```
H1: دليلك التعليمي والعملي
├── H2: منصات التعلم المجانية
│   ├── H3: Coursera
│   ├── H3: Edraak
│   └── H3: freeCodeCamp
├── H2: أدوات الذكاء الاصطناعي
│   ├── H3: ChatGPT
│   └── H3: Claude
└── H2: منصات العمل الحر
    ├── H3: Mostaql
    └── H3: Upwork
```

## Performance SEO

| المقياس | الهدف | الأداة |
|---------|-------|--------|
| LCP | < 2.5s | Lighthouse |
| FID | < 100ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| TTFB | < 800ms | WebPageTest |
| First Paint | < 1s | Chrome DevTools |

## Arabic SEO Specifics

- استخدام الكلمات المفتاحية العربية في الـ URL
- روابط نظيفة: `/ai/chatgpt` بدلاً من `/page?id=200`
- Open Graph بالعربية
- Twitter Cards بالعربية
- Sitemap مع تفضيل المحتوى العربي
- hreflang للمحتوى متعدد اللغات
