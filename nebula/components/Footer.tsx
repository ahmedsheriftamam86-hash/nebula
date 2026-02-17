import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020205] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">نيبولا</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              نحن نبني مستقبل الويب من خلال دمج الجماليات ثلاثية الأبعاد مع ذكاء Gemini الاصطناعي لتقديم تجارب لا تُنسى.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-neon-blue hover:text-white flex items-center justify-center transition-all text-gray-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-neon-cyan hover:text-white flex items-center justify-center transition-all text-gray-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-neon-purple hover:text-white flex items-center justify-center transition-all text-gray-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">عن الشركة</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">الخدمات</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">المشاريع</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">قانوني</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-neon-pink transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-neon-pink transition-colors">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-neon-pink transition-colors">الكوكيز</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-1 text-sm">
            صنع بـ <Heart className="w-4 h-4 text-red-500 fill-current" /> بواسطة فريق نيبولا © 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;