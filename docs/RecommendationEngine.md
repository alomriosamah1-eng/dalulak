# محرك التوصيات (Recommendation Engine)

> إصدار: 1.0  
> آخر تحديث: يوليو 2026  
> الحالة: **تصميم أولي**

---

## 1. المفهوم

محرك التوصيات هو المسؤول عن اقتراح المحتوى المناسب للمستخدم في الوقت المناسب.  
على عكس `ScoringEngine` الذي يعمل في الخلفية لحساب النقاط، فإن **محرك التوصيات** يقرر **ماذا يظهر للمستخدم ومتى**.

---

## 2. أنواع التوصيات

| النوع | الوصف | مثال |
|-------|-------|------|
| **Onboarding** | بعد الإرشاد مباشرة | "نوصي ببدء دورة CS50" |
| **Daily** | كل يوم في الصفحة الرئيسية | "اقتراحات اليوم" |
| **Weekly** | بداية الأسبوع | "أهداف هذا الأسبوع" |
| **Adaptive** | حسب أداء المستخدم | "نلاحظ أنك تتقن CSS → جرّب Flexbox Game" |
| **Gap-based** | لفجوات التعلم | "لاحظنا أنك تواجه صعوبة في JavaScript → راجع الأساسيات" |
| **Social** | بناءً على مجتمع المستخدمين | "المستخدمون مثلك يتابعون هذه الدورة" |
| **Milestone** | عند إكمال مرحلة | "أكملت المرحلة الأولى! المرحلة التالية: التطبيق" |

---

## 3. الخوارزميات

### 3.1 التصفية التعاونية (Collaborative Filtering) — للأسبِق

```typescript
function collaborativeFiltering(
  userId: string,
  similarUsers: string[]
): RecommendedResource[] {
  // 1. اعثر على مستخدمين مشابهين
  const neighbors = findNearestNeighbors(userId, similarUsers, 10);

  // 2. اجمع الموارد التي أكملها هؤلاء المستخدمون
  const neighborResources = neighbors.flatMap(n => n.completedResources);

  // 3. صفي الموارد التي لم يكملها المستخدم بعد
  const userCompleted = getUserCompletedResources(userId);
  const newResources = neighborResources.filter(
    r => !userCompleted.includes(r.id)
  );

  // 4. رتب حسب الشهرة بين المجموعة
  return rankByPopularity(newResources, neighbors);
}
```

### 3.2 التصفية القائمة على المحتوى (Content-Based)

```typescript
function contentBasedFiltering(
  user: UserProfile,
  allResources: Resource[]
): RecommendedResource[] {
  return allResources
    .map(resource => ({
      resource,
      score: calculateContentSimilarity(user, resource),
    }))
    .filter(item => item.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(item => item.resource);
}

function calculateContentSimilarity(
  user: UserProfile,
  resource: Resource
): number {
  let score = 0;

  // الأهداف
  if (resource.goals?.some(g => user.goals.includes(g))) score += 0.3;
  // الاهتمامات
  if (resource.tags?.some(t => user.interests.includes(t))) score += 0.25;
  // المستوى
  if (resource.level === user.techExperience) score += 0.2;
  // اللغة
  if (resource.language === user.demographics.preferredLanguage) score += 0.15;
  // أسلوب التعلم
  if (user.learningStyles.includes(resource.format?.[0] ?? '')) score += 0.1;

  return score;
}
```

### 3.3 التوصيات الهجينة (Hybrid — الموصى بها)

```typescript
function hybridRecommendation(
  userId: string,
  user: UserProfile,
  allResources: Resource[]
): RecommendedResource[] {
  const contentBased = contentBasedFiltering(user, allResources);
  const collaborative = collaborativeFiltering(userId, getSimilarUserIds(user));
  const scoringEngine = rankEntities(scoreAllResources(user, allResources));

  // دمج النتائج بنظام الأوزان
  const merged = mergeRecommendations([
    { list: contentBased, weight: 0.3 },
    { list: collaborative, weight: 0.2 },
    { list: scoringEngine, weight: 0.5 },
  ]);

  return merged.slice(0, 20);
}
```

---

## 4. التوصيات اليومية

```typescript
function getDailyRecommendations(
  user: UserProfile,
  path: LearningPath
): DailyRecommendation {
  const today = new Date().toISOString().split('T')[0];

  // 1. الدرس التالي في المسار
  const nextLesson = findNextLesson(path);

  // 2. الموارد الموصى بها اليوم (تتنوع لتجنب التكرار)
  const dailyResources = getResourcesForToday(path, today);

  // 3. مراجعة سريعة لنقاط الضعف
  const reviewItems = getReviewItems(user, 3);

  // 4. اقتراح مشروع صغير
  const miniProject = suggestMiniProject(path);

  return {
    nextLesson,
    dailyResources,
    reviewItems,
    miniProject,
  };
}
```

### تجنب تكرار التوصيات

```typescript
function getResourcesForToday(path: LearningPath, today: string): Resource[] {
  const seenIds = getSeenResourceIds(path.userId, today);

  const available = path.phases
    .filter(p => p.status === 'available' || p.status === 'in_progress')
    .flatMap(p => p.resources)
    .filter(r => !seenIds.includes(r.id) && !r.completed)
    .sort((a, b) => b.priority - a.priority);

  return available.slice(0, 5);
}
```

