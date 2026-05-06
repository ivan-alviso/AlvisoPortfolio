import React, { useEffect, useRef, useState } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const pulseRef = useRef(0);
  const pulseDirRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Trail and Particles array
    const trail = [];
    const trailLength = 30;
    const particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.maxLife = Math.random() * 40 + 20;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.maxLife / 100;
        this.vy += 0.05; // gravity
      }

      draw(ctx) {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = `hsl(${180 + Math.random() * 60}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Animation loop
    const animate = () => {
      // HARD CLEAR (fixes glitching)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation (removes jitter)
      smoothMouse.current.x += (mousePos.x - smoothMouse.current.x) * 0.12;
      smoothMouse.current.y += (mousePos.y - smoothMouse.current.y) * 0.12;

      const gx = smoothMouse.current.x;
      const gy = smoothMouse.current.y;

      // Update trail
      trail.push({ x: gx, y: gy });
      if (trail.length > trailLength) {
        trail.shift();
      }

      pulseRef.current += 0.04 * pulseDirRef.current;

      if (pulseRef.current > 1) pulseDirRef.current = -1;
      if (pulseRef.current < 0) pulseDirRef.current = 1;

      // smooth sine-based pulse
      const pulse = 2 + Math.sin(pulseRef.current * Math.PI) * 0.08;

      rotationRef.current += 1.5;

      /* =========================
          GRID (stable, no trails)
      ========================= */
      ctx.strokeStyle = "rgba(0, 234, 255, 0.06)";
      ctx.lineWidth = 1;

      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      /* =========================
          TRAIL GRADIENT EFFECT
      ========================= */
      const baseRadius = 5;
      const radius = baseRadius * pulse;

      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const progress = i / trail.length; // 0 to 1
        const trailRadius = radius * progress;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, trailRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(180, 100%, 50%, ${0.1 * progress})`;
        ctx.fill();
      }

      /* =========================
          CURSOR RING (FIXED)
          - gradient border only
          - NO fill
      ========================= */
      const thickness = 2;

      ctx.save();
      ctx.globalAlpha = 0.5 * pulse;
      ctx.lineWidth = thickness;

      const gradient = ctx.createConicGradient(
        rotationRef.current * 0.01,
        gx,
        gy
      );

      gradient.addColorStop(0, "#00eaff4d");
      gradient.addColorStop(0.5, "#0088ff5d");
      gradient.addColorStop(1, "#00ffcc4b");

      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.arc(gx, gy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      /* =========================
          SOFT GLOW CORE (optional)
      ========================= */
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "#00eaff54";
      ctx.beginPath();
      ctx.arc(gx, gy, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      /* =========================
          PARTICLES (smoothed)
      ========================= */
      if (Math.random() < 0.15) {
        particles.push(new Particle(gx, gy));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        } else {
          particles[i].draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1, // ✅ move to background
      }}
    />
  );
}
