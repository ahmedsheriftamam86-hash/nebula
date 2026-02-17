import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import GeminiDemo from './components/GeminiDemo';
import Footer from './components/Footer';
import CommunityLayer from './components/CommunityLayer';
import { UserAuthModal, AdminLoginModal, AdminDashboard } from './components/AuthModals';
import { User, ChatMessage } from './types';

function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<'home' | 'features' | 'ai-chat'>('home');

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // UI State
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('nebula_current_user');
    const storedUsersList = localStorage.getItem('nebula_users');
    const storedMessages = localStorage.getItem('nebula_chat_messages');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    if (storedUsersList) {
      setAllUsers(JSON.parse(storedUsersList));
    }
    if (storedMessages) {
      const parsedMsgs = JSON.parse(storedMessages);
      const cleanMsgs = parsedMsgs.filter((msg: any) => msg.type !== 'voice');
      setMessages(cleanMsgs);
    }
  }, []);

  // Sync data to storage
  useEffect(() => {
    localStorage.setItem('nebula_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('nebula_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // --- Handlers ---

  const handleUserLogin = (name: string, email: string) => {
    const now = new Date().toISOString();
    let updatedUsers = [...allUsers];
    const existingIndex = updatedUsers.findIndex(u => u.email === email);
    let userToLogin: User;

    if (existingIndex >= 0) {
      updatedUsers[existingIndex] = { ...updatedUsers[existingIndex], lastLogin: now, name: name, role: 'user' };
      userToLogin = updatedUsers[existingIndex];
    } else {
      userToLogin = { name, email, joinedAt: now, lastLogin: now, role: 'user' };
      updatedUsers.push(userToLogin);
    }

    setAllUsers(updatedUsers);
    setCurrentUser(userToLogin);
    localStorage.setItem('nebula_current_user', JSON.stringify(userToLogin));
    setIsCommunityOpen(true);
  };

  const handleAdminLogin = (password: string): boolean => {
    if (password === 'madara') {
      const adminUser: User = { name: 'Madara Uchiha', email: 'admin@nebula.com', role: 'admin', joinedAt: new Date().toISOString(), lastLogin: new Date().toISOString() };
      setCurrentUser(adminUser);
      localStorage.setItem('nebula_current_user', JSON.stringify(adminUser));
      setIsAdminLoginOpen(false);
      setIsCommunityOpen(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nebula_current_user');
    setIsAdminDashboardOpen(false);
    setIsCommunityOpen(false);
    setCurrentPage('home'); // Reset to home on logout
  };

  const handleSendMessage = (text: string) => {
    if (!currentUser) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.email,
      userName: currentUser.name,
      userRole: currentUser.role,
      text: text,
      type: 'text',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleDeleteMessage = (msgId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== msgId));
  };

  const handleKickUser = (email: string) => {
    if (currentUser?.role !== 'admin') return;
    const updatedUsers = allUsers.filter(u => u.email !== email);
    setAllUsers(updatedUsers);
    const kickedUser = allUsers.find(u => u.email === email);
    if (kickedUser) {
        const kickMsg: ChatMessage = {
            id: Date.now().toString(),
            userId: 'system',
            userName: 'System',
            userRole: 'admin',
            text: `تم طرد ${kickedUser.name} من المنصة بواسطة المدير.`,
            type: 'system',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, kickMsg]);
    }
  };

  useEffect(() => {
      if (currentUser && currentUser.role !== 'admin') {
          const exists = allUsers.find(u => u.email === currentUser.email);
          if (allUsers.length > 0 && !exists) {
              handleLogout();
              alert("تم طردك من المنصة من قبل المدير.");
          }
      }
  }, [allUsers, currentUser]);

  // Routing Logic
  if (currentPage === 'ai-chat') {
      return <GeminiDemo onBack={() => setCurrentPage('home')} user={currentUser} />;
  }

  return (
    <div className="min-h-screen bg-[#050510] text-white selection:bg-neon-pink selection:text-white font-sans">
      <Navbar 
        currentUser={currentUser}
        onOpenUserAuth={() => setIsUserModalOpen(true)}
        onOpenAdminAuth={() => setIsAdminLoginOpen(true)}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenCommunity={() => setIsCommunityOpen(true)}
        onLogout={handleLogout}
        onNavigate={(page) => setCurrentPage(page)}
      />
      
      <main>
        {currentPage === 'home' ? (
            <>
                <Hero user={currentUser} />
                <Features onBack={() => setCurrentPage('features')} /> 
                {/* We removed the embedded AI demo from home since it's now a full page */}
                <section className="py-24 relative overflow-hidden flex items-center justify-center bg-[#0a0a1a]">
                    <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-4">جرب الذكاء الاصطناعي</h2>
                        <p className="text-gray-400 mb-6">تحدث مع Gemini 3.0 في واجهة محادثة متطورة لحل المشكلات المعقدة.</p>
                        <button 
                            onClick={() => setCurrentPage('ai-chat')}
                            className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            ابدأ المحادثة الآن
                        </button>
                    </div>
                </section>
            </>
        ) : (
            <Features isPage={true} onBack={() => setCurrentPage('home')} />
        )}
      </main>
      
      <Footer />

      {/* Community Overlay Page */}
      {currentUser && (
        <CommunityLayer 
            isOpen={isCommunityOpen}
            onClose={() => setIsCommunityOpen(false)}
            currentUser={currentUser}
            allUsers={allUsers}
            messages={messages}
            onSendMessage={handleSendMessage}
            onKickUser={handleKickUser}
            onDeleteMessage={handleDeleteMessage}
        />
      )}

      {/* Modals */}
      <UserAuthModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)}
        onLogin={handleUserLogin}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onAdminLogin={handleAdminLogin}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        users={allUsers}
      />
    </div>
  );
}

export default App;