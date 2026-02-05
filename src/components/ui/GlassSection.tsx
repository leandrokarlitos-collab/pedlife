import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GlassSectionProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconGif?: string; // URL do GIF animado
  children: React.ReactNode;
  className?: string;
}

export const GlassSection = ({ title, subtitle, icon: Icon, iconGif, children, className }: GlassSectionProps) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 md:p-8",
        // Glassmorphism - mais visível no dark mode
        "bg-white/30 dark:bg-slate-800/60 backdrop-blur-md backdrop-saturate-125",
        // Borda mais visível no dark
        "border border-white/40 dark:border-slate-600/40",
        // Ring interno para profundidade
        "ring-1 ring-inset ring-white/10 dark:ring-slate-500/15",
        // Sombra - mais pronunciada no dark
        "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {/* Gradiente de fundo sutil */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
        }}
      />

      {/* Linha de luz na borda superior */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)',
        }}
      />

      {/* Header da seção */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3">
          {iconGif ? (
            <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-700/60 p-1.5 border border-white/40 dark:border-slate-500/30 shadow-sm">
              <img
                src={iconGif}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>
          ) : Icon && (
            <div className="p-2 rounded-xl bg-premium-violet/10 dark:bg-premium-violet/20 backdrop-blur-sm border border-premium-violet/20 dark:border-premium-violet/30">
              <Icon className="w-5 h-5 text-premium-violet" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
