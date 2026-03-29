'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { chatService } from '../../../lib/services/chat.service';
import { ChatMessage } from '../../../types';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize session
    const initSession = async () => {
      try {
        const { session_id } = await chatService.createSession();
        setSessionId(session_id);
      } catch (err) {
        console.error('Failed to init session', err);
      }
    };
    initSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const resp = await chatService.sendMessage(sessionId, userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: resp.content }]);
    } catch (err) {
      console.error('Send error', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-md p-4 sticky top-0 z-10">
        <h1 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-400" />
          AI Assistant
        </h1>
        <p className="text-xs text-slate-400">Ask questions based on your uploaded documents context.</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Bot className="w-12 h-12 text-slate-700 mb-4" />
            <p>Start a new conversation!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
              )}
              
              <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20' 
                  : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-5 py-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900/50 backdrop-blur-md border-t border-white/5">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || !sessionId}
            placeholder="Type your message..."
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full pl-5 pr-14 py-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading || !sessionId}
            className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
