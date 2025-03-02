import React from 'react';
import { ElementGroup } from '../../../../types/periodic-table';
import ThemeToggle from '../ThemeToggle';

interface FilterControlsProps {
  elementGroups: Record<
    ElementGroup,
    { color: string; name: string; description: string }
  >;
  selectedCategory: ElementGroup | null;
  showFunMode: boolean;
  onCategoryFilter: (category: ElementGroup | null) => void;
  onToggleFunMode: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  elementGroups,
  selectedCategory,
  showFunMode,
  onCategoryFilter,
  onToggleFunMode,
}) => {
  return (
    <div className="mb-3 flex flex-wrap justify-between items-center gap-2 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50 p-2">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(elementGroups).map(([key, { color, name }]) => (
          <button
            key={key}
            className={`px-3 py-2 rounded-full text-sm ${color} ${
              selectedCategory === key
                ? 'ring-2 ring-blue-400 dark:ring-purple-400 ring-offset-1 ring-offset-black/30'
                : ''
            } shadow-md transition-all hover:scale-105 font-medium`}
            onClick={() => onCategoryFilter(key as ElementGroup)}
            data-testid={`filter-${key}`}
          >
            {name}
          </button>
        ))}
        <button
          className="px-3 py-2 rounded-full text-sm bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-md hover:from-gray-600 hover:to-gray-500 transition-all font-medium"
          onClick={() => onCategoryFilter(null)}
          data-testid="clear-filter"
        >
          All Elements
        </button>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <button
          className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all ${
            showFunMode
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-gray-800/70 hover:bg-gray-700/70 text-gray-300'
          }`}
          onClick={onToggleFunMode}
          data-testid="toggle-fun-mode"
        >
          <span role="img" aria-label="Fun mode">
            {showFunMode ? '✨' : '🔍'}
          </span>
          {showFunMode ? 'Fun Mode On' : 'Fun Mode'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FilterControls);
