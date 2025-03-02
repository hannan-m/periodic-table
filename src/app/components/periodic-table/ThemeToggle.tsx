'use client';

import React, { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Toggle theme with animation
  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = isDarkMode ? 'light' : 'dark';

    // Toggle the class on html element
    document.documentElement.classList.toggle('dark', !isDarkMode);

    // Update state and localStorage
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      className={`${className} relative p-2 rounded-full transition-all duration-300 overflow-hidden ${
        isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-blue-600'
      } ${isAnimating ? 'scale-110' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      data-testid="theme-toggle"
    >
      {/* Background animation */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isAnimating ? 'opacity-40' : 'opacity-0'
        } ${isDarkMode ? 'bg-yellow-300' : 'bg-blue-600'} rounded-full`}
      ></div>

      {isDarkMode ? (
        // Sun icon for dark mode (switch to light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 relative z-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for light mode (switch to dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 relative z-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
