import React from 'react';
import { Element, ElementGroup } from '../../../../types/periodic-table';
import ElementCard from '../ElementCard';

interface SpecialSeriesProps {
  elements: Element[];
  selectedElement: Element | null;
  selectedCategory: ElementGroup | null;
  showFunMode: boolean;
  onSelect: (element: Element) => void;
}

const SpecialSeries: React.FC<SpecialSeriesProps> = ({
  elements,
  selectedElement,
  selectedCategory,
  showFunMode,
  onSelect,
}) => {
  const lanthanides = elements.filter((e) => e.group === 'lanthanide');
  const actinides = elements.filter((e) => e.group === 'actinide');

  return (
    <div className="mt-4">
      {/* Row label for Lanthanides */}
      <div className="flex items-center mb-1">
        <div className="w-10 sm:w-12 md:w-14 lg:w-16 text-center font-bold text-sm text-white">
          8
        </div>
        <div className="flex-1 grid grid-cols-15 gap-1 md:gap-1.5">
          {lanthanides.map((element) => (
            <ElementCard
              key={`element-${element.number}`}
              element={element}
              onSelect={onSelect}
              isSelected={
                selectedElement !== null &&
                selectedElement.number === element.number
              }
              isHighlighted={
                selectedCategory !== null && element.group === selectedCategory
              }
              showFunMode={showFunMode}
            />
          ))}
        </div>
      </div>

      {/* Row label for Actinides */}
      <div className="flex items-center">
        <div className="w-10 sm:w-12 md:w-14 lg:w-16 text-center font-bold text-sm text-white">
          9
        </div>
        <div className="flex-1 grid grid-cols-15 gap-1 md:gap-1.5">
          {actinides.map((element) => (
            <ElementCard
              key={`element-${element.number}`}
              element={element}
              onSelect={onSelect}
              isSelected={
                selectedElement !== null &&
                selectedElement.number === element.number
              }
              isHighlighted={
                selectedCategory !== null && element.group === selectedCategory
              }
              showFunMode={showFunMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SpecialSeries);
