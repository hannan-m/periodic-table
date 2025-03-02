import React from 'react';
import { ElementGroup } from '../../../../types/periodic-table';

interface ElementLegendProps {
  elementGroups: Record<
    ElementGroup,
    { color: string; name: string; description: string }
  >;
}

const ElementLegend: React.FC<ElementLegendProps> = ({ elementGroups }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-1">
      {Object.entries(elementGroups).map(([key, { color, name }]) => (
        <div
          key={key}
          className="flex items-center group hover:bg-black/20 p-1 rounded transition-colors"
        >
          <div
            className={`w-4 h-4 ${color} rounded-sm shadow-sm mr-1 flex-shrink-0`}
          ></div>
          <span className="text-xs text-white truncate group-hover:text-gray-300 transition-colors">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ElementLegend);
