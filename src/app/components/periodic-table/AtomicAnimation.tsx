'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { Element } from '../../../types/periodic-table';
import p5 from 'p5';

interface AtomicAnimationProps {
  element: Element;
}

interface Electron {
  shell: number;
  angle: number;
  speed: number;
}

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

// Using React.memo to prevent unnecessary re-renders
const AtomicAnimation: React.FC<AtomicAnimationProps> = React.memo(
  ({ element }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<p5 | null>(null);
    const nucleusColorRef = useRef<[number, number, number]>([255, 100, 100]);
    const electronParticlesRef = useRef<Electron[]>([]);

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
      if (!containerRef.current) return;

      // Cleanup any existing p5 instance
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

      // Create a new p5 instance
      const sketch = (p: p5) => {
        p.setup = () => {
          // Larger canvas size to better fit elements with many electrons
          const canvas = p.createCanvas(400, 400);
          canvas.parent(containerRef.current!);
          p.angleMode(p.DEGREES);
          p.frameRate(30); // Balanced frame rate
        };

        p.draw = () => {
          p.clear();
          p.background(0, 0, 0, 0); // Transparent background
          p.translate(p.width / 2, p.height / 2);

          // Calculate maximum shell number to adjust scaling
          const maxShell = Math.max(
            ...electronParticlesRef.current.map((e) => e.shell)
          );
          // Scale factor to ensure all shells fit in the canvas
          const scaleFactor = maxShell > 4 ? 0.9 / (maxShell * 0.25) : 1;

          // Get unique shells
          const shells = new Set(
            electronParticlesRef.current.map((e) => e.shell)
          );

          // Draw electron shells - improved with better visibility
          shells.forEach((shellNum) => {
            const shellRadius = 40 + shellNum * (30 * scaleFactor);

            // Shell orbit with better visibility
            p.noFill();
            p.stroke(100, 130, 255, 40);
            p.strokeWeight(1);
            p.ellipse(0, 0, shellRadius * 2, shellRadius * 2);
          });

          // Draw nucleus - LARGER as requested
          const nucleusSize = Math.max(40, 35 + element.number / 20); // Increased base size from 28 to 40
          p.noStroke();

          // Enhanced nucleus glow
          p.fill(
            nucleusColorRef.current[0],
            nucleusColorRef.current[1],
            nucleusColorRef.current[2],
            15
          );
          p.ellipse(0, 0, nucleusSize * 2.2, nucleusSize * 2.2);

          p.fill(
            nucleusColorRef.current[0],
            nucleusColorRef.current[1],
            nucleusColorRef.current[2],
            30
          );
          p.ellipse(0, 0, nucleusSize * 1.8, nucleusSize * 1.8);

          p.fill(
            nucleusColorRef.current[0],
            nucleusColorRef.current[1],
            nucleusColorRef.current[2],
            50
          );
          p.ellipse(0, 0, nucleusSize * 1.4, nucleusSize * 1.4);

          // Main nucleus - larger and with gradient effect
          p.drawingContext.shadowBlur = 15;
          p.drawingContext.shadowColor = p.color(
            nucleusColorRef.current[0],
            nucleusColorRef.current[1],
            nucleusColorRef.current[2],
            150
          );
          p.fill(
            nucleusColorRef.current[0],
            nucleusColorRef.current[1],
            nucleusColorRef.current[2]
          );
          p.ellipse(0, 0, nucleusSize, nucleusSize);

          // Core highlight for 3D effect
          p.fill(255, 255, 255, 100);
          p.noStroke();
          p.ellipse(
            -nucleusSize / 6,
            -nucleusSize / 6,
            nucleusSize / 2.5,
            nucleusSize / 2.5
          );

          // Add atom symbol in the center
          p.drawingContext.shadowBlur = 0; // Reset shadow for text
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(nucleusSize * 0.45);
          p.fill(255, 255, 255, 220);
          p.text(element.symbol, 0, 0);

          // Draw electrons - improved size and visibility
          electronParticlesRef.current.forEach((electron) => {
            const shellRadius = 40 + electron.shell * (30 * scaleFactor);

            // Update angle based on speed
            electron.angle = (electron.angle + electron.speed) % 360;

            // Calculate position
            const electronX = shellRadius * p.cos(electron.angle);
            const electronY = shellRadius * p.sin(electron.angle);

            // Larger electron for better visibility
            const electronSize = 9; // Increased from 8 to 9

            // Electron trail for motion effect
            for (let i = 1; i <= 3; i++) {
              const trailAngle = electron.angle - electron.speed * i * 3;
              const trailX = shellRadius * p.cos(trailAngle);
              const trailY = shellRadius * p.sin(trailAngle);
              const opacity = 30 - i * 10;

              p.fill(100, 150, 255, opacity);
              p.ellipse(
                trailX,
                trailY,
                electronSize - i * 2,
                electronSize - i * 2
              );
            }

            // Electron glow
            p.fill(100, 150, 255, 30);
            p.ellipse(electronX, electronY, electronSize + 6, electronSize + 6);

            // Main electron
            p.fill(100, 150, 255);
            p.ellipse(electronX, electronY, electronSize, electronSize);

            // Electron highlight
            p.fill(255, 255, 255, 180);
            p.ellipse(
              electronX - 1.5,
              electronY - 1.5,
              electronSize * 0.4,
              electronSize * 0.4
            );
          });
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
    }, [element.number, element.symbol, element.group]);

    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        <div className="w-full h-full"></div>
      </div>
    );
  }
);

AtomicAnimation.displayName = 'AtomicAnimation';

export default AtomicAnimation;
