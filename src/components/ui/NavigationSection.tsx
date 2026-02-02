import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NavigationSectionProps {
  title: string;
  description: string;
  icon: string; // URL do GIF
  href: string;
  className?: string;
}

export const NavigationSection = ({ title, description, icon, href, className }: NavigationSectionProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex items-center gap-4 rounded-2xl p-4 transition-all duration-300",
        // Glassmorphism
        "bg-white/40 dark:bg-slate-900/25 backdrop-blur-lg backdrop-saturate-125",
        // Borda
        "border border-white/30 dark:border-white/8",
        // Sombra sutil
        "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]",
        // Hover
        "hover:bg-white/55 dark:hover:bg-slate-900/35",
        "hover:border-premium-violet/25 dark:hover:border-premium-violet/30",
        "hover:shadow-[0_8px_24px_-6px_rgba(99,102,241,0.15)]",
        "hover:-translate-y-0.5",
        className
      )}
    >
      {/* Linha de luz na borda superior */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.25) 50%, transparent 85%)',
        }}
      />

      {/* Ícone GIF */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/60 dark:bg-slate-800/40 p-1.5 border border-white/40 dark:border-white/10 shadow-sm group-hover:shadow group-hover:border-premium-violet/20 transition-all duration-300">
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 group-hover:text-premium-violet transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
          {description}
        </p>
      </div>

      {/* Seta */}
      <div className="flex-shrink-0">
        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-premium-violet group-hover:translate-x-0.5 transition-all duration-300" />
      </div>
    </Link>
  );
};
