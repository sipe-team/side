import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { type ThemeColor, themeColor, vars } from '@sipe-team/tokens';

import { assignInlineVars } from '@vanilla-extract/dynamic';

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

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  const themeVars = assignInlineVars(vars.color, theme);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={{ ...themeVars, display: 'contents' }}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const theme = vars;
