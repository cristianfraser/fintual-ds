import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, createTheme, ColorMode } from '@fintual/design-system-core';

interface ThemeContextValue {
  theme: Theme;
  setMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  mode?: ColorMode;
  theme?: Theme;
}

export function ThemeProvider({ 
  children, 
  mode = 'light',
  theme: customTheme 
}: ThemeProviderProps) {
  const [currentMode, setCurrentMode] = React.useState<ColorMode>(mode);
  const theme = React.useMemo(() => {
    if (customTheme) {
      return customTheme;
    }
    return createTheme(currentMode);
  }, [customTheme, currentMode]);

  const setMode = React.useCallback((newMode: ColorMode) => {
    setCurrentMode(newMode);
  }, []);

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

