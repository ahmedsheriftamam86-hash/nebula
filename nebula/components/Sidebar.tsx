import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, Users, MessageSquare, Trash2, Shield, User as UserIcon, Play, Pause } from 'lucide-react';
import { User, ChatMessage } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
  messages: ChatMessage[];
  onSendMessage: (text: string, type: 'text' | 'voice') => void;
  onKickUser: (email: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  currentUser, 
  allUsers, 
  messages, 
  onSendMessage, 
  onKickUser 
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'members'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isAdmin = currentUser.role === 'admin';

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab, isOpen]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, 'text');
      setNewMessage('');
    }
  };

  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      // Simulate sending a voice note
      onSendMessage('تسجيل صوتي جديد', 'voice');
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-full md:w-[400px] bg-[#0a0a1a] border-r border-white/10 z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-neon-blue/10 to-transparent flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {activeTab === 'chat' ? <MessageSquare className="text-neon-cyan" /> : <Users className="text-neon-pink" />}
            {activeTab === 'chat' ? 'المشاريع (General)' : 'الأعضاء'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'chat' ? 'text-neon-cyan border-b-2 border-neon-cyan bg-white/5' : 'text-gray-400 hover:text-white'}`}
          >
            الدردشة الجماعية
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'members' ? 'text-neon-pink border-b-2 border-neon-pink bg-white/5' : 'text-gray-400 hover:text-white'}`}
          >
            الأعضاء ({allUsers.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
          
          {/* --- CHAT VIEW --- */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neon-blue/20">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-10 text-sm">ابدأ المحادثة في مشروع نيبولا...</div>
                )}
                {messages.map((msg) => {
                  const isMe = msg.userId === currentUser.email;
                  const isMsgAdmin = msg.userRole === 'admin';
                  
                  if (msg.type === 'system') {
                    return (
                        <div key={msg.id} className="text-center my-2">
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{msg.text}</span>
                        </div>
                    );
                  }

                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-end gap-2 max-w-[85%]">
                        {!isMe && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${isMsgAdmin ? 'bg-neon-pink text-white' : 'bg-gray-700 text-gray-300'}`}>
                            {msg.userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className={`p-3 rounded-2xl text-sm shadow-md ${
                          isMe 
                            ? 'bg-gradient-to-br from-neon-blue to-neon-purple text-white rounded-br-none' 
                            : isMsgAdmin
                                ? 'bg-[#1a0510] border border-neon-pink/30 text-white rounded-bl-none'
                                : 'bg-[#1a1a2e] border border-white/5 text-gray-200 rounded-bl-none'
                        }`}>
                          {!isMe && <p className={`text-[10px] font-bold mb-1 ${isMsgAdmin ? 'text-neon-pink' : 'text-neon-cyan'}`}>{msg.userName}</p>}
                          
                          {msg.type === 'voice' ? (
                            <div className="flex items-center gap-2 min-w-[120px]">
                                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Play className="w-3 h-3 fill-current" />
                                </button>
                                <div className="h-1 flex-grow bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-white animate-pulse"></div>
                                </div>
                                <span className="text-xs opacity-70">0:05</span>
                            </div>
                          ) : (
                            <p>{msg.text}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-600 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-[#050510] border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isRecording ? "جاري التسجيل..." : "اكتب رسالة..."}
                  disabled={isRecording}
                  className="flex-grow bg-[#111122] text-white text-sm rounded-full px-4 py-3 outline-none focus:ring-1 focus:ring-neon-blue border border-transparent focus:border-neon-blue/50 transition-all placeholder-gray-500 disabled:opacity-50"
                />
                
                <button 
                    onClick={handleMicClick}
                    className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                    <Mic className="w-5 h-5" />
                </button>

                <button 
                  onClick={handleSend}
                  disabled={!newMessage.trim() && !isRecording}
                  className="p-3 bg-neon-blue text-white rounded-full hover:bg-neon-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-neon-blue/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* --- MEMBERS VIEW --- */}
          {activeTab === 'members' && (
            <div className="p-4 overflow-y-auto h-full">
               <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">الأعضاء المتصلون بالمنصة</h3>
               <div className="space-y-3">
                 {allUsers.map(user => {
                     const isUserAdmin = user.role === 'admin';
                     const isSelf = user.email === currentUser.email;

                     return (
                        <div key={user.email} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${isUserAdmin ? 'bg-gradient-to-br from-neon-pink to-red-600 text-white' : 'bg-gradient-to-br from-neon-blue to-neon-purple text-white'}`}>
                                    {isUserAdmin ? <Shield className="w-5 h-5" /> : user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-white text-sm">{user.name}</p>
                                        {isUserAdmin && <span className="text-[10px] bg-neon-pink/20 text-neon-pink px-1.5 rounded border border-neon-pink/30">مدير</span>}
                                        {isSelf && <span className="text-[10px] bg-white/10 text-gray-300 px-1.5 rounded">أنت</span>}
                                    </div>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            {/* Admin Controls */}
                            {isAdmin && !isUserAdmin && (
                                <button 
                                    onClick={() => onKickUser(user.email)}
                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors group relative"
                                    title="طرد المستخدم"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        طرد (Kick)
                                    </span>
                                </button>
                            )}
                        </div>
                     )
                 })}
               </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;