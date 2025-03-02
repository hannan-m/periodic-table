import React from 'react';
import { Element, ElementGroup } from '../../../../types/periodic-table';
import AtomicAnimation from '../AtomicAnimation';
import { getElementInfo } from '../utils/elementUtils';

interface ElementDetailsProps {
  element: Element | null;
  elementGroups: Record<
    ElementGroup,
    { color: string; name: string; description: string }
  >;
  elementFacts: Record<string, string>;
  onClose?: () => void;
}

const ElementDetails: React.FC<ElementDetailsProps> = ({
  element,
  elementGroups,
  elementFacts,
  onClose,
}) => {
  // Empty state
  if (!element) {
    return (
      <div className="h-full p-4 bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50 flex flex-col items-center justify-center text-center">
        <div className="relative w-20 h-20 mb-4 opacity-40">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-2 border-transparent border-t-purple-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-500/50 rounded-full"></div>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">Element Details</h3>
        <p className="text-gray-400 text-sm">
          Click on an element to explore its properties
        </p>
      </div>
    );
  }

  // Get element info
  const facts = elementFacts[element.symbol] || 'More fun facts coming soon!';
  const groupInfo = elementGroups[element.group];
  const {
    electronConfig,
    physicalState,
    electronegativity,
    shells,
    commonUses,
    valenceElectrons,
  } = getElementInfo(element);

  return (
    <div className="h-full bg-black/30 backdrop-blur-md rounded-lg border border-gray-700/50 overflow-auto">
      <div className="sticky top-0 z-10 flex justify-between items-center p-3 border-b border-gray-700/50 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg ${groupInfo.color} text-xl font-bold shadow-lg group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
            <span className="relative z-10">{element.symbol}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{element.name}</h2>
            <p className="text-xs text-gray-300">
              #{element.number} - {groupInfo.name}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-gray-800/50 hover:bg-gray-700/70 text-white p-1.5 rounded-full transition-colors"
            aria-label="Clear selection"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="p-3">
        {/* Atomic Animation */}
        <div className="mb-4">
          <div className="w-full h-72 bg-black/30 rounded-lg flex items-center justify-center mb-2 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-36 h-36 rounded-full border-8 border-purple-500/20"></div>
              <div className="absolute w-52 h-52 rounded-full border-4 border-blue-500/10"></div>
              <div className="absolute w-72 h-72 rounded-full border-2 border-cyan-500/10"></div>
            </div>
            <AtomicAnimation element={element} />
          </div>
          <div className="text-center text-xs text-gray-300 font-medium">
            <span className="bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 bg-clip-text text-transparent">
              Atomic Structure:
            </span>{' '}
            {element.number} electrons
          </div>
          <div className="text-center text-xs text-gray-400 mt-1">
            Electron Configuration: {electronConfig}
          </div>
        </div>

        {/* Basic properties */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg group transition-all hover:bg-indigo-900/20">
            <span className="text-xs text-gray-400 block mb-1">
              Atomic Weight
            </span>
            <p className="font-semibold text-white text-sm bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-indigo-300 transition-all">
              {element.atomicWeight} u
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg group transition-all hover:bg-indigo-900/20">
            <span className="text-xs text-gray-400 block mb-1">
              Atomic Number
            </span>
            <p className="font-semibold text-white text-sm bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all">
              {element.number}
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg group transition-all hover:bg-indigo-900/20">
            <span className="text-xs text-gray-400 block mb-1">
              Electron Shells
            </span>
            <p className="font-semibold text-white text-sm">
              {shells.join('-')}
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg group transition-all hover:bg-indigo-900/20">
            <span className="text-xs text-gray-400 block mb-1">
              Physical State
            </span>
            <p className="font-semibold text-white text-sm">{physicalState}</p>
          </div>
        </div>

        {/* Additional chemical properties */}
        <div className="mb-4">
          <h3 className="font-bold mb-2 text-white text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-2"></div>
            Chemical Properties
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {/* Electron configuration */}
            <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg group transition-all hover:bg-blue-900/20">
              <span className="text-xs text-gray-400 block mb-1">
                Valence Electrons
              </span>
              <p className="font-semibold text-white text-sm">
                {valenceElectrons}
              </p>
            </div>
          </div>
        </div>

        {/* Category description */}
        <div className="mb-4 bg-black/20 backdrop-blur-sm p-3 rounded-lg">
          <h3 className="font-bold mb-1 text-white text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2"></div>
            About {groupInfo.name}
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed">
            {groupInfo.description}
          </p>
        </div>

        {/* Common uses section */}
        <div className="mb-4 bg-black/20 backdrop-blur-sm p-3 rounded-lg">
          <h3 className="font-bold mb-1 text-white text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 mr-2"></div>
            Common Uses
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed">{commonUses}</p>
        </div>

        {/* Fun fact */}
        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm p-3 rounded-lg border border-amber-700/20">
          <h3 className="font-bold mb-1 text-amber-100 text-sm flex items-center">
            <span className="text-amber-400 mr-2">✨</span>
            Fun Fact:
          </h3>
          <p className="text-amber-100 text-xs leading-relaxed">{facts}</p>
        </div>

        {/* External resources */}
        <div className="mt-4">
          <a
            href={`https://en.wikipedia.org/wiki/${element.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 px-3 rounded-lg text-center text-sm font-medium transition-all"
          >
            Learn More on Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ElementDetails);
