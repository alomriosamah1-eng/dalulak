# محرك التسجيل والترجيح (Scoring Engine)

> إصدار: 1.0  
> آخر تحديث: يوليو 2026  
> الحالة: **تصميم أولي**

---

## 1. المفهوم

محرك التسجيل هو العقل المدبر الذي يقرر أي المهارات والمجالات والموارد هي الأكثر مناسبة لمستخدم معين.  
يعمل عبر نظام أوزان (Weighted Scoring System) يحسب درجة (Score) لكل كيان (مهارة، مورد، دورة) بناءً على ملف المستخدم.

---

## 2. معادلة التسجيل الأساسية

```
Score(entity, user) = Σ (Weight_i × MatchFactor_i) × PriorityMultiplier
```

حيث:
- `Weight_i` = وزن العامل i (قيمة ثابتة يحددها المشرف)
- `MatchFactor_i` = درجة التوافق بين المستخدم والكيان للعامل i (0.0–1.0)
- `PriorityMultiplier` = معامل أولوية (لترتيب النتائج النهائية)

---

## 3. عوامل التسجيل (Scoring Factors)

| المعرف (ID) | العامل | الوزن الافتراضي | شرح |
|-------------|--------|-----------------|-----|
| `goal_match` | توافق الهدف | 30 | هل المهارة/المورد يحقق أحد أهداف المستخدم؟ |
| `interest_match` | توافق الاهتمام | 20 | هل المجال ضمن اهتمامات المستخدم؟ |
| `level_match` | توافق المستوى | 15 | هل مستوى المهارة مناسب لخبرة المستخدم؟ |
| `learning_style` | أسلوب التعلم | 10 | هل تنسيق المورد يناسب طرق التعلم المفضلة؟ |
| `language_match` | توافق اللغة | 10 | هل المورد متاح بلغة المستخدم؟ |
| `time_availability` | الوقت المتاح | 5 | هل المدة المقدرة للمورد تناسب وقت المستخدم؟ |
| `price_match` | توافق السعر | 5 | هل سعر المورد ضمن ميزانية المستخدم؟ |
| `device_match` | توافق الجهاز | 3 | هل المورد يعمل على جهاز المستخدم؟ |
| `career_match` | توافق المسار الوظيفي | 2 | هل المورد يقرب المستخدم من حلمه الوظيفي؟ |

---

## 4. طريقة احتساب كل عامل

### 4.1 `goal_match`

```
إذا كانت المهارة مرتبطة بهدف المستخدم → 1.0
إذا كانت المهارة مرتبطة بهدف مشابه → 0.7
إذا لم تكن مرتبطة → 0.0
```

**مثال:** مستخدم هدفه "تعلم البرمجة" → مهارة "JavaScript" تأخذ `goal_match = 1.0`

### 4.2 `interest_match`

```
إذا كان المجال ضمن الاهتمامات → 1.0
إذا كان مجالاً قريباً → 0.5
إذا لم يكن → 0.0
```

### 4.3 `level_match`

```
مستوى المستخدم = "مبتدئ", مستوى المهارة = "مبتدئ" → 1.0
مستوى المستخدم = "متوسط", مستوى المهارة = "متوسط" → 1.0
مستوى المستخدم = "مبتدئ", مستوى المهارة = "متقدم" → 0.3
مستوى المستخدم = "متقدم", مستوى المهارة = "مبتدئ" → 0.2 (سهل جداً)
```

```typescript
function calculateLevelMatch(
  userLevel: SkillLevel,
  resourceLevel: SkillLevel
): number {
  const levels: SkillLevel[] = [
    'absolute_beginner', 'beginner', 'intermediate', 'advanced', 'expert'
  ];
  const userIndex = levels.indexOf(userLevel);
  const resourceIndex = levels.indexOf(resourceLevel);
  const diff = Math.abs(userIndex - resourceIndex);

  if (diff === 0) return 1.0;
  if (diff === 1) return 0.6;
  if (diff === 2) return 0.3;
  return 0.1;
}
```

### 4.4 `learning_style`

```
إذا كان نوع المورد (فيديو، كتاب، دورة) ضمن أساليب المستخدم → 1.0
إذا كان قريباً (مثلاً "مقالات" قريبة من "كتب") → 0.5
إذا لم يكن → 0.1
```

### 4.5 `language_match`

```
لغة المستخدم = "عربية" والمورد بالعربية → 1.0
لغة المستخدم = "العربية والإنجليزية" → 1.0 لأي لغة
لغة المستخدم = "إنجليزية" والمورد بالعربية → 0.3
لغة المستخدم = "عربية" والمورد بالإنجليزية ومستوى الإنجليزية = "متقدم" → 0.7
```

### 4.6 `time_availability`

```
الوقت المتاح للمستخدم ÷ الوقت المطلوب للمورد
مع حد أقصى 1.0
```

