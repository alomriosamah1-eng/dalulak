export interface CrawlSource {
  id: string;
  name: string;
  url: string;
  type: 'awesome-list' | 'directory' | 'curated-list' | 'platform' | 'github' | 'wiki';
  primaryCategory: string;
  priority: number;
  crawlFrequencyDays: number;
  selectors?: {
    itemContainer?: string;
    title?: string;
    description?: string;
    link?: string;
    logo?: string;
    tags?: string;
  };
}

export const SOURCES: CrawlSource[] = [
  // ===== GitHub Awesome Lists =====
  {
    id: 'awesome-for-beginners',
    name: 'Awesome for Beginners',
    url: 'https://github.com/mungell/awesome-for-beginners',
    type: 'awesome-list',
    primaryCategory: 'programming',
    priority: 10,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-selfhosted',
    name: 'Awesome Selfhosted',
    url: 'https://github.com/awesome-selfhosted/awesome-selfhosted',
    type: 'awesome-list',
    primaryCategory: 'tools',
    priority: 8,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-python',
    name: 'Awesome Python',
    url: 'https://github.com/vinta/awesome-python',
    type: 'awesome-list',
    primaryCategory: 'programming',
    priority: 7,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-react',
    name: 'Awesome React',
    url: 'https://github.com/enaqx/awesome-react',
    type: 'awesome-list',
    primaryCategory: 'programming',
    priority: 7,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-ml',
    name: 'Awesome Machine Learning',
    url: 'https://github.com/josephmisiti/awesome-machine-learning',
    type: 'awesome-list',
    primaryCategory: 'ai',
    priority: 9,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-datascience',
    name: 'Awesome Data Science',
    url: 'https://github.com/academic/awesome-datascience',
    type: 'awesome-list',
    primaryCategory: 'data-science',
    priority: 8,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-llm',
    name: 'Awesome LLM',
    url: 'https://github.com/Hannibal046/Awesome-LLM',
    type: 'awesome-list',
    primaryCategory: 'ai',
    priority: 9,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-cybersecurity',
    name: 'Awesome Cybersecurity',
    url: 'https://github.com/fabionoth/awesome-cyber-security',
    type: 'awesome-list',
    primaryCategory: 'cybersecurity',
    priority: 7,
    crawlFrequencyDays: 30,
  },
  {
    id: 'awesome-free-courses',
    name: 'Awesome Free Courses',
    url: 'https://github.com/Developer-Y/cs-video-courses',
    type: 'awesome-list',
    primaryCategory: 'education',
    priority: 10,
    crawlFrequencyDays: 30,
  },

  // ===== Educational Directories =====
  {
    id: 'class-central',
    name: 'Class Central',
    url: 'https://www.classcentral.com/subjects',
    type: 'directory',
    primaryCategory: 'education',
    priority: 10,
    crawlFrequencyDays: 14,
    selectors: {
      itemContainer: '.course-list-card',
      title: '.course-name',
      description: '.course-description',
      link: 'a',
      logo: 'img',
    },
  },
  {
    id: 'freecodecamp-news',
    name: 'freeCodeCamp News',
    url: 'https://www.freecodecamp.org/news',
    type: 'curated-list',
    primaryCategory: 'programming',
    priority: 8,
    crawlFrequencyDays: 7,
  },
  {
    id: 'dev-to',
    name: 'DEV Community',
    url: 'https://dev.to/t/learning',
    type: 'curated-list',
    primaryCategory: 'programming',
    priority: 6,
    crawlFrequencyDays: 7,
  },

  // ===== AI Tools Directories =====
  {
    id: 'thereisai',
    name: 'There Is An AI',
    url: 'https://www.thereisai.com',
    type: 'directory',
    primaryCategory: 'ai',
    priority: 9,
    crawlFrequencyDays: 14,
  },
  {
    id: 'futurepedia',
    name: 'Futurepedia',
    url: 'https://www.futurepedia.io',
    type: 'directory',
    primaryCategory: 'ai',
    priority: 9,
    crawlFrequencyDays: 14,
  },

  // ===== Arabic Resources =====
  {
    id: 'edraak',
    name: 'Edraak',
    url: 'https://www.edraak.org/programs/',
    type: 'platform',
    primaryCategory: 'education',
    priority: 10,
    crawlFrequencyDays: 14,
  },
  {
    id: 'rwaq',
    name: 'Rwaq',
    url: 'https://www.rwaq.org/courses',
    type: 'platform',
    primaryCategory: 'education',
    priority: 10,
    crawlFrequencyDays: 14,
  },

  // ===== Open Courseware =====
  {
    id: 'mit-ocw',
    name: 'MIT OpenCourseWare',
    url: 'https://ocw.mit.edu/search/',
    type: 'platform',
    primaryCategory: 'education',
    priority: 8,
    crawlFrequencyDays: 30,
  },

  // ===== Learning Platforms =====
  {
    id: 'kaggle-learn',
    name: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn',
    type: 'platform',
    primaryCategory: 'data-science',
    priority: 8,
    crawlFrequencyDays: 30,
  },
];
