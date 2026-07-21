# Product Requirements Document (PRD)

## 1. Overview
- **Product**: دليلك التعليمي والعملي (Dalylak)
- **Type**: Arabic Open Educational Resource Directory
- **Platforms**: Web (PWA), Android, iOS, Desktop
- **Target Audience**: Arabic speakers worldwide

## 2. User Personas

### Ahmed (Student, 22)
- **Goal**: Find free courses to learn programming
- **Needs**: Arabic content, free certificates, structured learning paths
- **Pain Points**: Overwhelmed by options, can't verify quality

### Sara (Freelancer, 28)
- **Goal**: Find remote work platforms and productivity tools
- **Needs**: Reliable platforms, pricing information, user reviews
- **Pain Points**: Wasted time on fake platforms, unclear pricing

### Omar (Professional, 35)
- **Goal**: Stay updated with AI tools and resources
- **Needs**: Curated list of best AI tools, comparisons
- **Pain Points**: Too many new tools daily, hard to evaluate

## 3. Functional Requirements

### FR1: Resource Directory
- Display categorized resources
- Rich metadata for each resource
- Search with filters
- Arabic-first interface

### FR2: User Features
- Favorites/Bookmarks
- Recently viewed
- Continue reading
- Export data (JSON/CSV/MD)

### FR3: Data Collection (Crawler)
- Automated crawling from 50+ sources
- Link validation
- Quality scoring
- Deduplication

## 4. Non-Functional Requirements

### Performance
- Lighthouse score ≥ 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size < 200KB (initial)

### Scalability
- Support 10,000+ resources
- Support 500+ categories
- Quick search across all data

### Offline
- Full offline access to saved resources
- Service Worker caching
- IndexedDB storage

## 5. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Resources | 10,000+ | Database count |
| Monthly Users | 100,000+ | Analytics |
| Search Accuracy | 95%+ | User feedback |
| Link Health | 95%+ | Automated checks |
| User Retention | 40%+ (monthly) | Analytics |
| App Store Rating | 4.5+ | App stores |
