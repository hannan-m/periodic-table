import React from 'react';
import { Element, ElementGroup } from '../../../../types/periodic-table';
import ElementCard from '../ElementCard';

interface ElementGridProps {
  elements: Element[];
  selectedElement: Element | null;
  selectedCategory: ElementGroup | null;
  showFunMode: boolean;
  onSelect: (element: Element) => void;
}

const ElementGrid: React.FC<ElementGridProps> = ({
  elements,
  selectedElement,
  selectedCategory,
  showFunMode,
  onSelect,
}) => {
  // Create a 7x18 grid to position elements
  const grid: (Element | null)[][] = Array(10)
    .fill(null)
    .map(() => Array(18).fill(null));

  // Place elements in the grid
  elements.forEach((element) => {
    if (!element.special && element.row <= 7 && element.column <= 18) {
      grid[element.row - 1][element.column - 1] = element;
    }
  });

  return (
    <div className="grid grid-cols-18 gap-1 md:gap-1.5">
      {grid.slice(0, 7).flatMap((row, rowIndex) =>
        row.map((element, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="relative">
            {element ? (
              <ElementCard
                key={`element-${element.number}`}
                element={element}
                onSelect={onSelect}
                isSelected={
                  selectedElement !== null &&
                  selectedElement.number === element.number
                }
                isHighlighted={
                  selectedCategory !== null &&
                  element.group === selectedCategory
                }
                showFunMode={showFunMode}
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"></div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default React.memo(ElementGrid);
