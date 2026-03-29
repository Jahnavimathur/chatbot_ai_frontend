import { fetchApi } from '../api';
import { ChatMessage } from '../../types';

export const chatService = {
  async createSession(): Promise<{ session_id: string }> {
    return fetchApi<{ session_id: string }>('/create-session', {
      method: 'POST',
    });
  },

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    return fetchApi<ChatMessage[]>(`/chat/${sessionId}`, {
      method: 'GET',
    });
  },

  async sendMessage(sessionId: string, content: string): Promise<ChatMessage> {
    return fetchApi<ChatMessage>('/chat', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, content }),
    });
  },
};
