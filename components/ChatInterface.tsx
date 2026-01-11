
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Wand2 } from 'lucide-react';
import { getGeminiChatResponse } from '../services/geminiService';
import { ThemeSettings } from '../types';

interface ChatInterfaceProps {
  theme: ThemeSettings;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ theme }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getGeminiChatResponse(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Error: I'm having trouble connecting to my brain. Please check your API key!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const accentColors = {
    violet: { bg: 'bg-violet-600', text: 'text-violet-600', light: 'bg-violet-50 dark:bg-violet-900/20', gradient: 'from-violet-600 to-indigo-600', shadow: 'shadow-violet-200 dark:shadow-violet-900/20' },
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50 dark:bg-emerald-900/20', gradient: 'from-emerald-600 to-teal-600', shadow: 'shadow-emerald-200 dark:shadow-emerald-900/20' },
    rose: { bg: 'bg-rose-600', text: 'text-rose-600', light: 'bg-rose-50 dark:bg-rose-900/20', gradient: 'from-rose-600 to-pink-600', shadow: 'shadow-rose-200 dark:shadow-rose-900/20' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20', gradient: 'from-blue-600 to-cyan-600', shadow: 'shadow-blue-200 dark:shadow-blue-900/20' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50 dark:bg-amber-900/20', gradient: 'from-amber-600 to-orange-600', shadow: 'shadow-amber-200 dark:shadow-amber-900/20' },
  }[theme.accent];

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-fade-in transition-colors duration-300">
      <div className={`bg-gradient-to-r ${accentColors.gradient} p-8 text-white flex items-center justify-between`}>
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-amber-300" fill="currentColor" fillOpacity={0.4} />
            </div>
            AI Study Coach
          </h2>
          <p className="text-white/80 text-sm mt-1 font-medium opacity-80">Empowering your brain, one question at a time.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fdfdfd] dark:bg-slate-900/50" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60 px-10">
            <div className={`w-20 h-20 ${accentColors.light} rounded-[2rem] flex items-center justify-center`}>
              <Wand2 className={`w-10 h-10 ${accentColors.text}`} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 dark:text-slate-200">Ready to boost your learning?</p>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 max-w-sm">Ask me to clarify a tough topic, help you plan your week, or just give you some motivation!</p>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                m.role === 'user' ? 'bg-slate-800 dark:bg-slate-700' : accentColors.light
              }`}>
                {m.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className={`w-6 h-6 ${accentColors.text}`} />}
              </div>
              <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed font-medium whitespace-pre-wrap ${
                m.role === 'user' 
                  ? `${accentColors.bg} text-white rounded-tr-none shadow-lg ${accentColors.shadow}` 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm'
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4 max-w-[85%]">
              <div className={`w-10 h-10 rounded-2xl ${accentColors.light} flex items-center justify-center animate-pulse`}>
                <Bot className={`w-6 h-6 ${accentColors.text}`} />
              </div>
              <div className="p-5 bg-white dark:bg-slate-800 rounded-[1.5rem] rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm animate-pulse text-slate-400 dark:text-slate-500 font-bold italic">
                Gathering knowledge...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-3 max-w-5xl mx-auto items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your study question here..."
            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all font-medium text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50"
            style={{ '--tw-ring-color': theme.accent === 'violet' ? '#8b5cf6' : theme.accent === 'emerald' ? '#10b981' : theme.accent === 'rose' ? '#f43f5e' : theme.accent === 'blue' ? '#3b82f6' : '#f59e0b' } as any}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`${accentColors.bg} hover:brightness-110 text-white p-4 rounded-2xl transition-all disabled:opacity-50 shadow-xl ${accentColors.shadow} hover:scale-110 active:scale-95 group`}
          >
            <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
