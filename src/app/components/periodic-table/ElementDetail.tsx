import React from 'react';
import { ElementDetailProps } from '../../../types/periodic-table';

const ElementDetail: React.FC<ElementDetailProps> = ({
  element,
  onClose,
  elementGroups,
  elementFacts,
}) => {
  if (!element) return null;

  const facts = elementFacts[element.symbol] || 'More fun facts coming soon!';
  const groupInfo = elementGroups[element.group];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="element-detail-overlay"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-6">
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-lg mr-4 ${groupInfo.color} text-3xl font-bold shadow-md`}
          >
            {element.symbol}
          </div>
          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              {element.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              #{element.number} - {groupInfo.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
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

        <div className="flex justify-between mt-6 gap-3">
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm"
            onClick={onClose}
            data-testid="close-detail-button"
          >
            Close
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm flex-1"
            onClick={() =>
              window.open(
                `https://en.wikipedia.org/wiki/${element.name}`,
                '_blank'
              )
            }
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementDetail;
