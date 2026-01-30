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
          "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl",
          "border border-slate-200/50 dark:border-slate-800/50",
          isList ? "h-24 w-full" : "h-full min-h-[200px]",
          "shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25),0_0_0_1px_rgba(99,102,241,0.1)]",
        )}
      >
        {/* Brilho holográfico que segue o mouse */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`
          }}
        />

        {/* Borda brilhante no hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, rgba(99,102,241,0.1) 0%, transparent 50%, rgba(167,139,250,0.1) 100%)`,
          }}
        />

        {/* Reflexo superior (efeito vidro) */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)',
            borderRadius: '1rem 1rem 0 0',
          }}
        />

        <Card className="relative bg-transparent border-0 shadow-none h-full z-10 flex items-center">
          <CardHeader className={cn("w-full relative z-20", isList ? "p-4 flex flex-row items-center gap-6 space-y-0" : "p-6")}>
            <div className="flex items-center justify-between flex-shrink-0">
              <div
                className={cn(
                  "rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-500 border border-transparent",
                  "group-hover:bg-premium-violet/10 group-hover:border-premium-violet/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
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
