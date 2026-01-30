import { useEffect, useRef } from 'react';

interface MousePosition { x: number; y: number; }
interface Particle { x: number; y: number; vx: number; vy: number; size: number; baseX: number; baseY: number; density: number; color: string; }

export const usePediatricParticles = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  mousePos: MousePosition,
  isHovered: boolean,
  colors: string[]
) => {
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      const numberOfParticles = (canvas.width * canvas.height) / 2000; 
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.current.push({
          x, y, vx: 0, vy: 0, // Velocidade para inércia
          size, baseX: x, baseY: y,
          density: (Math.random() * 10) + 2,
          color
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(p => {
        // Física de Atração com Inércia (Liquid Feel)
        let dx = mousePos.x - p.x;
        let dy = mousePos.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 120;

        if (isHovered && distance < forceDistance) {
          const force = (forceDistance - distance) / forceDistance;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * p.density * 0.8;
          const pushY = Math.sin(angle) * force * p.density * 0.8;
          
          p.vx += pushX;
          p.vy += pushY;
        } else {
          // Retorno elástico à base
          const dxBase = p.baseX - p.x;
          const dyBase = p.baseY - p.y;
          p.vx += dxBase * 0.02; // Mola
          p.vy += dyBase * 0.02;
        }

        // Aplicar fricção (viscosidade)
        p.vx *= 0.85; 
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        
        // Efeito de brilho pulsante no hover
        const alpha = isHovered ? (0.4 + Math.abs(p.vx)*0.1) : 0.15;
        ctx.fillStyle = p.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        ctx.fill();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    
    // Resize observer logic...
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
    };
  }, [canvasRef, containerRef, mousePos, isHovered, colors]);
};
