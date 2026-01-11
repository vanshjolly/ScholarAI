
export interface Task {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

export interface StudyPlanItem {
  day: string;
  time: string;
  activity: string;
  topic: string;
}

export interface StudyPlan {
  subjects: string[];
  examDates: string;
  dailyHours: number;
  schedule: StudyPlanItem[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export type ViewType = 'Dashboard' | 'StudyPlanner' | 'StudyAssistant' | 'Wellness' | 'Tasks' | 'Chat';

export type AccentColor = 'violet' | 'emerald' | 'rose' | 'blue' | 'amber';

export interface ThemeSettings {
  darkMode: boolean;
  accent: AccentColor;
}
