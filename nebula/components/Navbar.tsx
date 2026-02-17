import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, User as UserIcon, LogOut, Shield, Database, Users, Home, Zap, Sparkles, ChevronLeft } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onOpenUserAuth: () => void;
  onOpenAdminAuth: () => void;
  onOpenDashboard: () => void;
  onOpenCommunity: () => void;
  onLogout: () => void;
  onNavigate: (page: 'home' | 'features' | 'ai-chat') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  onOpenUserAuth, 
  onOpenAdminAuth, 
  onOpenDashboard, 
  onOpenCommunity,
  onLogout,
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = currentUser?.role === 'admin';

  const handleNavClick = (page: 'home' | 'features' | 'ai-chat', id?: string) => {
    onNavigate(page);
    setMenuOpen(false);
    if (id && page === 'home') {
        setTimeout(() => {
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050510]/80 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-4">
              {/* Main Menu Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white transition-all group"
              >
                <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>

              <div 
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-neon-blue to-neon-pink rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-neon-blue/20">
                  <Rocket className="text-white w-6 h-6 group-hover:animate-pulse" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 hidden sm:block transition-all duration-300 group-hover:text-white group-hover:tracking-wider">
                  Nebula
                </span>
              </div>
            </div>
            
            {/* Desktop Quick Links */}
            <div className="hidden md:flex items-center">
              <div className="ml-10 flex items-baseline space-x-6 space-x-reverse">
                <button onClick={() => handleNavClick('home')} className="hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300">الرئيسية</button>
                <button onClick={() => handleNavClick('features')} className="hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300">المميزات</button>
                <button onClick={() => handleNavClick('ai-chat')} className="hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300">الذكاء الاصطناعي</button>
              </div>

              <div className="border-r border-white/10 pr-6 mr-6 flex items-center gap-3">
                {!currentUser && (
                  <button 
                    onClick={onOpenAdminAuth}
                    className="p-2 rounded-full text-gray-400 hover:text-neon-pink hover:bg-white/5 transition-all"
                    title="دخول المدير"
                  >
                    <Shield className="w-5 h-5" />
                  </button>
                )}

                {currentUser ? (
                  <div className="flex items-center gap-3">
                    {isAdmin && (
                      <button
                          onClick={onOpenDashboard}
                          className="flex items-center gap-2 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/50 text-neon-pink px-3 py-1.5 rounded-full text-sm font-bold hover:bg-neon-pink/30 transition-all"
                      >
                        <Database className="w-4 h-4" />
                        <span>لوحة التحكم</span>
                      </button>
                    )}
                    
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400">مرحباً</span>
                        <span className={`text-sm font-bold ${isAdmin ? 'text-neon-pink' : 'text-white'}`}>{currentUser.name}</span>
                    </div>
                    <div className={`w-9 h-9 rounded-full p-[1px] ${isAdmin ? 'bg-gradient-to-br from-neon-pink to-red-500' : 'bg-gradient-to-br from-neon-blue to-neon-purple'}`}>
                        <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center">
                          <span className="font-bold text-xs">{currentUser.name.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                    <button 
                      onClick={onLogout}
                      className="text-gray-400 hover:text-red-400 transition-colors mr-2"
                      title="تسجيل الخروج"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={onOpenUserAuth}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-medium transition-all text-sm border border-white/5"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>تسجيل الدخول</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Navigation Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${menuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-[#0a0a1a] border-l border-white/10 shadow-2xl transform transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">القائمة</h2>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 flex-grow">
              {/* Community Button (Prominent) */}
              {currentUser && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCommunity();
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 hover:border-neon-blue/60 transition-all group mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-cyan">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">المجتمع</p>
                      <p className="text-xs text-gray-400">تواصل مع الآخرين</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                </button>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                <button onClick={() => handleNavClick('home')} className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors text-right">
                  <Home className="w-5 h-5 text-neon-cyan" />
                  <span className="font-medium">الرئيسية</span>
                </button>
                <button onClick={() => handleNavClick('features')} className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors text-right">
                  <Zap className="w-5 h-5 text-neon-purple" />
                  <span className="font-medium">المميزات</span>
                </button>
                <button onClick={() => handleNavClick('ai-chat')} className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors text-right">
                  <Sparkles className="w-5 h-5 text-neon-pink" />
                  <span className="font-medium">الذكاء الاصطناعي</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer Actions */}
            <div className="border-t border-white/10 pt-6 mt-6 md:hidden">
               {currentUser ? (
                  <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
               ) : (
                 <div className="space-y-3">
                   <button onClick={onOpenUserAuth} className="w-full py-3 bg-white/10 rounded-lg text-white font-bold hover:bg-white/20 transition-colors">
                     تسجيل الدخول
                   </button>
                   <button onClick={onOpenAdminAuth} className="w-full py-3 text-gray-400 text-sm hover:text-white transition-colors">
                     دخول المدير
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;