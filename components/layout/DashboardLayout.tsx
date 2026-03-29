'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
      </div>
    </div>
  );
};
