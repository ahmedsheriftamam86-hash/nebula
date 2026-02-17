import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Users, MessageSquare, Trash2, Shield } from 'lucide-react';
import { User, ChatMessage } from '../types';

interface CommunityLayerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onKickUser: (email: string) => void;
  onDeleteMessage: (msgId: string) => void;
}

const CommunityLayer: React.FC<CommunityLayerProps> = ({ 
  isOpen, 
  onClose, 
  currentUser, 
  allUsers, 
  messages, 
  onSendMessage, 
  onKickUser,
  onDeleteMessage
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'members'>('chat');
  const [newMessage, setNewMessage] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isAdmin = currentUser.role === 'admin';

  // Auto-scroll
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isOpen]);

  const handleSendText = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#050510] flex flex-col animate-fadeIn">
      
      {/* Top Navigation Bar for Community */}
      <div className="h-16 border-b border-white/10 bg-[#0a0a1a] flex items-center justify-between px-6 shadow-lg">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-neon-purple to-neon-blue rounded-lg flex items-center justify-center">
                 <Users className="text-white w-6 h-6" />
             </div>
             <div>
                 <h1 className="text-xl font-bold text-white">مجتمع نيبولا</h1>
                 <p className="text-xs text-gray-400">مساحة للمبدعين والمطورين</p>
             </div>
        </div>
        <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-sm font-bold border border-white/5"
        >
            <X className="w-4 h-4" />
            إغلاق وعودة
        </button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT SIDEBAR (Members & Navigation) */}
          <div className="w-full md:w-80 bg-[#0a0a1a]/50 border-l border-white/10 flex flex-col">
              <div className="flex border-b border-white/10">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-4 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'bg-white/5 text-neon-cyan border-b-2 border-neon-cyan' : 'text-gray-400 hover:text-white'}`}
                >
                    <MessageSquare className="w-4 h-4" />
                    المحادثة
                </button>
                <button 
                    onClick={() => setActiveTab('members')}
                    className={`flex-1 py-4 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${activeTab === 'members' ? 'bg-white/5 text-neon-pink border-b-2 border-neon-pink' : 'text-gray-400 hover:text-white'}`}
                >
                    <Users className="w-4 h-4" />
                    الأعضاء ({allUsers.length})
                </button>
              </div>

              {/* Members List */}
              <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                  {activeTab === 'members' || window.innerWidth > 768 ? (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider md:block hidden">المتواجدون حالياً</h3>
                        {allUsers.map(user => {
                            const isUserAdmin = user.role === 'admin';
                            const isSelf = user.email === currentUser.email;

                            return (
                                <div key={user.email} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/30 transition-all group">
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
                                            <p className="text-xs text-gray-500 max-w-[120px] truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {isAdmin && !isUserAdmin && (
                                        <button 
                                            onClick={() => onKickUser(user.email)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="طرد المستخدم"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                      </div>
                  ) : null}
              </div>
          </div>

          {/* MAIN CHAT AREA */}
          <div className={`flex-grow flex flex-col bg-[#050510] relative ${activeTab === 'members' ? 'hidden md:flex' : 'flex'}`}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
               
               {/* Messages */}
               <div className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6 relative z-10 custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                            <MessageSquare className="w-16 h-16 mb-4" />
                            <p>لا توجد رسائل بعد. ابدأ المحادثة!</p>
                        </div>
                    )}

                    {messages.map((msg) => {
                        const isMe = msg.userId === currentUser.email;
                        const isMsgAdmin = msg.userRole === 'admin';
                        const canDelete = isAdmin || isMe;
                        
                        if (msg.type === 'system') {
                            return (
                                <div key={msg.id} className="flex justify-center my-4">
                                    <span className="text-xs text-gray-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 shadow-sm">
                                        {msg.text}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300 group`}>
                                <div className="flex items-end gap-3 max-w-[90%] md:max-w-[70%]">
                                    {!isMe && (
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 shrink-0 ${isMsgAdmin ? 'bg-neon-pink text-white' : 'bg-gray-700 text-gray-300'}`}>
                                            {msg.userName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    
                                    <div className="relative flex items-center gap-2 group-hover:gap-2">
                                       
                                        {/* Delete Button (Left side if IsMe, Right side if not me) */}
                                        {canDelete && isMe && (
                                            <button 
                                                onClick={() => onDeleteMessage(msg.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                                                title="حذف الرسالة"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}

                                        <div className={`p-4 rounded-2xl shadow-lg relative ${
                                            isMe 
                                            ? 'bg-gradient-to-br from-neon-blue to-neon-purple text-white rounded-br-none' 
                                            : isMsgAdmin
                                                ? 'bg-[#2a0a18] border border-neon-pink/40 text-white rounded-bl-none shadow-neon-pink/10'
                                                : 'bg-[#1a1a2e] border border-white/10 text-gray-200 rounded-bl-none'
                                        }`}>
                                            {!isMe && (
                                                <p className={`text-xs font-bold mb-2 ${isMsgAdmin ? 'text-neon-pink' : 'text-neon-cyan'}`}>
                                                    {msg.userName} {isMsgAdmin && <span className="text-[9px] opacity-70 border border-neon-pink px-1 rounded ml-1">ADMIN</span>}
                                                </p>
                                            )}
                                            
                                            <p className="leading-relaxed text-sm md:text-base whitespace-pre-wrap">{msg.text}</p>
                                            
                                            <span className={`text-[9px] opacity-50 absolute bottom-1 ${isMe ? 'left-2' : 'right-2'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>

                                        {/* Delete Button (Right side if not me) */}
                                        {canDelete && !isMe && (
                                            <button 
                                                onClick={() => onDeleteMessage(msg.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                                                title="حذف الرسالة"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef} />
               </div>

               {/* Input Area */}
               <div className="p-4 bg-[#0a0a1a] border-t border-white/10 relative z-20">
                   <div className="max-w-4xl mx-auto flex items-center gap-3">
                       
                       <div className="flex-grow bg-[#111122] rounded-full flex items-center px-2 border border-white/5 focus-within:border-neon-blue/50 focus-within:ring-1 focus-within:ring-neon-blue/30 transition-all">
                           <input
                               type="text"
                               value={newMessage}
                               onChange={(e) => setNewMessage(e.target.value)}
                               onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                               placeholder="اكتب رسالة للمجتمع..."
                               className="flex-grow bg-transparent text-white text-sm px-4 py-3 outline-none placeholder-gray-500"
                           />
                       </div>

                       <button 
                           onClick={handleSendText}
                           disabled={!newMessage.trim()}
                           className="p-3 bg-neon-blue text-white rounded-full hover:bg-neon-purple transition-all shadow-lg shadow-neon-blue/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                           <Send className="w-5 h-5" />
                       </button>
                   </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default CommunityLayer;