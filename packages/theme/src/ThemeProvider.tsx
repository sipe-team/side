import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { type ColorTheme, vars } from '@sipe-team/tokens';

interface ThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
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
  children?: React.ReactNode;
  theme?: ColorTheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: initialTheme = 'dark' }) => {
  const [theme, setTheme] = useState<ColorTheme>(initialTheme);

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

  return (
    <ThemeContext.Provider value={contextValue}>
      <div data-theme={theme} style={{ display: 'contents' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const theme = vars;
