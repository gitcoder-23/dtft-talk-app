import { Colors } from './color';

export interface StudentProfile {
  name: string;
  id: string;
  level: string;
  streakDays: number;
  dailyGoalMinutes: number;
  speakingScore: number;
  avatar: any;
}

export interface QuickCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  targetScreen?: string;
}

export interface PracticeCardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
  actionText: string;
}

export interface TopicItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface NoteItem {
  id: string;
  title: string;
  category: 'Grammar' | 'Vocabulary' | 'Conversation' | 'Speaking' | 'Listening';
  description: string;
  pages: number;
  fileType: string;
  fileSize: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface PracticeModuleItem {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Not Started';
  description: string;
  lessons: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  actionText: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface CurriculumItem {
  id: number;
  step: string;
  title: string;
  lessons: string;
  duration: string;
  color: string;
}

export interface CourseHighlight {
  id: number;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Testimonial {
  id: number;
  name: string;
  stars: number;
  comment: string;
  avatarColor: string;
}

// Mock Datasets
export const CURRENT_STUDENT: StudentProfile = {
  name: 'Rahul Sharma',
  id: 'DTFT-2026-ENG89',
  level: 'Beginner',
  streakDays: 7,
  dailyGoalMinutes: 15,
  speakingScore: 68,
  avatar: require('../../assets/images/student_avatar.png'),
};

export const HOME_QUICK_CATEGORIES: QuickCategory[] = [
  { id: '1', title: 'My Notes', icon: 'document-text', color: Colors.success, bgColor: Colors.successLight, targetScreen: 'Notes' },
  { id: '2', title: 'Grammar Practice', icon: 'book', color: Colors.danger, bgColor: Colors.dangerLight, targetScreen: 'Practice' },
  { id: '3', title: 'Speaking Practice', icon: 'mic', color: Colors.primary, bgColor: Colors.primaryLight, targetScreen: 'Practice' },
  { id: '4', title: 'Listening Practice', icon: 'headset', color: Colors.warning, bgColor: Colors.warningLight, targetScreen: 'Practice' },
  { id: '5', title: 'Vocabulary Builder', icon: 'text', color: Colors.purple, bgColor: Colors.purpleLight, targetScreen: 'Practice' },
  { id: '6', title: 'Conversation Practice', icon: 'chatbubbles', color: Colors.secondary, bgColor: Colors.secondaryLight, targetScreen: 'Practice' },
];

export const CONTINUE_LEARNING_ITEM = {
  id: 'cl-1',
  title: 'Present Simple Tense',
  category: 'Grammar',
  description: 'Learn the rules, usage and practice with examples.',
  completedLessons: 3,
  totalLessons: 5,
  exampleText: 'I play\nYou play\nHe plays...',
  progressPercent: 60,
};

export const TODAY_PRACTICE_ITEMS: PracticeCardItem[] = [
  { id: '1', title: 'Speaking', subtitle: 'Record & Improve', icon: 'mic', color: Colors.danger, bgColor: Colors.dangerLight, actionText: 'Start →' },
  { id: '2', title: 'Listening', subtitle: 'Listen & Answer', icon: 'headset', color: Colors.primary, bgColor: Colors.primaryLight, actionText: 'Start →' },
  { id: '3', title: 'Grammar', subtitle: 'Quick Practice', icon: 'document-text', color: Colors.success, bgColor: Colors.successLight, actionText: 'Start →' },
  { id: '4', title: 'Daily Quiz', subtitle: 'Test Your Skills', icon: 'help-circle', color: Colors.purple, bgColor: Colors.purpleLight, actionText: 'Start →' },
];

export const POPULAR_TOPICS: TopicItem[] = [
  { id: '1', title: 'Tenses', icon: 'time', color: Colors.primary, bgColor: Colors.primaryLight },
  { id: '2', title: 'Articles', icon: 'document', color: Colors.warning, bgColor: Colors.warningLight },
  { id: '3', title: 'Prepositions', icon: 'location', color: Colors.success, bgColor: Colors.successLight },
  { id: '4', title: 'Sentence Formation', icon: 'create', color: Colors.danger, bgColor: Colors.dangerLight },
  { id: '5', title: 'Active & Passive Voice', icon: 'swap-horizontal', color: Colors.purple, bgColor: Colors.purpleLight },
  { id: '6', title: 'Modal Verbs', icon: 'star', color: Colors.cyan, bgColor: Colors.tealLight },
  { id: '7', title: 'Conditionals', icon: 'git-branch', color: Colors.secondary, bgColor: Colors.secondaryLight },
  { id: '8', title: 'Phrasal Verbs', icon: 'link', color: Colors.indigo, bgColor: Colors.indigoLight },
];

export const ALL_NOTES: NoteItem[] = [
  {
    id: 'n1',
    title: 'Basic Grammar Rules',
    category: 'Grammar',
    description: 'Important grammar rules with examples and practice exercises.',
    pages: 12,
    fileType: 'PDF',
    fileSize: '2.5 MB',
    icon: 'book',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
  },
  {
    id: 'n2',
    title: 'Tense Notes (Complete Guide)',
    category: 'Grammar',
    description: 'All types of tenses with simple explanations and examples.',
    pages: 18,
    fileType: 'PDF',
    fileSize: '3.2 MB',
    icon: 'time',
    color: Colors.success,
    bgColor: Colors.successLight,
  },
  {
    id: 'n3',
    title: 'Daily Vocabulary (1000+ Words)',
    category: 'Vocabulary',
    description: 'Useful words with meaning, example and usage in daily life.',
    pages: 20,
    fileType: 'PDF',
    fileSize: '4.1 MB',
    icon: 'text',
    color: Colors.warning,
    bgColor: Colors.warningLight,
  },
  {
    id: 'n4',
    title: 'Real Life Conversations',
    category: 'Conversation',
    description: 'Common English conversations for daily life, travel, office and more.',
    pages: 16,
    fileType: 'PDF',
    fileSize: '2.8 MB',
    icon: 'chatbubbles',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
  },
  {
    id: 'n5',
    title: 'Speaking Tips & Fluency',
    category: 'Speaking',
    description: 'Tips, mouth exercises, useful phrases and speaking practice.',
    pages: 14,
    fileType: 'PDF',
    fileSize: '2.3 MB',
    icon: 'mic',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
  },
  {
    id: 'n6',
    title: 'Listening Practice (Audio + Notes)',
    category: 'Listening',
    description: 'Listen to short conversations and answer questions.',
    pages: 10,
    fileType: 'PDF',
    fileSize: '1.9 MB',
    icon: 'headset',
    color: Colors.cyan,
    bgColor: Colors.tealLight,
  },
];

export const SPEAKING_MODULES: PracticeModuleItem[] = [
  {
    id: 'sm1',
    title: 'Introduce Yourself',
    status: 'New',
    description: 'Learn how to introduce yourself, your family, your hobbies and your goals.',
    lessons: '5 Lessons',
    duration: '15 min',
    level: 'Beginner',
    actionText: 'Start →',
    icon: 'person',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
  },
  {
    id: 'sm2',
    title: 'Daily Conversations',
    status: 'In Progress',
    description: 'Practice common daily conversations like greetings, shopping, ordering food etc.',
    lessons: '8 Lessons',
    duration: '20 min',
    level: 'Beginner',
    actionText: 'Continue →',
    icon: 'chatbubbles',
    color: Colors.success,
    bgColor: Colors.successLight,
  },
  {
    id: 'sm3',
    title: 'Interview Preparation',
    status: 'Not Started',
    description: 'Common interview questions and answers with real-life examples.',
    lessons: '6 Lessons',
    duration: '18 min',
    level: 'Intermediate',
    actionText: 'Start →',
    icon: 'briefcase',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
  },
  {
    id: 'sm4',
    title: 'Travel English',
    status: 'Not Started',
    description: 'Essential phrases for airport, hotel, restaurant, shopping and more.',
    lessons: '7 Lessons',
    duration: '18 min',
    level: 'Beginner',
    actionText: 'Start →',
    icon: 'airplane',
    color: Colors.warning,
    bgColor: Colors.warningLight,
  },
  {
    id: 'sm5',
    title: 'Group Discussion',
    status: 'Not Started',
    description: 'Express your ideas, listen to others and improve your fluency.',
    lessons: '5 Lessons',
    duration: '16 min',
    level: 'Intermediate',
    actionText: 'Start →',
    icon: 'people',
    color: Colors.indigo,
    bgColor: Colors.indigoLight,
  },
];

export const COMPLETE_COURSE_DATA = {
  title: 'Spoken English (Complete Course)',
  tag: 'Beginner',
  subtitle: 'Speak confidently in everyday life, school, college, and at work.',
  duration: '12 Weeks',
  level: 'Beginner',
  students: '2.5K+',
  rating: 4.8,
  price: '₹2,999',
  originalPrice: '₹4,999',
  discount: '40% OFF',
  overview:
    'The Spoken English (Complete Course) is designed to help you build a strong foundation in English communication. Through simple explanations, real-life examples and guided practice, you will learn to speak English confidently and naturally.',
  stickyQuote: 'Better English Brighter Future',
  keyOutcomes: [
    'Build basic to advanced speaking skills',
    'Understand grammar in real context',
    'Improve pronunciation & fluency',
    'Gain confidence in conversations',
    'Learn everyday vocabulary',
    'Prepare for interviews & real-life situations',
  ],
  curriculum: [
    { id: 1, step: '1', title: 'Greetings & Introduction', lessons: '8 Lessons', duration: '45 min', color: Colors.primary },
    { id: 2, step: '2', title: 'Daily Conversations', lessons: '10 Lessons', duration: '60 min', color: Colors.success },
    { id: 3, step: '3', title: 'Grammar Basics', lessons: '12 Lessons', duration: '90 min', color: Colors.orange500 },
    { id: 4, step: '4', title: 'Vocabulary Building', lessons: '10 Lessons', duration: '75 min', color: Colors.danger },
    { id: 5, step: '5', title: 'Pronunciation Practice', lessons: '8 Lessons', duration: '60 min', color: Colors.purple },
  ] as CurriculumItem[],
  highlights: [
    { id: 1, title: 'Audio Lessons & Practice', icon: 'mic', color: Colors.purple, bgColor: Colors.purpleLight },
    { id: 2, title: 'PDF Notes (Downloadable)', icon: 'document-text', color: Colors.success, bgColor: Colors.successLight },
    { id: 3, title: 'Real-Life Examples', icon: 'play-circle', color: Colors.danger, bgColor: Colors.dangerLight },
    { id: 4, title: 'Certificate of Completion', icon: 'ribbon', color: Colors.warning, bgColor: Colors.warningLight },
  ] as CourseHighlight[],
  instructor: {
    name: "Ananya Ma'am",
    title: 'Spoken English Trainer | 8+ Years Experience',
    quote: "Speak with confidence. I'm here to guide you every step of the way!",
  },
  reviews: {
    average: 4.8,
    totalCount: '2,356 reviews',
    list: [
      {
        id: 1,
        name: 'Riya Das',
        stars: 5,
        comment: 'Very helpful and easy to understand. Now I can speak with more confidence!',
        avatarColor: Colors.primaryLight,
      },
      {
        id: 2,
        name: 'Rahul Sen',
        stars: 5,
        comment: 'The practice sessions are really good. This course is worth it!',
        avatarColor: Colors.dangerLight,
      },
    ] as Testimonial[],
  },
};
