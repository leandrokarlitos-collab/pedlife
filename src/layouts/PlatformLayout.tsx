
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PlatformNav } from '@/components/platform/PlatformNav';
import ChatBot from '@/components/chatbot/ChatBot';
import { WaveBackground } from '@/components/ui/WaveBackground';

const PlatformLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Blobs de Fundo - cores adaptadas para cada tema */}
        <div className="absolute inset-0 transform-gpu overflow-hidden blur-[100px]">
          <div className="absolute -top-20 -left-20 h-[35rem] w-[35rem] rounded-full bg-violet-300/40 dark:bg-violet-500/15 mix-blend-multiply dark:mix-blend-normal filter animate-blob-spin"></div>
          <div className="absolute top-1/4 -right-20 h-[40rem] w-[40rem] rounded-full bg-blue-300/40 dark:bg-blue-500/15 mix-blend-multiply dark:mix-blend-normal filter animate-blob-spin animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/3 h-[45rem] w-[45rem] rounded-full bg-pink-300/30 dark:bg-indigo-500/10 mix-blend-multiply dark:mix-blend-normal filter animate-blob-spin animation-delay-4000"></div>
        </div>

        {/* Ondas animadas */}
        <WaveBackground />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

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
