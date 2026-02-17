import React from 'react';
import Cube3D from './Cube3D';
import { ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface HeroProps {
  user: User | null;
}

const Hero: React.FC<HeroProps> = ({ user }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-right space-y-8 z-10">
          
          {user ? (
             <div className="inline-block px-6 py-2 rounded-full border border-neon-pink/30 bg-neon-pink/10 text-neon-pink font-bold text-lg mb-4 animate-float">
                👋 مرحباً بك يا، {user.name}
             </div>
          ) : (
             <div className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan font-medium text-sm mb-4 animate-float">
               🚀 الجيل القادم من الويب
             </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            حول خيالك إلى
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mt-2 pb-2">
              واقع ثلاثي الأبعاد
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
            نقدم لك أدوات تصميم متطورة مدعومة بالذكاء الاصطناعي لبناء تجارب ويب غامرة وسريعة للغاية. انطلق نحو المستقبل اليوم.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden hover:scale-105 transition-transform">
              <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative group-hover:text-white flex items-center gap-2">
                اكتشف المزيد <ArrowLeft className="w-5 h-5" />
              </span>
            </button>
            
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm">
              شاهد العرض التوضيحي
            </button>
          </div>
        </div>

        {/* 3D Visual Content */}
        <div className="flex items-center justify-center relative h-[400px] lg:h-[600px]">
           {/* Grid floor illusion */}
           <div className="absolute bottom-10 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent transform rotate-x-60 scale-y-50"></div>
           
           <Cube3D />
        </div>
      </div>
    </section>
  );
};

export default Hero;