import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, BrainCircuit, ArrowLeft, Bot, User as UserIcon, Sparkles, Trash2, StopCircle } from 'lucide-react';
import { solveComplexProblem } from '../services/geminiService';
import { AIChatMessage, User } from '../types';

interface GeminiPageProps {
  onBack?: () => void;
  user: User | null;
}

const GeminiDemo: React.FC<GeminiPageProps> = ({ onBack, user }) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Call the thinking model service
      const responseText = await solveComplexProblem(userMsg.text);

      const aiMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("هل أنت متأكد من مسح المحادثة؟")) {
        setMessages([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050510] flex flex-col animate-fadeIn">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-[#0a0a1a]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center">
               <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
                <h1 className="text-white font-bold text-sm md:text-base">Nebula Arm 2.0</h1>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-400">Model Active</span>
                </div>
            </div>
          </div>
        </div>
        
        {messages.length > 0 && (
            <button 
                onClick={handleClearChat}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                title="مسح المحادثة"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        )}
      </header>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Empty State */}
            {messages.length === 0 && (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-neon-purple/20 border border-white/10">
                        <Sparkles className="w-10 h-10 text-neon-purple" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        أهلاً <span className="text-neon-cyan">{user ? user.name : 'بك'}</span>
                    </h2>
                    <p className="text-gray-400 max-w-md mb-8">
                        أنا نموذج Nebula Arm 2.0، قادر على التفكير العميق وحل المشكلات المعقدة برمجياً وعلمياً.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                        {[
                            "اشرح لي كيف تعمل الحواسيب الكمومية ببساطة",
                            "ساعدني في كتابة كود Python لتحليل البيانات",
                            "قم بحل معادلة تفاضلية من الدرجة الثانية",
                            "اقترح خطة تسويقية لمنتج جديد"
                        ].map((suggestion, idx) => (
                            <button 
                                key={idx}
                                onClick={() => { setInput(suggestion); }}
                                className="p-4 rounded-xl bg-[#111122] border border-white/5 hover:border-neon-blue/30 hover:bg-white/5 text-sm text-gray-300 hover:text-white text-right transition-all"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Messages List */}
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                    {/* Avatar */}
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'user' 
                        ? 'bg-white/10 text-gray-300' 
                        : 'bg-gradient-to-br from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/20'
                    }`}>
                        {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-5 py-3.5 rounded-2xl text-sm md:text-base leading-relaxed ${
                            msg.role === 'user'
                            ? 'bg-[#1a1a2e] text-white rounded-tr-none border border-white/10'
                            : 'bg-transparent text-gray-100 rounded-tl-none pl-0'
                        }`}>
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 px-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                </div>
            ))}

            {/* Loading / Thinking State */}
            {loading && (
                <div className="flex gap-4 animate-fadeIn">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white flex items-center justify-center shrink-0 animate-pulse">
                        <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="flex items-center gap-2 text-neon-cyan text-sm font-bold animate-pulse">
                             <Loader2 className="w-4 h-4 animate-spin" />
                             جاري التفكير والتحليل...
                        </div>
                        <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-neon-cyan animate-progressBar"></div>
                        </div>
                    </div>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#050510] border-t border-white/10 shrink-0">
         <div className="max-w-3xl mx-auto relative">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                placeholder="اسأل Nebula Arm أي شيء..."
                className="w-full bg-[#111122] text-white rounded-2xl pl-12 pr-4 py-4 min-h-[56px] max-h-[200px] outline-none border border-white/10 focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/20 transition-all resize-none shadow-lg placeholder-gray-500 custom-scrollbar"
                disabled={loading}
                style={{ height: '56px' }} // Initial height
            />
            <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={`absolute left-2 top-2 p-2.5 rounded-xl transition-all ${
                    input.trim() && !loading
                    ? 'bg-neon-blue text-white hover:bg-neon-purple shadow-lg shadow-neon-blue/20' 
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
            >
                {loading ? <StopCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
            </button>
         </div>
         <p className="text-center text-[10px] text-gray-600 mt-2">
            يمكن للذكاء الاصطناعي أن يرتكب أخطاء. يرجى التحقق من المعلومات المهمة.
         </p>
      </div>
    </div>
  );
};

export default GeminiDemo;