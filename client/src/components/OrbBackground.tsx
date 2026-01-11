import React, { useEffect, useRef } from 'react';

/**
 * OrbBackground Component
 * Renders a 3D animated orb effect using Canvas
 * Design: Deep space cyberpunk aesthetic with neon glow
 */
export const OrbBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const orbRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a1428');
      gradient.addColorStop(0.5, '#1a0f3a');
      gradient.addColorStop(1, '#0a1428');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update orb position
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      orbRef.current.targetX = centerX + (mouseRef.current.x - centerX) * 0.1;
      orbRef.current.targetY = centerY + (mouseRef.current.y - centerY) * 0.1;

      // Smooth movement
      orbRef.current.vx += (orbRef.current.targetX - orbRef.current.x) * 0.02;
      orbRef.current.vy += (orbRef.current.targetY - orbRef.current.y) * 0.02;
      orbRef.current.vx *= 0.95;
      orbRef.current.vy *= 0.95;
      orbRef.current.x += orbRef.current.vx;
      orbRef.current.y += orbRef.current.vy;

      // Draw main orb with gradient
      const orbGradient = ctx.createRadialGradient(
        orbRef.current.x,
        orbRef.current.y,
        0,
        orbRef.current.x,
        orbRef.current.y,
        200
      );
      orbGradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)');
      orbGradient.addColorStop(0.5, 'rgba(176, 38, 255, 0.4)');
      orbGradient.addColorStop(1, 'rgba(26, 15, 58, 0)');

      ctx.fillStyle = orbGradient;
      ctx.beginPath();
      ctx.arc(orbRef.current.x, orbRef.current.y, 200, 0, Math.PI * 2);
      ctx.fill();

      // Draw glowing border
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(orbRef.current.x, orbRef.current.y, 200, 0, Math.PI * 2);
      ctx.stroke();

      // Draw floating particles
      drawParticles(ctx, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

/**
 * Draw floating particles for depth effect
 */
function drawParticles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.sin(i * 12.9898 + Date.now() * 0.0001) * 0.5 + 0.5) * width;
    const y = (Math.cos(i * 78.233 + Date.now() * 0.00008) * 0.5 + 0.5) * height;
    const size = Math.sin(i * 45.164 + Date.now() * 0.0002) * 1 + 1;
    const opacity = Math.sin(i * 23.456 + Date.now() * 0.0003) * 0.5 + 0.3;

    ctx.fillStyle = `rgba(0, 217, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
