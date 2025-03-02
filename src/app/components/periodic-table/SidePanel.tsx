'use client';

import React from 'react';
import { Element, ElementGroup } from '../../../types/periodic-table';
import AtomicAnimation from './AtomicAnimation';

interface SidePanelProps {
  element: Element | null;
  elementGroups: Record<
    ElementGroup,
    { color: string; name: string; description: string }
  >;
  elementFacts: Record<string, string>;
  onClose?: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  element,
  elementGroups,
  elementFacts,
  onClose,
}) => {
  // Empty state - when no element is selected
  if (!element) {
    return (
      <div className="h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Element Details</h3>
          <p>Click on an element to see detailed information</p>
        </div>
      </div>
    );
  }

  // Get data for the current element
  const facts = elementFacts[element.symbol] || 'More fun facts coming soon!';
  const groupInfo = elementGroups[element.group];

  return (
    <div className="h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div
            className={`w-24 h-24 flex items-center justify-center rounded-lg mr-4 ${groupInfo.color} text-4xl font-bold shadow-md`}
          >
            {element.symbol}
          </div>
          <div>
            <h2 className="text-3xl font-bold dark:text-white">
              {element.name}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              #{element.number} - {groupInfo.name}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white p-2 rounded-full"
            aria-label="Close details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

      <div className="mb-6 flex justify-center">
        <div className="w-60 h-60 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner flex items-center justify-center">
          <AtomicAnimation element={element} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Atomic Weight
          </span>
          <p className="font-semibold dark:text-white text-lg">
            {element.atomicWeight} u
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Period
          </span>
          <p className="font-semibold dark:text-white text-lg">
            {element.period}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Group
          </span>
          <p className="font-semibold dark:text-white text-lg">
            {element.column || 'Special'}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Category
          </span>
          <p className="font-semibold dark:text-white text-lg">
            {groupInfo.name}
          </p>
        </div>
      </div>

      <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <h3 className="font-bold mb-2 dark:text-white text-lg">
          About {groupInfo.name}
        </h3>
        <p className="dark:text-gray-200">{groupInfo.description}</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg shadow-sm">
        <h3 className="font-bold mb-2 dark:text-amber-100 text-amber-800 text-lg">
          Fun Fact:
        </h3>
        <p className="dark:text-amber-100 text-amber-800">{facts}</p>
      </div>

      <div className="mt-6">
        <a
          href={`https://en.wikipedia.org/wiki/${element.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg shadow-sm text-center font-medium"
        >
          Learn More on Wikipedia
        </a>
      </div>
    </div>
  );
};

export default SidePanel;
