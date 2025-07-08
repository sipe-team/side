import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { vars } from '@sipe-team/tokens';

export type ThemeName = '1st' | '2nd' | '3rd' | '4th';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: initialTheme = '4th' }) => {
  const [theme, setTheme] = useState<ThemeName>(initialTheme);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div ref={containerRef} data-theme={theme} style={{ display: 'contents' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const theme = vars;
