import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, createTheme, ColorMode } from '@fintual/design-system-core';

interface ThemeContextValue {
  theme: Theme;
  setMode: React.Dispatch<React.SetStateAction<ColorMode>>;

}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ColorMode;
  theme?: Theme;
}

export function ThemeProvider({ 
  children, 
  initialMode = 'light',
  theme: customTheme 
}: ThemeProviderProps) {
  const [mode, setMode] = React.useState<ColorMode>(initialMode);
  
  const theme = React.useMemo(() => {
    if (customTheme) {
      return customTheme;
    }
    return createTheme(mode);
  }, [customTheme, mode]);

  const value = React.useMemo(() => ({
    theme,
    setMode,
  }), [theme, setMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

