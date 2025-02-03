import Sidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="dashboard-layout">
        <Sidebar />
        {children}
      </main>
    </SidebarProvider>
  );
}