إذا كان الوقت المطلوب 10 ساعات والمستخدم لديه 4 ساعات/أسبوعياً → `4/10 = 0.4`

### 4.7 `price_match`

```
يفضل مجاني → موارد مجانية تأخذ 1.0, مدفوعة تأخذ 0.0
يمكنه الدفع → جميع الموارد تأخذ 1.0 (عدا المدفوعة جداً)
مستثمر → الموارد المدفوعة عالية الجودة تأخذ 1.2 (Bonus)
```

### 4.8 `device_match`

```
المورد يعمل على نظام تشغيل المستخدم → 1.0
لا يعمل → 0.0
```

### 4.9 `career_match`

```
المورد مرتبط بشكل مباشر بالوظيفة المستهدفة → 1.0
مرتبط بشكل غير مباشر → 0.5
غير مرتبط → 0.0
```

---

## 5. أولوية النتائج (Priority Multiplier)

بعد حساب الدرجة الأولية، يطبّق `PriorityMultiplier` لإعطاء أولوية لبعض النتائج:

```typescript
const priorityMultipliers = {
  foundation_course: 1.3,       // دورات الأساس تأخذ أولوية أعلى
  recommended_path: 1.2,        // الموارد ضمن المسار الموصى به
  trending: 1.1,                // الموارد الرائجة حالياً
  new_release: 1.05,            // الموارد الجديدة
  default: 1.0,
};
```

---

## 6. التطبيع (Normalization)

بعد انتهاء الحساب، تُطبّع النتائج إلى مجال 0–100:

```typescript
function normalizeScores(scores: EntityScore[]): EntityScore[] {
  const maxScore = Math.max(...scores.map(s => s.rawScore));
  if (maxScore === 0) return scores;

  return scores.map(s => ({
    ...s,
    finalScore: Math.round((s.rawScore / maxScore) * 100),
  }));
}
```

---

## 7. ترتيب النتائج

```typescript
function rankEntities(scores: EntityScore[]): EntityScore[] {
  return normalizeScores(scores).sort((a, b) => b.finalScore - a.finalScore);
}
```

---

## 8. هيكل النتيجة

```typescript
interface EntityScore {
  entityId: string;
  entityType: 'skill' | 'course' | 'video' | 'book' | 'tool' | 'project' | 'certificate' | 'job';
  entityName: string;
  rawScore: number;
  finalScore: number;       // بعد التطبيع (0–100)
  factors: Record<string, number>;  // scores لكل factor
  priorityBonus: number;
}
```

---

## 9. إدارة الأوزان من لوحة الإدارة

يجب أن تكون جميع الأوزان قابلة للتعديل من لوحة الإدارة بدون تعديل الكود:

```json
{
  "factors": {
    "goal_match": { "weight": 30, "active": true },
    "interest_match": { "weight": 20, "active": true },
    "level_match": { "weight": 15, "active": true },
    "learning_style": { "weight": 10, "active": true },
    "language_match": { "weight": 10, "active": true },
    "time_availability": { "weight": 5, "active": true },
    "price_match": { "weight": 5, "active": true },
    "device_match": { "weight": 3, "active": false },
    "career_match": { "weight": 2, "active": true }
  },
  "priorityMultipliers": {
    "foundation_course": 1.3,
    "recommended_path": 1.2,
    "trending": 1.1,
    "new_release": 1.05
  }
}
```

---

## 10. مثال كامل

```
مستخدم:
  - العمر: 19-24
  - الهدف: تعلم البرمجة
  - الاهتمامات: برمجة، ذكاء اصطناعي
  - المستوى: مبتدئ
  - أسلوب التعلم: فيديو، مشاريع
  - الوقت: 6-10 ساعات/أسبوعياً
  - يفضل المجاني
  - الإنجليزية: متوسط

المورد: "CS50" (دورة برمجة مقدمة من Harvard)
  goal_match = 1.0 (مرتبط بتعلم البرمجة)
  interest_match = 1.0 (برمجة)
  level_match = 0.6 (مبتدئ +, فرق مستوى واحد)
  learning_style = 1.0 (فيديو)
  language_match = 0.7 (إنجليزية بمستوى متوسط)
  time_availability = 0.8 (10 ساعات / 12 ساعة للدورة)
  price_match = 1.0 (مجاني)
  device_match = 1.0 (أونلاين)
  career_match = 0.5 (مرتبط غير مباشر بوظيفة مطور)

Score = (30×1.0 + 20×1.0 + 15×0.6 + 10×1.0 + 10×0.7 + 5×0.8 + 5×1.0 + 3×1.0 + 2×0.5) × 1.3
      = (30 + 20 + 9 + 10 + 7 + 4 + 5 + 3 + 1) × 1.3
      = 89 × 1.3
      = 115.7

finalScore = 100 (بعد التطبيع)
```
