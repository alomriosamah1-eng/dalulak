# نظام التصميم (Design System)

## Core Colors

### Primary
- Purple: `#6A0DAD` (أساسي)
- Pink: `#f72585` (تكميلي)
- Turquoise: `#40E0D0` (تمييز)

### Semantic
- Success: `#10b981`
- Warning: `#f59e0b`
- Error: `#ef4444`
- Info: `#3b82f6`

### Dark Theme
```
Background: #0a0a0a
Surface: #121212
Card: rgba(255,255,255,0.05)
Text Primary: #ffffff
Text Secondary: #9ca3af
Text Muted: #6b7280
```

### Light Theme
```
Background: #eef2f7
Surface: #eef2f7
Card: rgba(0,0,0,0.02)
Text Primary: #111827
Text Secondary: #4b5563
Text Muted: #9ca3af
```

## Typography

### Headings
```
h1: text-4xl md:text-5xl font-black
h2: text-3xl md:text-4xl font-extrabold
h3: text-2xl font-bold
h4: text-xl font-bold
h5: text-lg font-semibold
```

### Body
```
body: text-base font-normal (Cairo, 400)
small: text-sm font-medium
caption: text-xs
```

## Effects

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Neumorphism
```css
.neu-card {
  background: var(--neu-bg);
  box-shadow: 8px 8px 16px #070707, -8px -8px 16px #1d1d1d;
}
```

### Animations
```
fadeIn: 0.6s ease
fadeInUp: 0.6s ease (مع translateY)
slideDown: 0.3s ease
scaleIn: 0.3s ease
modalIn: 0.3s ease-out
```
