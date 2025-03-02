'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import p5 dynamically without SSR option
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: false,
});

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
  const particlesRef = useRef<Particle[]>([]);

  // Use fewer particles to reduce CPU usage
  const particleCount = 8;

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

  // p5.js setup function
  const setup = (p5: any, canvasParentRef: Element) => {
    // Create smaller canvas to reduce memory usage
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(30); // Limit frame rate to reduce CPU usage

    // Create initial particles only once
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(p5));
      }
    }
  };

  // Create a single particle with simplified properties
  const createParticle = (p5: any): Particle => {
    const size = p5.random(20, 40);
    const symbol = symbols[Math.floor(p5.random(symbols.length))];
    const color: [number, number, number, number] = [
      p5.random(50, 150),
      p5.random(50, 150),
      p5.random(150, 255),
      p5.random(5, 10), // Lower opacity to reduce visual impact
    ];

    return {
      x: p5.random(p5.width),
      y: p5.random(p5.height),
      size,
      speedX: p5.random(-0.2, 0.2), // Slower movement
      speedY: p5.random(-0.2, 0.2),
      color,
      symbol,
    };
  };

  // p5.js draw function - simplified for better performance
  const draw = (p5: any) => {
    p5.clear();

    // Update and draw particles
    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];

      // Move particle
      p.x += p.speedX;
      p.y += p.speedY;

      // Simple boundary handling
      if (p.x < 0) p.x = p5.width;
      if (p.x > p5.width) p.x = 0;
      if (p.y < 0) p.y = p5.height;
      if (p.y > p5.height) p.y = 0;

      // Simplified drawing
      p5.noStroke();
      p5.fill(p.color[0], p.color[1], p.color[2], p.color[3]);
      p5.ellipse(p.x, p.y, p.size, p.size);

      // Draw element symbol
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(p.size / 2);
      p5.fill(
        isDarkMode ? 255 : 0,
        isDarkMode ? 255 : 0,
        isDarkMode ? 255 : 0,
        20
      );
      p5.text(p.symbol, p.x, p.y);
    }
  };

  // Handle window resize - simplified
  const windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';

export default BackgroundAnimation;
