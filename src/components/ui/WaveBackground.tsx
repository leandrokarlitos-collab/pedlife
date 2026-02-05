import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: { r: number; g: number; b: number };
  alpha: number;
  strand: number;
  index: number;
  phase: number;
}

// Cores para modo claro
const lightStrandColors = [
  [
    { r: 165, g: 180, b: 252 },  // Indigo-300
    { r: 147, g: 197, b: 253 },  // Blue-300
    { r: 196, g: 181, b: 253 },  // Violet-300
  ],
  [
    { r: 249, g: 168, b: 212 },  // Pink-300
    { r: 196, g: 181, b: 253 },  // Violet-300
    { r: 216, g: 180, b: 254 },  // Purple-300
  ]
];

// Cores para modo escuro - mais saturadas e vibrantes
const darkStrandColors = [
  [
    { r: 99, g: 102, b: 241 },   // Indigo-500
    { r: 59, g: 130, b: 246 },   // Blue-500
    { r: 139, g: 92, b: 246 },   // Violet-500
  ],
  [
    { r: 236, g: 72, b: 153 },   // Pink-500
    { r: 139, g: 92, b: 246 },   // Violet-500
    { r: 168, g: 85, b: 247 },   // Purple-500
  ]
];

export const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<Particle[]>([]);
  const time = useRef(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Pré-renderizar sprites para as partículas
  const createSprites = (colors: { r: number; g: number; b: number }[][]) => {
    const canvas = document.createElement('canvas');
    const size = 32;
    const particleTypes = 6;
    canvas.width = size * particleTypes;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    for (let strand = 0; strand < 2; strand++) {
      const strandColors = colors[strand];
      for (let i = 0; i < particleTypes; i++) {
        const color = strandColors[i % strandColors.length];
        const radius = 2 + (i * 0.5);
        const centerX = i * size + size / 2;
        const centerY = strand * size + size / 2;

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 3.5);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(i * size, strand * size, size, size);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
        ctx.fill();
      }
    }
    return canvas;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const strandColors = isDark ? darkStrandColors : lightStrandColors;
    spriteCanvasRef.current = createSprites(strandColors);

    const initParticles = (width: number, height: number) => {
      particles.current = [];
      const diagonalLength = Math.sqrt(width * width + height * height);
      const verticalSpacing = 40;
      const particlesPerStrand = Math.floor(diagonalLength / verticalSpacing) + 10;

      for (let strand = 0; strand < 2; strand++) {
        const colors = strandColors[strand];
        for (let i = 0; i < particlesPerStrand; i++) {
          particles.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            targetX: 0,
            targetY: 0,
            size: 2.5 + Math.random() * 2,
            color: colors[i % colors.length],
            alpha: 0.2 + Math.random() * 0.1,
            strand: strand,
            index: i,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initParticles(width, height);
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const spriteCanvas = spriteCanvasRef.current;

      ctx.fillStyle = isDark ? '#020617' : '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      time.current += 0.003;

      const angle = -Math.PI / 7;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const centerX = width * 0.35;
      const centerY = height * 0.55;
      const helixRadius = Math.min(width, height) * 0.22;
      const verticalSpacing = 40;
      const rotationSpeed = 0.3;

      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(165, 180, 252, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      particles.current.forEach(p => {
        const diagonalPos = (p.index * verticalSpacing - time.current * 20);
        const totalLength = Math.sqrt(width * width + height * height);
        const wrappedPos = ((diagonalPos % totalLength) + totalLength) % totalLength - totalLength / 2;

        const helixAngle = (p.index * 0.25) + time.current * rotationSpeed + (p.strand * Math.PI);
        const xOffset = Math.cos(helixAngle) * helixRadius;
        const zDepth = Math.sin(helixAngle);

        const baseX = centerX + wrappedPos * cosAngle;
        const baseY = centerY + wrappedPos * sinAngle;

        p.targetX = baseX + xOffset * sinAngle;
        p.targetY = baseY - xOffset * cosAngle;

        p.x += (p.targetX - p.x) * 0.03;
        p.y += (p.targetY - p.y) * 0.03;

        if (spriteCanvas) {
          const spriteSize = 32;
          const typeIndex = p.index % 6;
          const strandIndex = p.strand;
          const opacity = (0.2 + (zDepth + 1) * 0.3) * p.alpha;

          ctx.globalAlpha = opacity;
          ctx.drawImage(
            spriteCanvas,
            typeIndex * spriteSize, strandIndex * spriteSize, spriteSize, spriteSize,
            p.x - spriteSize / 2, p.y - spriteSize / 2, spriteSize, spriteSize
          );
        }
      });

      ctx.globalAlpha = 1;
      const strand0 = particles.current.filter(p => p.strand === 0);
      const strand1 = particles.current.filter(p => p.strand === 1);

      for (let i = 0; i < Math.min(strand0.length, strand1.length); i += 6) {
        const p0 = strand0[i];
        const p1 = strand1[i];
        if (p0 && p1) {
          const distSq = Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2);
          if (distSq < Math.pow(helixRadius * 2.5, 2)) {
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
          }
        }
      }
      ctx.stroke();

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, backgroundColor: isDark ? '#020617' : '#f8fafc' }}
    />
  );
};
