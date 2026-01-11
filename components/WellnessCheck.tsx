
import React, { useState } from 'react';
import { Heart, AlertCircle, Info, Smile, Frown, Meh, Zap, Moon, Sparkles } from 'lucide-react';
import { getWellnessAdvice } from '../services/geminiService';

const WellnessCheck: React.FC = () => {
  const [mood, setMood] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const moods = [
    { label: 'Stressed', icon: Zap, color: 'text-orange-500 bg-orange-50 hover:bg-orange-100 border-orange-100' },
    { label: 'Burnt Out', icon: Moon, color: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border-indigo-100' },
    { label: 'Neutral', icon: Meh, color: 'text-slate-500 bg-slate-50 hover:bg-slate-100 border-slate-100' },
    { label: 'Motivated', icon: Smile, color: 'text-teal-500 bg-teal-50 hover:bg-teal-100 border-teal-100' },
    { label: 'Anxious', icon: Frown, color: 'text-rose-500 bg-rose-50 hover:bg-rose-100 border-rose-100' },
  ];

  const handleMoodSelect = async (selectedMood: string) => {
    setMood(selectedMood);
    setIsLoading(true);
    try {
      const res = await getWellnessAdvice(selectedMood);
      setAdvice(res);
    } catch (e) { 
        console.error(e); 
        setAdvice("I'm here for you, but I'm having a little trouble thinking. Take a deep breath and maybe try again in a minute.");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-rose-100 border border-slate-100 text-center">
        <div className="space-y-6 mb-12">
          <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-12 h-12 text-rose-500" fill="currentColor" fillOpacity={0.2} />
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">How are you truly feeling?</h2>
          <p className="text-slate-500 max-w-lg mx-auto text-lg font-medium leading-relaxed">
            Take a moment to check in with yourself. Your emotional health is the fuel for your academic engine.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {moods.map((m) => {
            const Icon = m.icon;
            const isSelected = mood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => handleMoodSelect(m.label)}
                className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                  isSelected 
                    ? 'border-violet-600 shadow-xl shadow-violet-100 scale-110 -translate-y-2' 
                    : 'border-transparent hover:scale-105'
                } ${m.color}`}
              >
                <div className={`p-3 rounded-2xl ${isSelected ? 'bg-white/50' : ''}`}>
                    <Icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{m.label}</span>
              </button>
            );
          })}
        </div>

        {advice && (
          <div className="mt-12 text-left animate-fade-in">
            <div className="bg-gradient-to-br from-slate-50 to-violet-50/30 p-10 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                <Sparkles className="absolute right-6 top-6 w-12 h-12 text-violet-200 opacity-50 group-hover:rotate-12 transition-transform" />
                <div className="flex items-start gap-4 mb-6">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm">
                        <Info className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 pt-1 tracking-tight">AI Wellness Insight</h3>
                </div>
                <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap italic font-medium">
                    "{advice}"
                </div>
                
                <div className="mt-10 flex items-center gap-4 p-5 bg-amber-50/50 rounded-2xl text-amber-900 text-xs border border-amber-100/50 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                    <p className="font-bold opacity-80 uppercase tracking-wide leading-relaxed">
                        <strong className="text-amber-700">Medical Disclaimer:</strong> This AI guidance is for informational and encouragement purposes only. It is not a clinical diagnosis. If you are struggling, please reach out to professional university services.
                    </p>
                </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-12 flex flex-col items-center gap-4 animate-pulse">
            <div className="flex gap-2">
                <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce delay-150"></div>
            </div>
            <p className="text-violet-400 font-black uppercase tracking-widest text-xs">AI is listening to your heart...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessCheck;
