'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Element, ElementGroup } from '../../../types/periodic-table';
import elements from '../../../data/elements';
import elementGroups from '../../../data/elementGroups';
import elementFacts from '../../../data/elementFacts';
import dynamic from 'next/dynamic';

import FilterControls from './components/FilterControls';
import ElementGrid from './components/ElementGrid';
import SpecialSeries from './components/SpecialSeries';
import ElementLegend from './components/ElementLegend';
import ElementDetails from './components/ElementDetails';
import ElementInfoBar from './components/ElementInfoBar';

// Dynamic imports for p5.js components
const BackgroundAnimation = dynamic(() => import('./BackgroundAnimation'), {
  loading: () => <div className="fixed inset-0 bg-transparent"></div>,
  ssr: false,
});

const PeriodicTable: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ElementGroup | null>(
    null
  );
  const [showFunMode, setShowFunMode] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const tableRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update window width with debounce
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  // Event handlers with useCallback
  const handleElementSelect = useCallback((element: Element): void => {
    setSelectedElement((prev) =>
      prev?.number === element.number ? null : element
    );
  }, []);

  const handleCategoryFilter = useCallback((category: ElementGroup): void => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  const toggleFunMode = useCallback((): void => {
    setShowFunMode((prev) => !prev);
  }, []);

  // Loading view
  if (!elements || !elementGroups || !elementFacts) {
    return <div className="p-4 text-white">Loading periodic table...</div>;
  }

  return (
    <div className="w-full" data-testid="periodic-table">
      {/* Background animation */}
      {showFunMode && <BackgroundAnimation />}

      <div className="p-2">
        {/* Controls and filter row */}
        <FilterControls
          elementGroups={elementGroups}
          selectedCategory={selectedCategory}
          showFunMode={showFunMode}
          onCategoryFilter={handleCategoryFilter}
          onToggleFunMode={toggleFunMode}
        />

        <div className="mb-3">
          <ElementInfoBar element={selectedElement} />
        </div>

        {/* Main content grid - table and side panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-3">
          {/* Left column - periodic table */}
          <div className="space-y-3">
            {/* Main periodic table */}
            <div className="p-2 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50">
              <h2 className="text-base font-bold mb-2 text-white px-1 flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></div>
                Periodic Table of Elements
              </h2>
              <div className="overflow-x-auto pb-1" ref={tableRef}>
                <ElementGrid
                  elements={elements}
                  selectedElement={selectedElement}
                  selectedCategory={selectedCategory}
                  showFunMode={showFunMode}
                  onSelect={handleElementSelect}
                />
              </div>
            </div>

            {/* Special series */}
            <div className="p-2 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50">
              <h2 className="text-base font-bold mb-2 text-white px-1 flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mr-2"></div>
                Lanthanides & Actinides
              </h2>
              <SpecialSeries
                elements={elements}
                selectedElement={selectedElement}
                selectedCategory={selectedCategory}
                showFunMode={showFunMode}
                onSelect={handleElementSelect}
              />
            </div>

            {/* Legend - visible only on mobile/tablet */}
            <div className="p-2 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50 lg:hidden">
              <h2 className="text-base font-bold mb-2 text-white px-1 flex items-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 mr-2"></div>
                Element Categories
              </h2>
              <ElementLegend elementGroups={elementGroups} />
            </div>
          </div>

          {/* Right column - side panel */}
          <div className="h-full">
            <ElementDetails
              element={selectedElement}
              elementGroups={elementGroups}
              elementFacts={elementFacts}
              onClose={
                selectedElement ? () => setSelectedElement(null) : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PeriodicTable);
