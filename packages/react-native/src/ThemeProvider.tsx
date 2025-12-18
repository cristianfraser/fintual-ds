import React, { createContext, useContext, ReactNode } from 'react';
import { Platform } from 'react-native';
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
    const baseTheme = customTheme || createTheme(mode);
    
    // Override font families for React Native compatibility
    // React Native doesn't support CSS font stacks like web does
    // Use empty string to let React Native use the default system font
    // The Text/Heading components will only apply fontFamily if it's a non-empty string
    return {
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontFamily: {
          base: '', // Empty string = use default system font in React Native
          mono: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        },
      },
    };
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

