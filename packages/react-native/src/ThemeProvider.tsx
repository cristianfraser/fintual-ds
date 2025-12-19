import React, { createContext, useContext, ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';
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
  initialMode,
  theme: customTheme 
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  
  // Determine the correct initial mode
  const getInitialMode = (): ColorMode => {
    if (initialMode) return initialMode;
    if (systemColorScheme === 'dark') return 'dark';
    if (systemColorScheme === 'light') return 'light';
    return 'light'; // Fallback if systemColorScheme is null
  };
  
  const [mode, setMode] = React.useState<ColorMode>(getInitialMode());
  const [userHasSetMode, setUserHasSetMode] = React.useState<boolean>(!!initialMode);
  
  // Sync with system color scheme changes
  // This handles cases where systemColorScheme becomes available after initial render
  // or when the system color scheme changes
  React.useEffect(() => {
    if (!userHasSetMode) {
      const targetMode: ColorMode = systemColorScheme === 'dark' ? 'dark' : 'light';
      setMode(prevMode => {
        // Update if system color scheme is available and different from current mode
        if (systemColorScheme !== null && prevMode !== targetMode) {
          return targetMode;
        }
        return prevMode;
      });
    }
  }, [systemColorScheme, userHasSetMode]);
  
  // Wrapper for setMode that tracks user interaction
  const handleSetMode = React.useCallback((newMode: ColorMode | ((prev: ColorMode) => ColorMode)) => {
    setUserHasSetMode(true);
    setMode(newMode);
  }, []);
  
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
    setMode: handleSetMode,
  }), [theme, handleSetMode]);

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

