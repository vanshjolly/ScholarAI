
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  PenTool, 
  Heart, 
  CheckSquare, 
  MessageCircle, 
  Sparkle, 
  Moon, 
  Sun,
  Palette
} from 'lucide-react';
import { ViewType, ThemeSettings, AccentColor } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  theme: ThemeSettings;
  onThemeChange: (theme: Partial<ThemeSettings>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, theme, onThemeChange }) => {
  const items = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Chat', icon: MessageCircle, label: 'AI Coach' },
    { id: 'StudyPlanner', icon: BookOpen, label: 'Study Planner' },
    { id: 'StudyAssistant', icon: PenTool, label: 'Study Lab' },
    { id: 'Tasks', icon: CheckSquare, label: 'Deadlines' },
    { id: 'Wellness', icon: Heart, label: 'Well-being' },
  ];

  const accents: { color: AccentColor, class: string }[] = [
    { color: 'violet', class: 'bg-violet-500' },
    { color: 'emerald', class: 'bg-emerald-500' },
    { color: 'rose', class: 'bg-rose-500' },
    { color: 'blue', class: 'bg-blue-500' },
    { color: 'amber', class: 'bg-amber-500' },
  ];

  const activeColorClass = {
    violet: 'bg-violet-600 shadow-violet-200 dark:shadow-violet-900/20',
    emerald: 'bg-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/20',
    rose: 'bg-rose-600 shadow-rose-200 dark:shadow-rose-900/20',
    blue: 'bg-blue-600 shadow-blue-200 dark:shadow-blue-900/20',
    amber: 'bg-amber-600 shadow-amber-200 dark:shadow-amber-900/20',
  }[theme.accent];

  const hoverColorClass = {
    violet: 'hover:text-violet-600 dark:hover:text-violet-400',
    emerald: 'hover:text-emerald-600 dark:hover:text-emerald-400',
    rose: 'hover:text-rose-600 dark:hover:text-rose-400',
    blue: 'hover:text-blue-600 dark:hover:text-blue-400',
    amber: 'hover:text-amber-600 dark:hover:text-amber-400',
  }[theme.accent];

  return (
    <div className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col fixed left-0 top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-colors duration-300">
      <div className="p-8">
        <h1 className={`text-2xl font-black flex items-center gap-2 tracking-tight transition-colors duration-300 ${
          theme.accent === 'violet' ? 'text-violet-600' :
          theme.accent === 'emerald' ? 'text-emerald-600' :
          theme.accent === 'rose' ? 'text-rose-600' :
          theme.accent === 'blue' ? 'text-blue-600' : 'text-amber-600'
        }`}>
          <div className={`p-1.5 rounded-lg transition-colors duration-300 ${
            theme.accent === 'violet' ? 'bg-violet-500' :
            theme.accent === 'emerald' ? 'bg-emerald-500' :
            theme.accent === 'rose' ? 'bg-rose-500' :
            theme.accent === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
          }`}>
            <Sparkle className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <span>ScholarAI</span>
        </h1>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-bold tracking-[0.2em] uppercase pl-1">MVP Companion</p>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? `${activeColorClass} text-white shadow-lg translate-x-1` 
                  : `text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 ${hoverColorClass}`
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-inherit'}`} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Theme Selection Section */}
      <div className="p-6 m-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Personalize</span>
          </div>
          <button 
            onClick={() => onThemeChange({ darkMode: !theme.darkMode })}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 shadow-sm hover:scale-110 transition-transform"
          >
            {theme.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
        
        <div className="flex justify-between items-center gap-1">
          {accents.map((acc) => (
            <button
              key={acc.color}
              onClick={() => onThemeChange({ accent: acc.color })}
              className={`w-6 h-6 rounded-full transition-all border-2 ${
                theme.accent === acc.color 
                  ? 'border-white dark:border-slate-900 scale-125 shadow-sm' 
                  : 'border-transparent hover:scale-110'
              } ${acc.class}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
