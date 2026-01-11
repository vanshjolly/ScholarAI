
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Trash2, BrainCircuit, Wand2 } from 'lucide-react';
import { StudyPlan, ThemeSettings } from '../types';
import { generateStudyPlan } from '../services/geminiService';

interface StudyPlannerProps {
  theme: ThemeSettings;
}

const StudyPlanner: React.FC<StudyPlannerProps> = ({ theme }) => {
  const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Computer Science']);
  const [newSubject, setNewSubject] = useState('');
  const [examDates, setExamDates] = useState('');
  const [dailyHours, setDailyHours] = useState(4);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('study_plan');
    if (saved) setPlan(JSON.parse(saved));
  }, []);

  const handleGenerate = async () => {
    if (subjects.length === 0 || !examDates) return;
    setIsLoading(true);
    try {
      const result = await generateStudyPlan(subjects, examDates, dailyHours);
      setPlan(result);
      localStorage.setItem('study_plan', JSON.stringify(result));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const accentColors = {
    violet: { bg: 'bg-violet-600', text: 'text-violet-600', light: 'bg-violet-50 dark:bg-violet-900/20', shadow: 'shadow-violet-200 dark:shadow-violet-900/20', gradient: 'from-violet-600 to-indigo-600', border: 'border-violet-100 dark:border-violet-800' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50 dark:bg-emerald-900/20', shadow: 'shadow-emerald-200 dark:shadow-emerald-900/20', gradient: 'from-emerald-600 to-teal-600', border: 'border-emerald-100 dark:border-emerald-800' },
    rose: { bg: 'bg-rose-600', text: 'text-rose-600', light: 'bg-rose-50 dark:bg-rose-900/20', shadow: 'shadow-rose-200 dark:shadow-rose-900/20', gradient: 'from-rose-600 to-pink-600', border: 'border-rose-100 dark:border-rose-800' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20', shadow: 'shadow-blue-200 dark:shadow-blue-900/20', gradient: 'from-blue-600 to-cyan-600', border: 'border-blue-100 dark:border-blue-800' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50 dark:bg-amber-900/20', shadow: 'shadow-amber-200 dark:shadow-amber-900/20', gradient: 'from-amber-600 to-orange-600', border: 'border-amber-100 dark:border-amber-800' },
  }[theme.accent];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center gap-4 mb-10">
          <div className={`${accentColors.light} p-3 rounded-[1rem]`}>
            <BrainCircuit className={`w-8 h-8 ${accentColors.text}`} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">AI Strategy Engine</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Define your goals and let AI optimize your time.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Focus Subjects</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-opacity-20 outline-none font-medium text-slate-800 dark:text-slate-200"
                placeholder="e.g. Organic Chemistry"
              />
              <button onClick={addSubject} className={`p-3 ${accentColors.bg} text-white rounded-xl hover:brightness-110 transition shadow-lg ${accentColors.shadow}`}>
                <Plus className="w-6 h-6"/>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {subjects.map((s, i) => (
                <span key={i} className={`px-4 py-2 ${accentColors.light} ${accentColors.text} rounded-[1rem] text-xs font-black uppercase flex items-center gap-2 border ${accentColors.border} transition-all hover:scale-105 shadow-sm`}>
                  {s}
                  <button onClick={() => setSubjects(subjects.filter((_, idx) => idx !== i))} className="hover:text-rose-500 transition">
                    <Trash2 className="w-3.5 h-3.5"/>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Target Deadline</label>
            <div className="relative">
                <input 
                type="text" 
                value={examDates}
                onChange={(e) => setExamDates(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-opacity-20 outline-none font-medium pl-10 text-slate-800 dark:text-slate-200"
                placeholder="e.g. Next month's finals"
                />
                <Calendar className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Available Hours / Day</label>
            <div className="relative">
                <input 
                type="number" 
                min="1" max="12"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-opacity-20 outline-none font-medium pl-10 text-slate-800 dark:text-slate-200"
                />
                <Clock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            </div>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className={`mt-12 w-full py-5 bg-gradient-to-r ${accentColors.gradient} text-white rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-xl ${accentColors.shadow} disabled:opacity-50 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]`}
        >
          {isLoading ? (
            <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Optimizing Your Schedule...
            </>
          ) : (
            <>
                <Wand2 className="w-6 h-6" />
                Generate AI Study Plan
            </>
          )}
        </button>
      </div>

      {plan && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between px-4">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <Calendar className={`w-6 h-6 ${accentColors.text}`} />
                Your Blueprint for Success
              </h3>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
                Strategy Optimized
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.schedule.map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-7 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 hover-lift group">
                <div className="flex justify-between items-start mb-5">
                  <span className={`${accentColors.bg} px-4 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg ${accentColors.shadow}`}>{item.day}</span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </div>
                </div>
                <h4 className={`font-black text-slate-800 dark:text-slate-100 text-lg mb-2 group-hover:${accentColors.text} transition-colors leading-tight`}>{item.activity}</h4>
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${accentColors.bg} opacity-50`}></div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.topic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
