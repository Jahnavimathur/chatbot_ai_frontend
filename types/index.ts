// types/index.ts

export interface User {
  id: number;
  email: string;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ChatMessage {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface Document {
  id: number;
  filename: string;
  upload_date: string;
  status?: string;
}
