// Add this component to test theme switching
// You can place this in any page to verify the theme is working

'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeTest() {
  const { theme, toggleTheme } = useTheme();
  const [htmlClasses, setHtmlClasses] = useState<string>('');

  useEffect(() => {
    // Check what classes are actually on the HTML element
    const updateClasses = () => {
      setHtmlClasses(document.documentElement.className);
    };

    updateClasses();

    // Set up an observer to watch for class changes
    const observer = new MutationObserver(updateClasses);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-6 m-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Theme Test Component
      </h2>

      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          Current theme from context:{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">{theme}</span>
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          HTML classes:{' '}
          <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {htmlClasses}
          </span>
        </p>

        <button
          onClick={toggleTheme}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium"
        >
          Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            📦 This box should change color when you toggle the theme!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Light mode: Light gray background | Dark mode: Dark gray background
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
            Red themed box
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
            Green themed box
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
            Blue themed box
          </div>
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
            Yellow themed box
          </div>
        </div>
      </div>
    </div>
  );
}
