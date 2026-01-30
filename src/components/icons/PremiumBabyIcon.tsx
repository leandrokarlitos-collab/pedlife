import React from 'react';
import { cn } from "@/lib/utils";

export const PremiumBabyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full overflow-visible", className)}
    >
      {/* CABEÇA: Formato orgânico (Squircle) */}
      <rect
        x="2" y="2" width="20" height="20" rx="10" ry="10"
        stroke="currentColor" strokeWidth="1.5"
        className="text-slate-600 dark:text-slate-300 transition-colors duration-500 group-hover:text-premium-violet"
      />

      {/* TUFO DE CABELO: Animação de balanço no hover */}
      <path
        d="M10.5 2.5C10.5 1.5 11.5 0.5 12 0.5C13 0.5 13.5 1.5 13.5 2.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        className="origin-bottom transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110 text-slate-600 dark:text-slate-300 group-hover:text-premium-violet"
      />

      {/* ROSTO (Grupo para animar tudo junto se precisar) */}
      <g className="face-features transition-transform duration-300 group-hover:-translate-y-0.5">

        {/* SOBRANCELHAS (Aparecem e sobem no hover - Expressão de surpresa/felicidade) */}
        <path d="M6.5 9C7 8.5 8 8.5 8.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-0 transition-all duration-300 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-premium-violet" />
        <path d="M15.5 9C16 8.5 17 8.5 17.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-0 transition-all duration-300 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-premium-violet" />

        {/* OLHOS: Piscam (mudam de formato) no hover */}
        {/* Olhos normais (somem no hover) */}
        <g className="transition-opacity duration-300 group-hover:opacity-0">
           <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" className="text-slate-600 dark:text-slate-300"/>
           <circle cx="16.5" cy="11.5" r="1.5" fill="currentColor" className="text-slate-600 dark:text-slate-300"/>
        </g>
        {/* Olhos felizes (aparecem no hover - formato de lua invertida) */}
        <g className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
           <path d="M6.5 11.5Q7.5 10.5 8.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-premium-violet"/>
           <path d="M15.5 11.5Q16.5 10.5 17.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-premium-violet"/>
        </g>

        {/* NARIZ */}
        <path d="M11.5 13.5C11.7 13.3 12 13.2 12 13.2C12 13.2 12.3 13.3 12.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className="text-slate-500" />

        {/* BOCA: Transição de Neutro para Sorriso Largo */}
        <g className="mouth-animation">
          <path d="M9 16.5C9 16.5 10.5 17.5 12 17.5C13.5 17.5 15 16.5 15 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-600 dark:text-slate-300 transition-opacity duration-300 group-hover:opacity-0"/>
          {/* Boca aberta formato D - linha reta em cima, curva embaixo */}
          <path d="M8 15.5 L16 15.5 Q16 20 12 20 Q8 20 8 15.5 Z" fill="currentColor" className="text-premium-violet opacity-0 transition-all duration-300 scale-90 group-hover:opacity-100 group-hover:scale-100 origin-top"/>
        </g>
      </g>
    </svg>
  );
};
