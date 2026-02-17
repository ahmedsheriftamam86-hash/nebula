import React from 'react';

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface GeneratedContent {
  text: string;
  loading: boolean;
  error: string | null;
}

export interface User {
  name: string;
  email: string;
  joinedAt: string;
  lastLogin: string;
  role: 'user' | 'admin';
}

export interface ChatMessage {
  id: string;
  userId: string; // Identify who sent it (email)
  userName: string;
  userRole: 'user' | 'admin';
  text?: string;
  type: 'text' | 'system';
  timestamp: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isThinking?: boolean;
}