---

## 5. الكشف عن نقاط الضعف والتوصية بالمراجعة

```typescript
function getReviewItems(
  profile: UserProfile,
  maxItems: number
): ReviewItem[] {
  const reviewItems: ReviewItem[] = [];

  for (const [skillId, progress] of Object.entries(profile.stats.skills)) {
    const daysSinceLastAccess = daysAgo(progress.lastAccessed);

    // مراجعة إذا مضى أكثر من 7 أيام على آخر وصول
    if (daysSinceLastAccess > 7 && progress.progress < 100) {
      reviewItems.push({
        skillId,
        reason: 'لم تراجع هذه المهارة منذ أكثر من أسبوع',
        daysSinceLastAccess,
        suggestedResource: getReviewResource(skillId),
      });
    }

    // مراجعة إذا كانت درجة الاختبار منخفضة
    if (getAverageQuizScore(skillId, profile) < 50) {
      reviewItems.push({
        skillId,
        reason: 'درجة اختبار منخفضة — تحتاج مراجعة',
        suggestedResource: getFoundationResource(skillId),
      });
    }
  }

  return reviewItems.sort((a, b) => b.daysSinceLastAccess - a.daysSinceLastAccess)
    .slice(0, maxItems);
}
```

---

## 6. التوصيات الأسبوعية

في بداية كل أسبوع، المحرك يقترح:

```typescript
function getWeeklyRecommendations(
  profile: UserProfile,
  path: LearningPath
): WeeklyRecommendation {
  const weeklyGoal = profile.stats.weeklyGoal;
  const lastWeekHours = getLastWeekHours(profile.id);

  return {
    // أهداف الأسبوع
    suggestedGoal: weeklyGoal,
    lastWeekAchievement: lastWeekHours,
    percentageChange: ((weeklyGoal - lastWeekHours) / weeklyGoal) * 100,

    // موارد الأسبوع
    weeklyResources: getWeeklyResources(path, weeklyGoal),

    // مشاريع الأسبوع
    weeklyProjects: suggestWeeklyProjects(path, weeklyGoal),

    // اختبار الأسبوع
    weeklyQuiz: suggestWeeklyQuiz(path),
  };
}
```

---

## 7. التوصيات التكيفية (Adaptive)

بناءً على السلوك اللحظي للمستخدم:

```typescript
const ADAPTIVE_RULES = [
  {
    condition: (u: UserProgress) =>
      u.currentSkillQuizScore < 40 && u.currentSkillAttempt > 2,
    action: (u: UserProgress) => ({
      type: 'suggest_review' as const,
      message: 'يبدو أنك تواجه صعوبة — راجع الأساسيات أولاً',
      resource: getEasierResource(u.currentSkillId),
    }),
  },
  {
    condition: (u: UserProgress) =>
      u.currentSkillProgress > 80 &&
      u.currentSkillQuizScore > 80,
    action: (u: UserProgress) => ({
      type: 'suggest_challenge' as const,
      message: 'ممتاز! هل تريد تجربة تحدٍ جديد؟',
      resource: getHarderResource(u.currentSkillId),
    }),
  },
  {
    condition: (u: UserProgress) =>
      u.sessionDuration > 120 && u.lastBreakAt < Date.now() - 90 * 60000,
    action: () => ({
      type: 'suggest_break' as const,
      message: 'لقد درست أكثر من ساعتين — خذ استراحة ☕',
    }),
  },
];
```

---

## 8. إدارة التوصيات من لوحة الإدارة

```typescript
// إضافة قاعدة توصية جديدة
POST /api/admin/recommendations/rules
{
  "condition": "user.progress.skills.{id}.score < 40",
  "action": "suggest_review",
  "priority": 5,
  "active": true
}

// تعديل وزن خوارزمية
PATCH /api/admin/recommendations/algorithms
{
  "hybrid": {
    "contentBasedWeight": 0.3,
    "collaborativeWeight": 0.2,
    "scoringEngineWeight": 0.5
  }
}

// تعطيل نوع توصية
PATCH /api/admin/recommendations/types/daily
{
  "active": false
}
```

---

## 9. نظام التغذية الراجعة (Feedback Loop)

لكل توصية، المستخدم يستطيع تقييمها:

```
أظهرنا للمستخدم: "CS50"
المستخدم ضغط: ✅ مفيد / ❌ ليس الآن / ⏭️ تخطى
```

هذه التغذية تُستخدم لتحسين التوصيات المستقبلية:

```typescript
function processFeedback(feedback: RecommendationFeedback): void {
  const user = getUser(feedback.userId);

  if (feedback.action === 'not_useful') {
    // خفض وزن المهارة المرتبطة بهذا المورد
    user.penaltySkills[feedback.relatedSkill] =
      (user.penaltySkills[feedback.relatedSkill] ?? 0) + 1;
  }

  if (feedback.action === 'useful') {
    // رفع وزن المهارة
    user.bonusSkills[feedback.relatedSkill] =
      (user.bonusSkills[feedback.relatedSkill] ?? 0) + 1;
  }

  saveUser(user);
}
```
