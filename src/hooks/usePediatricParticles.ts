import { useEffect, useRef } from 'react';

interface MousePosition { x: number; y: number; }

export const usePediatricParticles = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  mousePos: MousePosition,
  isHovered: boolean,
  colors: string[]
) => {
  const animationFrameId = useRef<number>();
  const time = useRef(0);
  const mouseInfluence = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    // Extrair cores RGB
    const extractRGB = (color: string) => {
      const match = color.match(/\d+/g);
      if (match) {
        return { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
      }
      return { r: 99, g: 102, b: 241 };
    };

    const rgbColors = colors.map(extractRGB);

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Tempo suave
      time.current += 0.008;

      // Suavizar influência do mouse
      const targetX = isHovered ? mousePos.x / width : 0.5;
      const targetY = isHovered ? mousePos.y / height : 0.5;
      mouseInfluence.current.x += (targetX - mouseInfluence.current.x) * 0.05;
      mouseInfluence.current.y += (targetY - mouseInfluence.current.y) * 0.05;

      const mx = mouseInfluence.current.x;
      const my = mouseInfluence.current.y;

      // === AURORA GRADIENT EFFECT ===

      // Criar múltiplos gradientes que se movem e se misturam
      const gradientLayers = 3;

      for (let layer = 0; layer < gradientLayers; layer++) {
        const color = rgbColors[layer % rgbColors.length];
        const nextColor = rgbColors[(layer + 1) % rgbColors.length];

        // Posição do gradiente muda com o tempo e mouse
        const angleOffset = time.current * (0.3 + layer * 0.1) + layer * 2;

        // Centro do gradiente se move suavemente
        const centerX = width * (0.3 + Math.sin(angleOffset) * 0.3 + mx * 0.2);
        const centerY = height * (0.3 + Math.cos(angleOffset * 0.7) * 0.3 + my * 0.2);

        // Raio do gradiente pulsa suavemente
        const baseRadius = Math.max(width, height) * 0.8;
        const radius = baseRadius + Math.sin(time.current + layer) * 30;

        // Criar gradiente radial
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );

        // Opacidade base - mais visível no hover
        const baseOpacity = isHovered ? 0.15 : 0.08;
        const layerOpacity = baseOpacity - layer * 0.03;

        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${layerOpacity})`);
        gradient.addColorStop(0.4, `rgba(${nextColor.r}, ${nextColor.g}, ${nextColor.b}, ${layerOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // === SHIMMER HIGHLIGHT (segue o mouse) ===
      if (isHovered) {
        const shimmerX = mx * width;
        const shimmerY = my * height;
        const shimmerRadius = 100 + Math.sin(time.current * 2) * 20;

        const shimmer = ctx.createRadialGradient(
          shimmerX, shimmerY, 0,
          shimmerX, shimmerY, shimmerRadius
        );

        shimmer.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        shimmer.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = shimmer;
        ctx.fillRect(0, 0, width, height);
      }

      // === SUBTLE FLOATING PARTICLES ===
      const particleCount = isHovered ? 6 : 3;

      for (let i = 0; i < particleCount; i++) {
        const phase = time.current * 0.5 + i * 1.5;

        const px = width * (0.2 + Math.sin(phase + i) * 0.3 + Math.cos(phase * 0.7) * 0.2);
        const py = height * (0.2 + Math.cos(phase * 0.8 + i) * 0.3 + Math.sin(phase * 0.5) * 0.2);

        const size = 2 + Math.sin(phase * 2) * 1;
        const alpha = isHovered ? 0.2 + Math.sin(phase * 3) * 0.1 : 0.1;

        const color = rgbColors[i % rgbColors.length];

        // Partícula principal
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        ctx.fill();

        // Glow suave
        ctx.beginPath();
        ctx.arc(px, py, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.2})`;
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
    };
  }, [canvasRef, containerRef, mousePos, isHovered, colors]);
};
