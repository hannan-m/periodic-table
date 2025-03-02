'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the PeriodicTable component
const PeriodicTable = dynamic(
  () => import('../app/components/periodic-table'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-lg">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-500 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2">Loading Periodic Table...</span>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 text-white relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs - only visible in dark mode */}
        <div className="dark:block hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Light mode background elements */}
        <div className="dark:hidden block">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Header with animated gradient */}
      <header className="relative px-4 py-8 flex flex-col items-center justify-center">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

        <h1 className="text-4xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 tracking-tight">
          Interactive Periodic Table
        </h1>

        <p className="text-base text-gray-300 dark:text-gray-300 text-center max-w-2xl">
          Explore the elements that make up our universe through this
          interactive visualization
        </p>
      </header>

      {/* Main content with content-visibility for performance */}
      <main className="mx-auto w-full max-w-[1900px] px-4 content-visibility-auto">
        <div className="backdrop-blur-sm bg-black/20 dark:bg-black/40 p-1 rounded-xl overflow-hidden border border-gray-500/20">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-96 text-white">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              </div>
            }
          >
            <PeriodicTable />
          </Suspense>
        </div>

        {/* Footer with unique design */}
        <footer className="mt-8 mb-6 text-center text-sm text-gray-400/60 dark:text-gray-400/60 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"></div>
          <p className="mt-4 italic">
            &ldquo;The elements and their behavior are the manifestation of
            nature's beauty.&rdquo;
          </p>
          <p className="mt-2 font-mono">
            Interactive Periodic Table &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
