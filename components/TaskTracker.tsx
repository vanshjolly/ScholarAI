
import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { Task, ThemeSettings } from '../types';

interface TaskTrackerProps {
  theme: ThemeSettings;
}

const TaskTracker: React.FC<TaskTrackerProps> = ({ theme }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  useEffect(() => {
    const saved = localStorage.getItem('scholar_tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('scholar_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTitle,
      deadline: newDeadline,
      priority: newPriority,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTitle('');
    setNewDeadline('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const accentColors = {
    violet: { bg: 'bg-violet-600', text: 'text-violet-600', shadow: 'shadow-violet-200 dark:shadow-violet-900/20', light: 'bg-violet-50 dark:bg-violet-900/20' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', shadow: 'shadow-emerald-200 dark:shadow-emerald-900/20', light: 'bg-emerald-50 dark:bg-emerald-900/20' },
    rose: { bg: 'bg-rose-600', text: 'text-rose-600', shadow: 'shadow-rose-200 dark:shadow-rose-900/20', light: 'bg-rose-50 dark:bg-rose-900/20' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/20', light: 'bg-blue-50 dark:bg-blue-900/20' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-600', shadow: 'shadow-amber-200 dark:shadow-amber-900/20', light: 'bg-amber-50 dark:bg-amber-900/20' },
  }[theme.accent];

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 animate-fade-in">
      <div className="md:col-span-1">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 sticky top-4 transition-colors duration-300">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Plus className={`w-6 h-6 ${accentColors.text}`}/> New Deadline
          </h3>
          <form onSubmit={addTask} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Task Title</label>
              <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium focus:ring-4 focus:ring-opacity-10 outline-none"
                placeholder="e.g. Physics Lab Report"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Deadline</label>
              <input 
                type="date" 
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-medium focus:ring-4 focus:ring-opacity-10 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Priority Level</label>
              <select 
                value={newPriority} 
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold focus:ring-4 focus:ring-opacity-10 outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <button className={`w-full py-4 ${accentColors.bg} text-white rounded-2xl font-black shadow-lg ${accentColors.shadow} hover:brightness-110 transition-all active:scale-95`}>
                Add to List
            </button>
          </form>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        <h3 className="text-3xl font-black flex items-center gap-4 text-slate-800 dark:text-slate-100 tracking-tight">
          <CheckSquare className={accentColors.text} size={32} />
          Your Milestones
          <span className={`ml-auto ${accentColors.light} ${accentColors.text} text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-current opacity-70`}>
            {tasks.filter(t => !t.completed).length} Tasks Pending
          </span>
        </h3>

        {tasks.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 opacity-50 flex flex-col items-center gap-4">
            <CheckSquare className="w-12 h-12 text-slate-300" />
            <p className="text-xl font-black text-slate-400">No upcoming deadlines. Relax!</p>
          </div>
        )}

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className={`bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6 hover-lift transition-all duration-300 ${task.completed ? 'opacity-50 grayscale' : ''}`}>
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.completed ? `${accentColors.bg} border-transparent scale-110 shadow-lg ${accentColors.shadow}` : 'border-slate-300 dark:border-slate-700 hover:border-violet-400'}`}
              >
                {task.completed && <CheckSquare className="w-5 h-5 text-white" />}
              </button>
              
              <div className="flex-1">
                <h4 className={`text-lg font-black tracking-tight ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>{task.title}</h4>
                <div className="flex items-center gap-6 mt-2">
                  {task.deadline && (
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                  <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                    task.priority === 'High' ? 'text-rose-500' : task.priority === 'Medium' ? 'text-amber-500' : 'text-slate-400'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {task.priority} Priority
                  </div>
                </div>
              </div>

              <button onClick={() => deleteTask(task.id)} className="text-slate-300 dark:text-slate-700 hover:text-rose-500 transition-colors p-3 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-2xl">
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;
