// ===== Arabic Text Normalization =====

const arabicNormalizationMap: Record<string, string> = {
  'أ': 'ا', 'إ': 'ا', 'آ': 'ا',
  'ة': 'ه',
  'ى': 'ي',
  'ؤ': 'و',
  'ئ': 'ي',
};

const arabicDiacritics = /[\u064B-\u065F\u0670]/g;
const tatweel = /[\u0640]/g;

export function normalizeArabic(text: string): string {
  let normalized = text
    .replace(arabicDiacritics, '')
    .replace(tatweel, '')
    .normalize('NFC');

  normalized = normalized
    .split('')
    .map(ch => arabicNormalizationMap[ch] || ch)
    .join('');

  return normalized.toLowerCase();
}

// ===== Stop Words =====

const arabicStopWords = new Set([
  'في', 'من', 'إلى', 'عن', 'على', 'مع', 'هذا', 'هذه', 'ذلك', 'تلك',
  'الذي', 'التي', 'الذين', 'اللواتي', 'ما', 'ماذا', 'لم', 'لن', 'له',
  'لها', 'لهم', 'لهن', 'كان', 'كانت', 'كانوا', 'يكون', 'ليس', 'ليست',
  'قد', 'سوف', 'سي', 'سأ', 'إن', 'أن', 'إذا', 'لو', 'لولا', 'لكن',
  'أو', 'أم', 'ثم', 'ف', 'و', 'لا', 'بل', 'بعد', 'قبل', 'فوق', 'تحت',
  'عند', 'مع', 'بين', 'خلال', 'دون', 'حول', 'حسب', 'غير', 'كل', 'بعض',
  'أي', 'أين', 'كيف', 'متى', 'كم', 'هو', 'هي', 'هم', 'هن', 'أنا', 'نحن',
  'أنت', 'أنتم', 'أنتن', 'علي', 'إلي', 'لدي', 'لدى', 'لقد', 'هل',
]);

const englishStopWords = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'by', 'with', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'can', 'could', 'may', 'might', 'shall', 'should', 'not',
  'no', 'nor', 'so', 'if', 'then', 'than', 'that', 'this', 'these',
  'those', 'it', 'its', 'you', 'your', 'he', 'she', 'they', 'we', 'our',
  'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
  'such', 'only', 'own', 'same', 'what', 'which', 'who', 'whom', 'when',
  'where', 'why', 'how',
]);

const allStopWords = new Set([...arabicStopWords, ...englishStopWords]);

export function removeStopWords(words: string[]): string[] {
  return words.filter(w => !allStopWords.has(w) && w.length > 1);
}

// ===== Fuzzy Search (Levenshtein) =====

export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

export function fuzzyMatch(query: string, target: string, threshold: number = 0.3): boolean {
  const normalizedQuery = normalizeArabic(query);
  const normalizedTarget = normalizeArabic(target);
  const distance = levenshteinDistance(normalizedQuery, normalizedTarget);
  const maxLen = Math.max(normalizedQuery.length, normalizedTarget.length);
  return maxLen === 0 ? true : distance / maxLen <= threshold;
}

// ===== Synonyms =====

const arabicSynonyms: Record<string, string[]> = {
  'برمجة': ['تطوير', 'كود', 'برمجة'],
  'تعلم': ['دراسة', 'تعليم', 'تدريب'],
  'مجاني': ['مفتوح', 'حر', 'بدون'],
  'شهادة': ['معتمدة', 'إتمام', 'certificate'],
  'دورة': ['مساق', 'course', 'تدريب'],
  'منصة': ['موقع', 'تطبيق', 'platform'],
  'أداة': ['tool', 'برنامج', 'تطبيق'],
  'عمل': ['freelance', 'حر', 'عن بعد'],
  'ذكاء اصطناعي': ['ai', 'machine learning', 'تعلم آلة'],
};

const englishSynonyms: Record<string, string[]> = {
  'programming': ['coding', 'development', 'software'],
  'free': ['gratis', 'open', 'zero-cost'],
  'learn': ['study', 'education', 'course'],
  'certificate': ['certification', 'credential', 'diploma'],
  'tool': ['software', 'app', 'application'],
  'work': ['job', 'freelance', 'employment'],
  'ai': ['artificial intelligence', 'machine learning', 'ml'],
};

export function expandWithSynonyms(word: string): string[] {
  const normalized = word.toLowerCase();
  const arabicResult = arabicSynonyms[normalized] || [];
  const englishResult = englishSynonyms[normalized] || [];
  return [word, ...arabicResult, ...englishResult];
}

// ===== Search Types =====

export interface SearchOptions {
  query: string;
  fields?: ('name' | 'description' | 'features' | 'tags' | 'keywords' | 'category')[];
  categories?: string[];
  languages?: string[];
  levels?: string[];
  pricing?: string[];
  types?: string[];
  hasFreeCertificate?: boolean;
  isFree?: boolean;
  limit?: number;
  offset?: number;
  fuzzyThreshold?: number;
  useSynonyms?: boolean;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  time: number;
  suggestions: string[];
}

export function normalizeQuery(query: string): string {
  return normalizeArabic(query.trim().toLowerCase());
}

export function tokenize(query: string): string[] {
  const normalized = normalizeQuery(query);
  const words = normalized.split(/[\s,،.\-_\t\n]+/).filter(Boolean);
  return removeStopWords(words);
}

export function getSearchSuggestions(query: string, allTerms: string[]): string[] {
  const words = tokenize(query);
  const suggestions: string[] = [];

  for (const term of allTerms) {
    for (const word of words) {
      if (fuzzyMatch(word, term, 0.4)) {
        suggestions.push(term);
      }
    }
  }

  return [...new Set(suggestions)].slice(0, 5);
}
