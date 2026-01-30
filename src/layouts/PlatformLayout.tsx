
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PlatformNav } from '@/components/platform/PlatformNav';
import ChatBot from '@/components/chatbot/ChatBot';

const PlatformLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple Premium Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      
      <PlatformNav />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="py-6 text-center border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="font-semibold text-primary">PedLife</span>
          <span className="mx-2">•</span>
          <span className="text-xs">Todos os direitos reservados</span>
        </p>
      </footer>
      
      <ChatBot />
    </div>
  );
};

export default PlatformLayout;
