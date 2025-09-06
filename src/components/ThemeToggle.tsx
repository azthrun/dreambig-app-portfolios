import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          focusable="false"
        >
          <path d="M20 12.41A8 8 0 1 1 11.59 4 7 7 0 0 0 20 12.41z" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          focusable="false"
        >
          <path d="M6.76 4.84 5.34 3.42 3.92 4.84l1.42 1.42 1.42-1.42zm10.48 0 1.42-1.42 1.42 1.42-1.42 1.42-1.42-1.42zM12 2h0v2h0V2zm0 18h0v2h0v-2zM4 12H2v0h2v0zm18 0h-2v0h2v0zM6.76 19.16 5.34 20.58 3.92 19.16l1.42-1.42 1.42 1.42zM19.16 17.74l1.42 1.42-1.42 1.42-1.42-1.42 1.42-1.42zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
