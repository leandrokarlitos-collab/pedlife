import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface PremiumStethoscopeIconProps {
  className?: string;
}

export const PremiumStethoscopeIcon = ({ className }: PremiumStethoscopeIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative w-full h-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradientes */}
          <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="chestpieceGradient" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>

          {/* Filtro de brilho */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* ===== TUBOS DO ESTETOSCÓPIO ===== */}
        <g className="stethoscope-tubes">
          {/* Tubo esquerdo */}
          <path
            d="M14 6 C14 6 10 10 10 18 C10 26 14 30 18 34"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className={cn(
              "text-slate-400 dark:text-slate-500 transition-all duration-500",
              isHovered && "text-premium-violet"
            )}
          />

          {/* Tubo direito */}
          <path
            d="M34 6 C34 6 38 10 38 18 C38 26 34 30 30 34"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className={cn(
              "text-slate-400 dark:text-slate-500 transition-all duration-500",
              isHovered && "text-premium-violet"
            )}
          />

          {/* Tubo central (junção) */}
          <path
            d="M18 34 Q24 38 30 34 L28 40 Q24 42 20 40 Z"
            fill="currentColor"
            className={cn(
              "text-slate-400 dark:text-slate-500 transition-all duration-500",
              isHovered && "text-premium-violet"
            )}
          />
        </g>

        {/* ===== AURICULARES (Ear pieces) ===== */}
        <g className="earpieces" filter="url(#softShadow)">
          {/* Auricular esquerdo */}
          <ellipse
            cx="14" cy="5"
            rx="3.5" ry="2.5"
            fill="currentColor"
            className={cn(
              "text-slate-500 dark:text-slate-400 transition-all duration-500",
              isHovered && "text-premium-violet"
            )}
          />
          <ellipse
            cx="14" cy="5"
            rx="2" ry="1.2"
            fill="currentColor"
            className="text-slate-300 dark:text-slate-600"
          />

          {/* Auricular direito */}
          <ellipse
            cx="34" cy="5"
            rx="3.5" ry="2.5"
            fill="currentColor"
            className={cn(
              "text-slate-500 dark:text-slate-400 transition-all duration-500",
              isHovered && "text-premium-violet"
            )}
          />
          <ellipse
            cx="34" cy="5"
            rx="2" ry="1.2"
            fill="currentColor"
            className="text-slate-300 dark:text-slate-600"
          />
        </g>

        {/* ===== DIAFRAGMA (Chestpiece) ===== */}
        <g className="chestpiece" filter="url(#softShadow)">
          {/* Corpo principal do diafragma */}
          <circle
            cx="24" cy="40"
            r="7"
            fill="url(#chestpieceGradient)"
            stroke="currentColor"
            strokeWidth="2"
            className={cn(
              "text-slate-500 dark:text-slate-400 transition-all duration-500",
              isHovered && "text-premium-violet"
            )}
          />

          {/* Anel interno */}
          <circle
            cx="24" cy="40"
            r="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={cn(
              "text-slate-400 dark:text-slate-500 transition-all duration-500",
              isHovered && "text-premium-violet/70"
            )}
          />

          {/* Centro do diafragma com pulso */}
          <circle
            cx="24" cy="40"
            r="2.5"
            fill="currentColor"
            className={cn(
              "text-slate-300 dark:text-slate-600 transition-all duration-500",
              isHovered && "text-premium-violet/50"
            )}
          />

          {/* Efeito de pulso cardíaco (visível no hover) */}
          <circle
            cx="24" cy="40"
            r="5"
            fill="url(#pulseGlow)"
            className={cn(
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <animate
              attributeName="r"
              values="3;6;3"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.2;0.8"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ===== ONDAS SONORAS (aparecem no hover) ===== */}
        <g className={cn(
          "sound-waves transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {/* Onda 1 */}
          <circle
            cx="24" cy="40"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-premium-violet/40"
          >
            <animate
              attributeName="r"
              values="8;14;8"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0;0.6"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Onda 2 (com delay) */}
          <circle
            cx="24" cy="40"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-premium-violet/30"
          >
            <animate
              attributeName="r"
              values="8;16;8"
              dur="1.5s"
              begin="0.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0;0.4"
              dur="1.5s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ===== CORAÇÃO PEQUENO (indicador pediátrico) ===== */}
        <g className={cn(
          "heart-indicator transition-all duration-500",
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )} style={{ transformOrigin: '36px 14px' }}>
          <path
            d="M34 15 C34 13 35.5 12 37 13.5 C38.5 12 40 13 40 15 C40 17 37 19.5 37 19.5 C37 19.5 34 17 34 15Z"
            fill="currentColor"
            className="text-pink-400"
          >
            <animate
              attributeName="transform"
              values="scale(1);scale(1.15);scale(1)"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* ===== CRUZ MÉDICA SUTIL ===== */}
        <g className={cn(
          "medical-cross transition-all duration-500",
          isHovered ? "opacity-70" : "opacity-0"
        )}>
          <rect x="8" y="13" width="6" height="2" rx="1" fill="currentColor" className="text-emerald-400" />
          <rect x="10" y="11" width="2" height="6" rx="1" fill="currentColor" className="text-emerald-400" />
        </g>

        {/* ===== BRILHO METÁLICO (reflexo) ===== */}
        <g className="metallic-shine">
          {/* Brilho no tubo esquerdo */}
          <path
            d="M12 10 C12 10 11 14 11 18"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Brilho no tubo direito */}
          <path
            d="M36 10 C36 10 37 14 37 18"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Brilho no diafragma */}
          <ellipse
            cx="22" cy="38"
            rx="1.5" ry="1"
            fill="white"
            opacity="0.4"
          />
        </g>

      </svg>
    </div>
  );
};
