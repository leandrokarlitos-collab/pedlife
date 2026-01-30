import React, { useEffect, useRef } from 'react';

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

export const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<Particle[]>([]);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cores mais sutis e suaves
    const strandColors = [
      // Fita 1 - tons suaves de violeta/azul
      [
        { r: 167, g: 139, b: 250 },  // Violet-400 (mais claro)
        { r: 129, g: 140, b: 248 },  // Indigo-400
        { r: 147, g: 197, b: 253 },  // Blue-300
      ],
      // Fita 2 - tons suaves de rosa/roxo
      [
        { r: 249, g: 168, b: 212 },  // Pink-300
        { r: 196, g: 181, b: 253 },  // Violet-300
        { r: 216, g: 180, b: 254 },  // Purple-300
      ]
    ];

    const initParticles = (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;

      particles.current = [];

      // DNA maior - mais partículas e maior extensão
      const diagonalLength = Math.sqrt(width * width + height * height);
      const verticalSpacing = 20;
      const particlesPerStrand = Math.floor(diagonalLength / verticalSpacing) + 20;

      for (let strand = 0; strand < 2; strand++) {
        const colors = strandColors[strand];

        for (let i = 0; i < particlesPerStrand; i++) {
          const colorIndex = i % colors.length;

          particles.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            targetX: 0,
            targetY: 0,
            size: 3 + Math.random() * 2.5, // Partículas maiores
            color: colors[colorIndex],
            alpha: 0.25 + Math.random() * 0.2, // Um pouco mais visível
            strand: strand,
            index: i,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      // Partículas de conexão
      const connectionCount = Math.floor(particlesPerStrand / 4);
      for (let i = 0; i < connectionCount; i++) {
        const mixedColor = {
          r: Math.round((strandColors[0][1].r + strandColors[1][1].r) / 2),
          g: Math.round((strandColors[0][1].g + strandColors[1][1].g) / 2),
          b: Math.round((strandColors[0][1].b + strandColors[1][1].b) / 2),
        };

        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          targetX: 0,
          targetY: 0,
          size: 1.2 + Math.random() * 0.8,
          color: mixedColor,
          alpha: 0.1 + Math.random() * 0.1,
          strand: 2,
          index: i,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 0 || height <= 0) return;

      canvas.width = width;
      canvas.height = height;
      initParticles(width, height);
    };

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      if (width <= 0 || height <= 0 || particles.current.length === 0) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      // Limpar com mais transparência para trail mais suave
      ctx.fillStyle = 'rgba(248, 250, 252, 0.06)';
      ctx.fillRect(0, 0, width, height);

      time.current += 0.006; // Mais lento

      // DNA na DIAGONAL INVERSA - do canto superior direito ao inferior esquerdo
      const angle = -Math.PI / 5; // ~-36 graus (inverso)
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);

      // Centro do DNA deslocado para a esquerda e mais para baixo
      const centerX = width * 0.35;
      const centerY = height * 0.55;

      const helixRadius = Math.min(width, height) * 0.22; // Ainda maior
      const verticalSpacing = 20;
      const rotationSpeed = 0.4;

      particles.current.forEach(p => {
        // Posição ao longo da diagonal
        const diagonalPos = (p.index * verticalSpacing - time.current * 25);
        const totalLength = Math.sqrt(width * width + height * height);
        const wrappedPos = ((diagonalPos % totalLength) + totalLength) % totalLength - totalLength / 2;

        if (p.strand === 0 || p.strand === 1) {
          const helixAngle = (p.index * 0.25) + time.current * rotationSpeed + (p.strand * Math.PI);
          const xOffset = Math.cos(helixAngle) * helixRadius;
          const zDepth = Math.sin(helixAngle);

          // Posição na diagonal
          const baseX = centerX + wrappedPos * cosAngle;
          const baseY = centerY + wrappedPos * sinAngle;

          // Offset perpendicular à diagonal para a hélice
          p.targetX = baseX + xOffset * sinAngle;
          p.targetY = baseY - xOffset * cosAngle;

          // Profundidade mais sutil
          const depthAlpha = (0.15 + (zDepth + 1) * 0.12) * p.alpha / 0.35;
          const depthSize = p.size * (0.75 + (zDepth + 1) * 0.25);

          // Movimento muito suave
          p.x += (p.targetX - p.x) * 0.025;
          p.y += (p.targetY - p.y) * 0.025;

          // Oscilação mínima
          p.x += Math.sin(time.current * 1.5 + p.phase) * 0.2;
          p.y += Math.cos(time.current + p.phase) * 0.2;

          // Glow mais suave
          const glowRadius = depthSize * 5;
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          glow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${depthAlpha * 0.2})`);
          glow.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Partícula
          ctx.beginPath();
          ctx.arc(p.x, p.y, depthSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${depthAlpha})`;
          ctx.fill();

        } else {
          // Conexões
          const connectionPos = (p.index * verticalSpacing * 4 - time.current * 25);
          const wrappedConnPos = ((connectionPos % totalLength) + totalLength) % totalLength - totalLength / 2;

          const connAngle = (p.index * 1) + time.current * rotationSpeed;
          const xOffset = Math.cos(connAngle) * helixRadius * 0.4;

          const baseX = centerX + wrappedConnPos * cosAngle;
          const baseY = centerY + wrappedConnPos * sinAngle;

          p.targetX = baseX + xOffset * sinAngle;
          p.targetY = baseY - xOffset * cosAngle;

          p.x += (p.targetX - p.x) * 0.02;
          p.y += (p.targetY - p.y) * 0.02;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.4})`;
          ctx.fill();
        }
      });

      // Linhas de conexão mais sutis
      const strand0 = particles.current.filter(p => p.strand === 0);
      const strand1 = particles.current.filter(p => p.strand === 1);

      ctx.strokeStyle = 'rgba(196, 181, 253, 0.04)';
      ctx.lineWidth = 0.8;

      for (let i = 0; i < Math.min(strand0.length, strand1.length); i += 5) {
        const p0 = strand0[i];
        const p1 = strand1[i];
        if (p0 && p1) {
          const dist = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
          if (dist < helixRadius * 2.5 && dist > 10) {
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Inicializar
    resizeCanvas();

    // Fundo inicial
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};
