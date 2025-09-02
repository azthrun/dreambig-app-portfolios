import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored =
        typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null;
      if (stored === 'light' || stored === 'dark') return stored;
      if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
        return 'dark';
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
        return 'dark';
    } catch {}
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Add a temporary class to enable smooth theme transitions
    root.classList.add('theme-transition');
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    // Remove the transition class after the duration
    const timeout = window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 220);
    return () => window.clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
