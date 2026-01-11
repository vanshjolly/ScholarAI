
import React, { useState } from 'react';
import { PenTool, Search, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';
import { explainConcept, generateStudyResources } from '../services/geminiService';
import { QuizQuestion, ThemeSettings } from '../types';

interface StudyAssistantProps {
  theme: ThemeSettings;
}

const StudyAssistant: React.FC<StudyAssistantProps> = ({ theme }) => {
  const [notes, setNotes] = useState('');
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Explain' | 'Resources'>('Explain');

  const handleExplain = async () => {
    if (!concept.trim()) return;
    setIsLoading(true);
    try {
      const result = await explainConcept(concept);
      setExplanation(result);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const handleResources = async () => {
    if (!notes.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateStudyResources(notes);
      setSummary(result.summary);
      setQuiz(result.quiz);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const accentColors = {
    violet: { bg: 'bg-violet-600', text: 'text-violet-600', shadow: 'shadow-violet-200 dark:shadow-violet-900/20', light: 'bg-violet-50 dark:bg-violet-900/20' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', shadow: 'shadow-emerald-200 dark:shadow-emerald-900/20', light: 'bg-emerald-50 dark:bg-emerald-900/20' },
    rose: { bg: 'bg-rose-600', text: 'text-rose-600', shadow: 'shadow-rose-200 dark:shadow-rose-900/20', light: 'bg-rose-50 dark:bg-rose-900/20' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/20', light: 'bg-blue-50 dark:bg-blue-900/20' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-600', shadow: 'shadow-amber-200 dark:shadow-amber-900/20', light: 'bg-amber-50 dark:bg-amber-900/20' },
  }[theme.accent];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('Explain')}
          className={`px-8 py-3 rounded-2xl font-black transition-all shadow-sm ${activeTab === 'Explain' ? `${accentColors.bg} text-white shadow-lg ${accentColors.shadow}` : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          Explain Concept
        </button>
        <button 
          onClick={() => setActiveTab('Resources')}
          className={`px-8 py-3 rounded-2xl font-black transition-all shadow-sm ${activeTab === 'Resources' ? `${accentColors.bg} text-white shadow-lg ${accentColors.shadow}` : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          Generate Resources
        </button>
      </div>

      {activeTab === 'Explain' ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-100">
                <Lightbulb className="text-amber-500 w-6 h-6" /> 
                Stuck on a Concept?
            </h3>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
                placeholder="e.g. Quantum Entanglement, Supply & Demand Curve..."
                className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all font-medium text-slate-700 dark:text-slate-200"
                style={{ '--tw-ring-color': theme.accent === 'violet' ? '#8b5cf6' : theme.accent === 'emerald' ? '#10b981' : theme.accent === 'rose' ? '#f43f5e' : theme.accent === 'blue' ? '#3b82f6' : '#f59e0b' } as any}
              />
              <button onClick={handleExplain} disabled={isLoading} className={`${accentColors.bg} text-white px-8 rounded-2xl hover:brightness-110 disabled:opacity-50 shadow-lg ${accentColors.shadow} transition-all active:scale-95`}>
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
          {explanation && (
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-md border border-slate-100 dark:border-slate-800 animate-fade-in">
              <h4 className={`text-2xl font-black mb-6 ${accentColors.text} tracking-tight`}>Explanation for "{concept}"</h4>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-lg font-medium">{explanation}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-100">
                <BookOpen className={`${accentColors.text} w-6 h-6`} /> 
                Knowledge Lab
            </h3>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full p-6 border border-slate-200 dark:border-slate-700 rounded-[2rem] mb-6 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none text-slate-700 dark:text-slate-200 font-medium"
              placeholder="Paste text from your slides, textbooks, or handwriting here..."
            ></textarea>
            <button onClick={handleResources} disabled={isLoading} className={`w-full py-5 ${accentColors.bg} text-white rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-xl ${accentColors.shadow} active:scale-[0.99] flex items-center justify-center gap-3`}>
              {isLoading ? (
                <>
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Synthesizing Knowledge...
                </>
              ) : 'Generate Summary & Quiz'}
            </button>
          </div>

          {summary && (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-md border border-slate-100 dark:border-slate-800">
                <h4 className={`font-black text-xl mb-6 ${accentColors.text} border-b dark:border-slate-800 pb-3 tracking-tight`}>Smart Summary</h4>
                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium">{summary}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-md border border-slate-100 dark:border-slate-800 flex flex-col">
                <h4 className="font-black text-xl mb-6 text-emerald-600 dark:text-emerald-400 border-b dark:border-slate-800 pb-3 tracking-tight">Practice Quiz</h4>
                <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                  {quiz.map((q, i) => (
                    <div key={i} className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <p className="font-black text-slate-800 dark:text-slate-100 text-base">{i+1}. {q.question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium">{opt}</div>
                        ))}
                      </div>
                      <details className="mt-4 group">
                        <summary className={`text-sm font-black ${accentColors.text} cursor-pointer hover:underline list-none flex items-center gap-2`}>
                            <CheckCircle className="w-4 h-4" /> View Solution
                        </summary>
                        <div className="mt-4 text-sm bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800 shadow-inner">
                          <span className="font-black text-emerald-700 dark:text-emerald-400 block mb-2">Correct: {q.answer}</span>
                          <p className="text-slate-600 dark:text-slate-400 italic font-medium">{q.explanation}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyAssistant;
