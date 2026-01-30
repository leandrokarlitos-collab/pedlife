import React, { useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePediatricParticles } from '@/hooks/usePediatricParticles';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // Estado para o 3D Tilt

  const particleColors = ['rgb(99, 102, 241)', 'rgb(59, 130, 246)', 'rgb(167, 139, 250)'];
  usePediatricParticles(canvasRef, containerRef, mousePos, isHovered, particleColors);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Cálculo do 3D Tilt (Giroscópio visual)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 graus de rotação
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
    setRotation({ x: 0, y: 0 }); // Reseta posição
  };

  const isList = layout === 'list';

  return (
    <div
      style={{ perspective: '1000px' }} // Necessário para o efeito 3D
      className={cn(isList ? "w-full mb-3" : "h-full", className)}
    >
      <div
        ref={containerRef} onClick={onClick} onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered && !isList ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` : 'none',
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
        }}
        className={cn(
          "group relative rounded-2xl cursor-pointer overflow-hidden isolate",
          "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50",
          isList ? "h-24 w-full" : "h-full",
          "hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)]", // Sombra profunda premium
        )}
      >
        <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0.4 }} />
        
        {/* Camada de Brilho Holográfico que segue o mouse */}
        <div 
          className="absolute inset-0 -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.8) 0%, transparent 60%)`
          }}
        />

        <Card className="relative bg-transparent border-0 shadow-none h-full z-10 flex items-center">
          <CardHeader className={cn("w-full relative z-20", isList ? "p-4 flex flex-row items-center gap-6 space-y-0" : "p-6")}>
            <div className="flex items-center justify-between flex-shrink-0">
              <div className={cn(
                "rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-500 border border-transparent",
                "group-hover:bg-premium-violet/10 group-hover:border-premium-violet/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
                isList ? "p-2 w-12 h-12" : "p-3 w-16 h-16"
              )}>
                <Icon className={cn("transition-all", isList ? "w-full h-full" : "w-full h-full")} />
              </div>
            </div>
            <div className={cn("flex-grow", isList ? "flex items-center justify-between" : "mt-6 space-y-3")}>
              <div className={isList ? "flex flex-col items-start" : "space-y-2"}>
                <CardTitle className={cn("font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-premium-violet", isList ? "text-base" : "text-xl")}>{title}</CardTitle>
                <CardDescription className={cn("text-slate-500 dark:text-slate-400 font-medium", isList ? "text-xs mt-0.5 line-clamp-1" : "text-sm line-clamp-3")}>{description}</CardDescription>
              </div>
              {isList && <div className="text-slate-300 group-hover:text-premium-violet transition-colors text-xl">→</div>}
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
