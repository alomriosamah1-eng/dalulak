# قيود التصميم وتجربة المستخدم (UI/UX)

## Core Principles

1. **Arabic First** — كل شيء بالعربية، مع دعم ثنائي اللغة
2. **Mobile First** — التصميم يبدأ من الجوال ثم يتوسع
3. **Glassmorphism** — واجهة عصرية وأنيقة مع تأثيرات زجاجية
4. **Neumorphism** — عناصر ثلاثية الأبعاد ناعمة
5. **Dark Mode First** — الوضع الداكن هو الافتراضي

## Key User Flows

### Flow 1: Browsing Resources
```
Open App → Dashboard → Select Category → Browse Cards → View Details
    ↓                                        ↓
  Welcome (first time)                    Save to Favorites
```

### Flow 2: Search
```
Tap Search → Type Query → Results (instant) → Filter → Select → Details
    ↓
  Suggestions appear
```

### Flow 3: Offline
```
Open App → Check Connection
    ↓ Online → Normal browsing
    ↓ Offline → Cached resources → Browse saved → Limited search
```

## Interaction Design

### Micro-interactions
- Button press: scale 0.97
- Card hover: translateY -2px
- Toast: slide down from top
- Modal: scale + fade in
- Favorite: heart animation
- Theme toggle: icon rotation

### Gestures (Mobile)
- Swipe right: open sidebar
- Swipe left: close sidebar
- Tap: select/navigate
- Long press: quick actions
- Pull down: refresh

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | BottomNav, single column |
| Tablet | 640-1024px | Sidebar + grid (2 cols) |
| Desktop | > 1024px | Sidebar + grid (3 cols) |
| Wide | > 1536px | Sidebar + grid (4 cols) |

## Loading States

| State | Component | Visual |
|-------|-----------|--------|
| Initial | Welcome Screen | Animated gradient |
| Page | Loading | Spinner + text |
| List | Skeleton | Shimmer placeholders |
| Image | Lazy | Blur placeholder |
| Search | Debounce | Spinner in search |
| Action | Button | Inline spinner |
