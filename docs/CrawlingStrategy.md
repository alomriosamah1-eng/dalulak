# استراتيجية الزحف (Crawling Strategy)

## Overview

نظام زحف آلي باستخدام Playwright لجمع الموارد التعليمية والعملية من المصادر المفتوحة والموثوقة.

## المصادر المستهدفة (Categories)

### مصادر عامة
| المصدر | النوع | التردد | الأولوية |
|--------|-------|--------|----------|
| GitHub Awesome Lists | awesome-list | شهرياً | عالية |
| Wikipedia Lists | directory | شهرياً | عالية |
| Reddit Communities | community | شهرياً | متوسطة |
| ProductHunt | directory | أسبوعياً | متوسطة |

### مصادر التعليم
| المصدر | النوع |
|--------|-------|
| Class Central | directory |
| Coursera | platform |
| edX | platform |
| freeCodeCamp | platform |
| Khan Academy | platform |
| MIT OpenCourseWare | platform |
| Udemy | platform |
| Alison | platform |

### مصادر عربية
| المصدر | النوع |
|--------|-------|
| Edraak | platform |
| Rwaq | platform |
| Hsoub Academy | platform |
| Barmej | platform |
| For9a | directory |
| Doroob | platform |

### AI/ML Resources
| المصدر | النوع |
|--------|-------|
| Papers With Code | paper |
| Hugging Face | community |
| Kaggle Learn | platform |
| Google AI | platform |
| OpenAI | platform |

## استراتيجية الزحف

### 1. قائمة الانتظار (Queue)
- BFS strategy: نبدأ من الصفحات الرئيسية
- Priority queue: الموارد العربية لها أولوية أعلى
- Maximum depth: 3 مستويات

### 2. معدل الطلبات (Rate Limiting)
- أساسي: طلب واحد كل 3-5 ثوانٍ
- ذكي: مراقبة response headers (Retry-After)
- متوازي: متصفح واحد، تبويبان كحد أقصى

### 3. احترام robots.txt
```typescript
interface RobotsTxtRules {
  allowedPaths: string[];
  disallowedPaths: string[];
  crawlDelay: number;
}
```

### 4. استخراج البيانات
لكل صفحة، نحاول استخراج:
- Open Graph tags (og:title, og:description, og:image)
- Meta tags
- JSON-LD structured data
- HTML headings and paragraphs
- Links to social media

### 5. التحقق من الروابط
- Status code 200 = ✅ صالح
- Status code 301/302 = 🔄 إعادة توجيه (نتابعها)
- Status code 404/410 = ❌ معطل
- Status code 403/429 = ⏸ محظور/مقيد
- Timeout (10s) = ⚠️ بطيء

## Pipeline

```
Initialize Queue
    │
    ▼
Fetch robots.txt
    │
    ▼
Process Page
    │
    ├── Extract Metadata (OG, JSON-LD, Meta)
    ├── Extract Content (Title, Description, Features)
    ├── Extract Media (Logo, Screenshots, Favicon)
    ├── Extract Links (Social, Resources)
    └── Classify Page (Category, Tags, Language)
    │
    ▼
Transform to Resource Schema
    │
    ▼
Validate & Clean
    │
    ▼
Deduplicate
    │
    ▼
Store as JSON
```
