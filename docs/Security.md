# استراتيجية الأمان

## Web Security

### Content Security Policy
```http
Content-Security-Policy: default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self';
  frame-src 'none';
  object-src 'none';
```

### HTTPS Only
- HSTS header
- جميع الروابط الخارجية تستخدم HTTPS
- Mixed content blocking

### Data Protection
- عدم تخزين بيانات حساسة
- استخدام localStorage بدلاً من cookies
- عدم مشاركة البيانات مع طرف ثالث
- Sanitize جميع المدخلات

### External Links
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
```

### Dependency Security
- فحص التبعيات دورياً
- npm audit
- Dependabot
- Snyk

## Crawler Security

### Rate Limiting
- احترام robots.txt
- معدل طلبات محدد
- User-Agent واضح
- Retry with backoff

### Data Sanitization
- إزالة HTML tags من النصوص
- التحقق من صحة URLs
- منع injection attacks
- Validate JSON schema
