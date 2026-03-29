'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, FileText, Settings, LogOut } from 'lucide-react';
import { authService } from '../../lib/services/auth.service';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Documents', href: '/documents', icon: FileText },
  ];

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0 hidden md:flex">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
          </div>
          Chatbot AI
        </h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex flex-row items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
