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
        <span className="material-symbols-outlined text-[20px] leading-none">dark_mode</span>
      ) : (
        <span className="material-symbols-outlined text-[20px] leading-none">light_mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;
