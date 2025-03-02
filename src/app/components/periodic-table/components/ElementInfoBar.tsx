import React from 'react';
import { Element } from '../../../../types/periodic-table';
import elementGroups from '../../../../data/elementGroups';

interface ElementInfoBarProps {
  element: Element | null;
}

const ElementInfoBar: React.FC<ElementInfoBarProps> = ({ element }) => {
  if (!element) {
    return (
      <div className="p-3 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50 text-center text-gray-400">
        Hover or select an element to see details
      </div>
    );
  }

  const groupInfo = elementGroups[element.group];

  return (
    <div className="p-3 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Element identification */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${groupInfo.color} flex items-center justify-center rounded-md text-xl font-bold relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
            <span className="relative z-10">{element.symbol}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{element.name}</h3>
            <p className="text-xs text-gray-300">#{element.number}</p>
          </div>
        </div>

        {/* Group and period info */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-indigo-900/30 border border-indigo-500/20">
            <span className="text-xs text-gray-400">Period</span>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {element.period}
            </span>
          </div>

          <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-purple-900/30 border border-purple-500/20">
            <span className="text-xs text-gray-400">Group</span>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {element.column || '—'}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/20">
            <div className={`w-3 h-3 ${groupInfo.color} rounded-full`}></div>
            <span className="text-sm text-white">{groupInfo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ElementInfoBar);
