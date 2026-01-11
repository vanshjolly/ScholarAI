
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import StudyPlanner from './components/StudyPlanner';
import StudyAssistant from './components/StudyAssistant';
import WellnessCheck from './components/WellnessCheck';
import TaskTracker from './components/TaskTracker';
import { ViewType, ThemeSettings, AccentColor } from './types';
import { 
  Sparkles, 
  ChevronRight, 
  Target, 
  Calendar as CalIcon, 
  BookOpen, 
  Clock,
  ArrowUpRight,
  Heart
} from 'lucide-react';

const Dashboard: React.FC<{ setView: (v: ViewType) => void, theme: ThemeSettings }> = ({ setView, theme }) => {
  const accent = theme.accent;
  const accentClasses = {
    violet: 'from-violet-600 via-violet-500 to-fuchsia-500 shadow-violet-200 dark:shadow-violet-900/10 text-violet-600 bg-violet-50 dark:bg-violet-900/10',
    emerald: 'from-emerald-600 via-emerald-500 to-teal-500 shadow-emerald-200 dark:shadow-emerald-900/10 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10',
    rose: 'from-rose-600 via-rose-500 to-pink-500 shadow-rose-200 dark:shadow-rose-900/10 text-rose-600 bg-rose-50 dark:bg-rose-900/10',
    blue: 'from-blue-600 via-blue-500 to-indigo-500 shadow-blue-200 dark:shadow-blue-900/10 text-blue-600 bg-blue-50 dark:bg-blue-900/10',
    amber: 'from-amber-600 via-amber-500 to-orange-500 shadow-amber-200 dark:shadow-amber-900/10 text-amber-600 bg-amber-50 dark:bg-amber-900/10',
  }[accent];

  const primaryBtn = {
    violet: 'bg-violet-600 hover:bg-violet-700 shadow-violet-200 dark:shadow-violet-900/20',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 dark:shadow-emerald-900/20',
    rose: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200 dark:shadow-rose-900/20',
    blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-blue-900/20',
    amber: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200 dark:shadow-amber-900/20',
  }[accent];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div className={`bg-gradient-to-br ${accentClasses.split(' ')[0]} ${accentClasses.split(' ')[1]} ${accentClasses.split(' ')[2]} rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden transition-all duration-500`}>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wider uppercase border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Optimized Learning
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Welcome Back,<br/>Scholar! 👋</h2>
          <p className="text-white/90 max-w-lg text-lg font-medium opacity-90 leading-relaxed">
            Your study journey is soaring. You have 3 deadlines approaching and your focus streak is stronger than ever. Let's conquer today!
          </p>
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => setView('Chat')}
              className={`bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-xl shadow-black/10 flex items-center gap-2 hover:scale-105 active:scale-95`}
            >
              Open AI Lab <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('StudyAssistant')}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all flex items-center gap-2"
            >
              Analyze Notes
            </button>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-white opacity-[0.05] rounded-full blur-[100px]"></div>
        <Sparkles className="absolute right-[-20px] top-[-20px] w-80 h-80 text-white opacity-10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: 'Study Goal', icon: Target, val: '4 Hours', desc: 'Focus target for today', color: accentClasses.split(' ')[4], bg: accentClasses.split(' ')[5] },
            { label: 'Upcoming', icon: CalIcon, val: '4 Days', desc: 'Until Maths Midterm', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
            { label: 'Mastery', icon: BookOpen, val: '12 Items', desc: 'New concepts explored', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            { label: 'Streak', icon: Clock, val: '5 Days', desc: 'Continuous study record', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
        ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-7 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 hover-lift group transition-colors duration-300">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">{item.label}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{item.val}</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{item.desc}</p>
            </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Focus Timeline</h3>
              <button className={`${accentClasses.split(' ')[4]} font-bold text-sm hover:underline`}>Edit Schedule</button>
          </div>
          <div className="space-y-6">
            {[
              { time: '09:00 AM', title: 'Calculus Intensive', sub: 'Mastering Integration by Parts', color: `bg-${accent}-500`, shadow: `shadow-${accent}-200` },
              { time: '11:30 AM', title: 'Wellness Break', sub: 'Sunlight & Hydration', color: 'bg-emerald-500', shadow: 'shadow-emerald-100' },
              { time: '02:00 PM', title: 'Data Structures Lab', sub: 'Recursive Tree Traversal', color: 'bg-fuchsia-500', shadow: 'shadow-fuchsia-100' },
            ].map((slot, i) => (
              <div key={i} className="flex gap-6 items-center group cursor-pointer">
                <div className="text-sm font-black text-slate-400 dark:text-slate-500 w-24 tracking-tighter">{slot.time}</div>
                <div className="w-1.5 h-16 rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1/2 rounded-full ${slot.color}`}></div>
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl group-hover:bg-white dark:group-hover:bg-slate-800 border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-700 transition-all duration-300">
                  <h4 className="font-black text-slate-800 dark:text-slate-100 tracking-tight">{slot.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{slot.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-center text-center space-y-6 transition-all duration-300`}>
          <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <Heart className="text-rose-500 w-10 h-10" fill="currentColor" fillOpacity={0.2} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Need a breather?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-relaxed">
            Academic life is a marathon, not a sprint. Let's check in on how you're feeling.
          </p>
          <button 
            onClick={() => setView('Wellness')} 
            className={`w-full py-5 ${primaryBtn} text-white rounded-[1.5rem] font-black transition-all shadow-xl hover:scale-[1.02] active:scale-95`}
          >
            Daily Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Dashboard');
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('scholar_theme');
    return saved ? JSON.parse(saved) : { darkMode: false, accent: 'violet' };
  });

  useEffect(() => {
    localStorage.setItem('scholar_theme', JSON.stringify(theme));
    if (theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (newSettings: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...newSettings }));
  };

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard': return <Dashboard setView={setCurrentView} theme={theme} />;
      case 'Chat': return <div className="animate-fade-in"><ChatInterface theme={theme} /></div>;
      case 'StudyPlanner': return <div className="animate-fade-in"><StudyPlanner theme={theme} /></div>;
      case 'StudyAssistant': return <div className="animate-fade-in"><StudyAssistant theme={theme} /></div>;
      case 'Wellness': return <div className="animate-fade-in"><WellnessCheck /></div>;
      case 'Tasks': return <div className="animate-fade-in"><TaskTracker theme={theme} /></div>;
      default: return <Dashboard setView={setCurrentView} theme={theme} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        theme={theme} 
        onThemeChange={handleThemeChange} 
      />
      
      <main className="ml-64 p-10 min-h-screen max-w-[1400px] mx-auto">
        <header className="flex justify-between items-end mb-12 glass-effect sticky top-6 z-20 py-6 px-10 rounded-[2rem] shadow-sm transition-all duration-300">
          <div>
            <span className={`font-black text-xs uppercase tracking-[0.3em] mb-1 block transition-colors duration-300 ${
              theme.accent === 'violet' ? 'text-violet-600' :
              theme.accent === 'emerald' ? 'text-emerald-600' :
              theme.accent === 'rose' ? 'text-rose-600' :
              theme.accent === 'blue' ? 'text-blue-600' : 'text-amber-600'
            }`}>Current Space</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">{currentView}</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-sm transition-colors duration-300">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Gemini Active</span>
             </div>
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg border-4 border-white dark:border-slate-800 transition-all duration-300 ${
               theme.accent === 'violet' ? 'bg-violet-600' :
               theme.accent === 'emerald' ? 'bg-emerald-600' :
               theme.accent === 'rose' ? 'bg-rose-600' :
               theme.accent === 'blue' ? 'bg-blue-600' : 'bg-amber-600'
             }`}>
                JD
             </div>
          </div>
        </header>

        <div className="relative">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
