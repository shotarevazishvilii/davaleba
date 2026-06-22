'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
        <div className="min-h-screen bg-zinc-900 text-white">{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={
          theme === 'light'
            ? 'min-h-screen bg-white text-black'
            : 'min-h-screen bg-zinc-900 text-white'
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
