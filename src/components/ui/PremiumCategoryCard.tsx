import React, { useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PremiumCategoryCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  layout?: 'grid' | 'list';
  onClick?: () => void;
  className?: string;
}

export const PremiumCategoryCard = ({ title, description, icon: Icon, layout = 'grid', onClick, className }: PremiumCategoryCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Cálculo do 3D Tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
    setRotation({ x: 0, y: 0 });
  };

  const isList = layout === 'list';

  return (
    <div
      style={{ perspective: '1000px' }}
      className={cn(isList ? "w-full mb-3" : "h-full", className)}
    >
      <div
        ref={containerRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered && !isList
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          "group relative rounded-2xl cursor-pointer overflow-hidden",
          // Glassmorphism premium
          "bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150",
          // Borda com gradiente sutil
          "border border-white/50 dark:border-white/10",
          // Ring interno para efeito de profundidade
          "ring-1 ring-inset ring-white/20 dark:ring-white/5",
          isList ? "h-24 w-full" : "h-full min-h-[200px]",
          // Sombras multicamadas para profundidade
          "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(99,102,241,0.08)]",
          // Hover com sombra mais intensa e borda brilhante
          "hover:shadow-[0_20px_40px_-12px_rgba(99,102,241,0.3),0_8px_24px_-8px_rgba(0,0,0,0.15)]",
          "hover:border-white/70 dark:hover:border-white/20",
          "hover:ring-premium-violet/20 dark:hover:ring-premium-violet/30",
        )}
      >
        {/* Gradiente de fundo glassmorphism */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {/* Brilho holográfico que segue o mouse */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.15) 0%, rgba(167,139,250,0.08) 30%, transparent 60%)`
          }}
        />

        {/* Shimmer effect no hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 25%, transparent 50%)`
          }}
        />

        {/* Reflexo superior (efeito vidro) - sempre visível */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 100%)',
            borderRadius: '1rem 1rem 0 0',
          }}
        />

        {/* Linha de luz na borda superior */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
          }}
        />

        <Card className="relative bg-transparent border-0 shadow-none h-full z-10 flex items-center">
          <CardHeader className={cn("w-full relative z-20", isList ? "p-4 flex flex-row items-center gap-6 space-y-0" : "p-6")}>
            <div className="flex items-center justify-between flex-shrink-0">
              <div
                className={cn(
                  "rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md transition-all duration-500",
                  "border border-white/60 dark:border-white/10",
                  "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)]",
                  "group-hover:bg-premium-violet/15 group-hover:border-premium-violet/30",
                  "group-hover:shadow-[0_8px_24px_-4px_rgba(99,102,241,0.3),inset_0_1px_0_0_rgba(255,255,255,0.3)]",
                  "group-hover:-translate-y-1",
                  isList ? "p-2 w-12 h-12" : "p-3 w-16 h-16"
                )}
                style={{
                  transform: isHovered && !isList ? 'translateZ(20px)' : 'translateZ(0px)',
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <Icon className={cn("transition-all", isList ? "w-full h-full" : "w-full h-full")} />
              </div>
            </div>
            <div
              className={cn("flex-grow", isList ? "flex items-center justify-between" : "mt-6 space-y-3")}
              style={{
                transform: isHovered && !isList ? 'translateZ(10px)' : 'translateZ(0px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className={isList ? "flex flex-col items-start" : "space-y-2"}>
                <CardTitle className={cn(
                  "font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-premium-violet",
                  isList ? "text-base" : "text-xl"
                )}>
                  {title}
                </CardTitle>
                <CardDescription className={cn(
                  "text-slate-500 dark:text-slate-400 font-medium",
                  isList ? "text-xs mt-0.5 line-clamp-1" : "text-sm line-clamp-3"
                )}>
                  {description}
                </CardDescription>
              </div>
              {isList && <div className="text-slate-300 group-hover:text-premium-violet transition-colors text-xl">→</div>}
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
