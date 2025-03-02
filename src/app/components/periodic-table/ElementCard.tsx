'use client';

import React, { useCallback, memo } from 'react';
import { ElementCardProps } from '../../../types/periodic-table';
import elementGroups from '../../../data/elementGroups';

// Using React.memo with custom comparison for performance
const ElementCard: React.FC<ElementCardProps> = memo(
  ({ element, onSelect, isSelected, isHighlighted, showFunMode }) => {
    const groupInfo = elementGroups[element.group];

    // Base classes with modern styling
    const regularClasses = `
    element-card
    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
    ${groupInfo.color} 
    shadow-md
    rounded-md
    transition-all
    duration-200
    relative
    overflow-hidden
    flex flex-col items-center justify-center
    ${
      isSelected
        ? 'ring-2 ring-offset-1 ring-offset-black/30 ring-purple-400 scale-105 z-20'
        : ''
    }
    ${isHighlighted ? 'ring-1 ring-indigo-400 z-10' : ''} 
    ${showFunMode ? 'shadow-lg hover:shadow-xl' : 'hover:shadow-md'}
  `;

    // Handle events with useCallback
    const handleClick = useCallback(() => {
      if (typeof onSelect === 'function') {
        onSelect(element);
      }
    }, [element, onSelect]);

    return (
      <div
        className={regularClasses}
        onClick={handleClick}
        data-testid={`element-${element.symbol}`}
        aria-label={`${element.name}, atomic number ${element.number}`}
      >
        {/* Glass morphism effect with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30"></div>

        {/* Optional animated glow effect when selected or in fun mode */}
        {isSelected && (
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        )}

        {/* Element number */}
        <div className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] md:text-[10px] opacity-80 font-mono">
          {element.number}
        </div>

        {/* Element symbol */}
        <div className="font-bold text-sm sm:text-base md:text-lg mt-1">
          {element.symbol}
        </div>

        {/* Element name */}
        <div className="text-[7px] sm:text-[8px] md:text-[9px] truncate w-full text-center">
          {element.name}
        </div>

        {/* Element weight for larger screens */}
        <div className="text-[6px] sm:text-[7px] md:text-[8px] opacity-80 hidden md:block">
          {element.atomicWeight}
        </div>

        {/* Bottom accent bar */}
        {isSelected && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        )}

        {/* Subtle highlight when in fun mode */}
        {showFunMode && (
          <div className="absolute inset-1 -z-10 rounded-sm opacity-30 bg-gradient-to-br from-white/5 to-white/0"></div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.element.number === nextProps.element.number &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.isHighlighted === nextProps.isHighlighted &&
      prevProps.showFunMode === nextProps.showFunMode
    );
  }
);

ElementCard.displayName = 'ElementCard';

export default ElementCard;
