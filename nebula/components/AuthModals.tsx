import React, { useState } from 'react';
import { X, User as UserIcon, Lock, LogIn, Database, ShieldAlert } from 'lucide-react';
import { User } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, icon }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-[#0a0a1a] border border-neon-blue/30 rounded-2xl shadow-[0_0_50px_rgba(67,97,238,0.2)] max-w-md w-full overflow-hidden animate-float">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// ---------------- User Login/Register Modal ----------------
interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin(name, email);
      onClose();
    }
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="تسجيل الدخول / انضمام"
      icon={<UserIcon className="w-6 h-6 text-neon-cyan" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">الاسم</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#111122] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all"
            placeholder="أدخل اسمك"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#111122] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all"
            placeholder="email@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-neon-blue/20 mt-4"
        >
          دخول
        </button>
      </form>
    </BaseModal>
  );
};

// ---------------- Admin Login Modal ----------------
interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin: (password: string) => boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onAdminLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdminLogin(password)) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('كلمة المرور غير صحيحة!');
    }
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="مدير النظام"
      icon={<ShieldAlert className="w-6 h-6 text-neon-pink" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">كلمة المرور السرية</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#111122] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent outline-none transition-all"
            placeholder="••••••"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-neon-pink/20 mt-4"
        >
          تحقق
        </button>
      </form>
    </BaseModal>
  );
};

// ---------------- Admin Dashboard Modal ----------------
interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#050510] border border-neon-cyan/30 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-neon-blue/10 to-transparent flex justify-between items-center">
          <div className="flex items-center gap-3">
             <Database className="w-6 h-6 text-neon-cyan" />
             <h2 className="text-2xl font-bold text-white">لوحة تحكم المدير</h2>
             <span className="bg-neon-cyan/20 text-neon-cyan px-3 py-1 rounded-full text-xs font-bold">
               {users.length} مستخدم
             </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-grow overflow-auto p-6">
          {users.length === 0 ? (
            <div className="text-center text-gray-500 py-10">لا يوجد مستخدمين مسجلين حتى الآن.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm">
                    <th className="pb-4 pr-4">الاسم</th>
                    <th className="pb-4">البريد الإلكتروني</th>
                    <th className="pb-4">تاريخ الانضمام</th>
                    <th className="pb-4">آخر دخول</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {users.map((user, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 font-medium text-neon-blue">{user.name}</td>
                      <td className="py-4 text-gray-300 font-mono text-sm">{user.email}</td>
                      <td className="py-4 text-sm text-gray-400">{new Date(user.joinedAt).toLocaleDateString('ar-EG')}</td>
                      <td className="py-4 text-sm text-gray-500">{new Date(user.lastLogin).toLocaleTimeString('ar-EG')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};