'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: [number, number, number, number];
  symbol: string;
}

// Reduced and simplified symbols list
const symbols = ['H', 'C', 'O', 'N', 'Na', 'Cl', 'Fe', 'Au'];

// Using React.memo to prevent unnecessary re-renders
const BackgroundAnimation: React.FC = React.memo(() => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Use fewer particles to reduce CPU usage
  const particleCount = 8;

  // Create a particle with simplified properties
  const createParticle = useCallback((p: p5): Particle => {
    const size = p.random(20, 40);
    const symbol = symbols[Math.floor(p.random(symbols.length))];
    const color: [number, number, number, number] = [
      p.random(50, 150),
      p.random(50, 150),
      p.random(150, 255),
      p.random(5, 10), // Lower opacity to reduce visual impact
    ];

    return {
      x: p.random(p.width),
      y: p.random(p.height),
      size,
      speedX: p.random(-0.2, 0.2), // Slower movement
      speedY: p.random(-0.2, 0.2),
      color,
      symbol,
    };
  }, []);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Set up observer to detect theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a new p5 instance
    const sketch = (p: p5) => {
      p.setup = () => {
        // Create smaller canvas to reduce memory usage
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        p.frameRate(30); // Limit frame rate to reduce CPU usage

        // Create initial particles only once
        if (particlesRef.current.length === 0) {
          for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(createParticle(p));
          }
        }
      };

      p.draw = () => {
        p.clear();
        p.background(0, 0, 0, 0); // Transparent background

        // Update and draw particles
        for (let i = 0; i < particlesRef.current.length; i++) {
          const particle = particlesRef.current[i];

          // Move particle
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Simple boundary handling
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;

          // Simplified drawing
          p.noStroke();
          p.fill(
            particle.color[0],
            particle.color[1],
            particle.color[2],
            particle.color[3]
          );
          p.ellipse(particle.x, particle.y, particle.size, particle.size);

          // Draw element symbol
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(particle.size / 2);
          p.fill(
            isDarkMode ? 255 : 0,
            isDarkMode ? 255 : 0,
            isDarkMode ? 255 : 0,
            20
          );
          p.text(particle.symbol, particle.x, particle.y);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    // Create p5 instance
    p5InstanceRef.current = new p5(sketch);

    // Clean up
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [createParticle]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
    ></div>
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';

export default BackgroundAnimation;
