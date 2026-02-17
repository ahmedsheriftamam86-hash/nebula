import React, { useRef, useState } from 'react';
import { Zap, Shield, Box, Globe, Cpu, Layers, ArrowRight, Code, Terminal, Server, Database, Cloud } from 'lucide-react';

interface FeaturesProps {
  onBack?: () => void; // Optional prop to handle navigation back
  isPage?: boolean;    // Flag to change layout if it's a full page
}

const features = [
  { icon: <Box className="w-8 h-8 text-neon-cyan" />, title: "3D Native", desc: "محرك عرض WebGL فائق السرعة يدعم العناصر ثلاثية الأبعاد المعقدة مباشرة في المتصفح دون إضافات." },
  { icon: <Cpu className="w-8 h-8 text-neon-purple" />, title: "Gemini 3.0 Integration", desc: "استخدم أحدث نماذج الذكاء الاصطناعي من Google مع قدرات التفكير (Thinking) وحل المشكلات المعقدة." },
  { icon: <Zap className="w-8 h-8 text-neon-pink" />, title: "Zero Latency", desc: "بنية تحتية موزعة تضمن استجابة فورية (Real-time) للمحادثات والتفاعلات ثلاثية الأبعاد." },
  { icon: <Shield className="w-8 h-8 text-green-400" />, title: "Enterprise Security", desc: "تشفير من طرف لطرف AES-256 لجميع البيانات، مع حماية ضد هجمات DDoS." },
  { icon: <Globe className="w-8 h-8 text-yellow-400" />, title: "Global Edge CDN", desc: "يتم تحميل الأصول من أقرب خادم للمستخدم بفضل شبكة CDN العالمية الخاصة بنا." },
  { icon: <Layers className="w-8 h-8 text-orange-400" />, title: "Seamless API", desc: "واجهة برمجة تطبيقات (API) سهلة الاستخدام لدمج نيبولا مع تطبيقات React أو Vue أو Angular." },
  { icon: <Code className="w-8 h-8 text-blue-400" />, title: "Clean Architecture", desc: "كود نظيف وقابل للتطوير مبني على أحدث معايير هندسة البرمجيات." },
  { icon: <Terminal className="w-8 h-8 text-gray-400" />, title: "CLI Tools", desc: "أدوات سطر أوامر قوية لإدارة مشاريعك ونشرها بلمسة زر." },
  { icon: <Cloud className="w-8 h-8 text-indigo-400" />, title: "Auto Scaling", desc: "يتوسع النظام تلقائياً للتعامل مع ملايين المستخدمين المتزامنين دون توقف." },
];

const FeatureCard: React.FC<{ item: typeof features[0] }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group h-full perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="h-full p-8 rounded-2xl bg-[#0f0f20]/60 border border-white/5 hover:border-neon-blue/50 transition-all duration-200 ease-out backdrop-blur-sm shadow-xl flex flex-col items-start text-right"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
         {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ transform: 'translateZ(20px)' }}></div>
        
        <div className="relative z-10 transform translate-z-10 w-full" style={{ transform: 'translateZ(30px)' }}>
          <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-colors shadow-lg">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors">{item.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC<FeaturesProps> = ({ onBack, isPage = false }) => {
  return (
    <section id="features" className={`${isPage ? 'min-h-screen pt-28 pb-12 animate-fadeIn' : 'py-24'} bg-[#050510] relative`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 fixed"></div>
      
      {isPage && (
          <div className="absolute top-24 left-4 z-50 md:left-8">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105"
              >
                  <ArrowRight className="w-4 h-4" />
                  العودة للرئيسية
              </button>
          </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink">
              {isPage ? "جميع مميزات المنصة" : "مميزات خرافية"}
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            استكشف التقنيات التي تجعل نيبولا المنصة الأسرع والأكثر ذكاءً في العالم العربي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, isPage ? features.length : 3).map((feature, idx) => (
            <FeatureCard key={idx} item={feature} />
          ))}
        </div>
        
        {!isPage && (
             <div className="mt-12 text-center">
                 <button onClick={onBack} className="text-neon-cyan hover:text-white font-bold text-lg underline decoration-dashed underline-offset-8 hover:decoration-solid transition-all">
                     عرض كافة المميزات ({features.length})
                 </button>
             </div>
        )}
      </div>
    </section>
  );
};

export default Features;