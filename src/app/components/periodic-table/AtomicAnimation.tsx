'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Element } from '../../../types/periodic-table';
import dynamic from 'next/dynamic';

// Import p5 dynamically without SSR option
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading animation...</div>
    </div>
  ),
  ssr: false,
});

interface AtomicAnimationProps {
  element: Element;
}

interface Electron {
  shell: number;
  angle: number;
  speed: number;
}

// Using React.memo to prevent unnecessary re-renders
const AtomicAnimation: React.FC<AtomicAnimationProps> = React.memo(
  ({ element }) => {
    const nucleusColorRef = useRef<[number, number, number]>([255, 100, 100]);
    const electronParticlesRef = useRef<Electron[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Calculate nucleus color based on element group - memo to avoid recalculation
    const nucleusColor = useMemo<[number, number, number]>(() => {
      switch (element.group) {
        case 'alkali-metal':
          return [255, 70, 70];
        case 'alkaline-earth':
          return [255, 130, 70];
        case 'transition-metal':
          return [255, 200, 60];
        case 'post-transition-metal':
          return [80, 255, 180];
        case 'metalloid':
          return [70, 240, 130];
        case 'nonmetal':
          return [70, 130, 255];
        case 'halogen':
          return [100, 110, 255];
        case 'noble-gas':
          return [200, 100, 255];
        case 'lanthanide':
          return [255, 70, 200];
        case 'actinide':
          return [255, 70, 130];
        default:
          return [150, 150, 150];
      }
    }, [element.group]);

    // Update nucleus color reference
    useEffect(() => {
      nucleusColorRef.current = nucleusColor;
    }, [nucleusColor]);

    // Setup electrons once when the element changes
    useEffect(() => {
      // Calculate electrons per shell
      const electronConfiguration = calculateElectronsPerShell(element.number);
      const electrons: Electron[] = [];

      electronConfiguration.forEach((count, shellIndex) => {
        // Create electrons for this shell - simplified with fewer properties
        for (let i = 0; i < count; i++) {
          electrons.push({
            shell: shellIndex + 1,
            angle: (360 / count) * i,
            speed: 0.5 - shellIndex * 0.05, // Slower speed for better visibility
          });
        }
      });

      electronParticlesRef.current = electrons;
    }, [element.number]);

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

    // p5.js setup function - improved for larger elements
    const setup = (p5: any, canvasParentRef: Element) => {
      // Larger canvas size to better fit elements with many electrons
      p5.createCanvas(400, 400).parent(canvasParentRef);
      p5.angleMode(p5.DEGREES);
      p5.frameRate(30); // Balanced frame rate
    };

    // p5.js draw function - optimized for performance but improved for visibility
    const draw = (p5: any) => {
      p5.clear();
      p5.background(0, 0, 0, 0); // Transparent background
      p5.translate(p5.width / 2, p5.height / 2);

      // Calculate maximum shell number to adjust scaling
      const maxShell = Math.max(
        ...electronParticlesRef.current.map((e) => e.shell)
      );
      // Scale factor to ensure all shells fit in the canvas
      const scaleFactor = maxShell > 4 ? 0.9 / (maxShell * 0.25) : 1;

      // Get unique shells
      const shells = new Set(electronParticlesRef.current.map((e) => e.shell));

      // Draw electron shells - improved with better visibility
      shells.forEach((shellNum) => {
        const shellRadius = 40 + shellNum * (30 * scaleFactor);

        // Shell orbit with better visibility
        p5.noFill();
        p5.stroke(100, 130, 255, 40);
        p5.strokeWeight(1);
        p5.ellipse(0, 0, shellRadius * 2, shellRadius * 2);
      });

      // Draw nucleus - LARGER as requested
      const nucleusSize = Math.max(40, 35 + element.number / 20); // Increased base size from 28 to 40
      p5.noStroke();

      // Enhanced nucleus glow
      p5.fill(
        nucleusColorRef.current[0],
        nucleusColorRef.current[1],
        nucleusColorRef.current[2],
        15
      );
      p5.ellipse(0, 0, nucleusSize * 2.2, nucleusSize * 2.2);

      p5.fill(
        nucleusColorRef.current[0],
        nucleusColorRef.current[1],
        nucleusColorRef.current[2],
        30
      );
      p5.ellipse(0, 0, nucleusSize * 1.8, nucleusSize * 1.8);

      p5.fill(
        nucleusColorRef.current[0],
        nucleusColorRef.current[1],
        nucleusColorRef.current[2],
        50
      );
      p5.ellipse(0, 0, nucleusSize * 1.4, nucleusSize * 1.4);

      // Main nucleus - larger and with gradient effect
      p5.drawingContext.shadowBlur = 15;
      p5.drawingContext.shadowColor = p5.color(
        nucleusColorRef.current[0],
        nucleusColorRef.current[1],
        nucleusColorRef.current[2],
        150
      );
      p5.fill(
        nucleusColorRef.current[0],
        nucleusColorRef.current[1],
        nucleusColorRef.current[2]
      );
      p5.ellipse(0, 0, nucleusSize, nucleusSize);

      // Core highlight for 3D effect
      p5.fill(255, 255, 255, 100);
      p5.noStroke();
      p5.ellipse(
        -nucleusSize / 6,
        -nucleusSize / 6,
        nucleusSize / 2.5,
        nucleusSize / 2.5
      );

      // Add atom symbol in the center
      p5.drawingContext.shadowBlur = 0; // Reset shadow for text
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(nucleusSize * 0.45);
      p5.fill(255, 255, 255, 220);
      p5.text(element.symbol, 0, 0);

      // Draw electrons - improved size and visibility
      electronParticlesRef.current.forEach((electron) => {
        const shellRadius = 40 + electron.shell * (30 * scaleFactor);

        // Update angle based on speed
        electron.angle = (electron.angle + electron.speed) % 360;

        // Calculate position
        const electronX = shellRadius * p5.cos(electron.angle);
        const electronY = shellRadius * p5.sin(electron.angle);

        // Larger electron for better visibility
        const electronSize = 9; // Increased from 8 to 9

        // Electron trail for motion effect
        for (let i = 1; i <= 3; i++) {
          const trailAngle = electron.angle - electron.speed * i * 3;
          const trailX = shellRadius * p5.cos(trailAngle);
          const trailY = shellRadius * p5.sin(trailAngle);
          const opacity = 30 - i * 10;

          p5.fill(100, 150, 255, opacity);
          p5.ellipse(
            trailX,
            trailY,
            electronSize - i * 2,
            electronSize - i * 2
          );
        }

        // Electron glow
        p5.fill(100, 150, 255, 30);
        p5.ellipse(electronX, electronY, electronSize + 6, electronSize + 6);

        // Main electron
        p5.fill(100, 150, 255);
        p5.ellipse(electronX, electronY, electronSize, electronSize);

        // Electron highlight
        p5.fill(255, 255, 255, 180);
        p5.ellipse(
          electronX - 1.5,
          electronY - 1.5,
          electronSize * 0.4,
          electronSize * 0.4
        );
      });
    };

    return (
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <Sketch setup={setup} draw={draw} />
      </div>
    );
  }
);

AtomicAnimation.displayName = 'AtomicAnimation';

// Helper function to calculate electrons per shell (Bohr model - simplified)
function calculateElectronsPerShell(atomicNumber: number): number[] {
  // This is a simplified model for visualization purposes
  let electrons = atomicNumber;
  const shells: number[] = [];

  // Maximum electrons per shell (2, 8, 18, 32, 32, 18, 8)
  const maxElectrons = [2, 8, 18, 32, 32, 18, 8];

  for (let i = 0; i < maxElectrons.length && electrons > 0; i++) {
    const shellElectrons = Math.min(electrons, maxElectrons[i]);
    shells.push(shellElectrons);
    electrons -= shellElectrons;
  }

  return shells;
}

export default AtomicAnimation;
