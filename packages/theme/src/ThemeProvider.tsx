import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { type ThemeColor, themeColor, vars } from '@sipe-team/tokens';

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
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
  theme?: ThemeColor;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: initialTheme = themeColor['4th'] }) => {
  const [theme, setTheme] = useState<ThemeColor>(initialTheme);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    if (containerRef.current) {
      // Apply theme colors as CSS variables
      Object.entries(theme).forEach(([key, value]) => {
        containerRef.current?.style.setProperty(`--side-color-${key}`, value);
      });
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
      <div ref={containerRef} style={{ display: 'contents' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const theme = vars;
