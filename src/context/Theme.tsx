import {NavigationContainer} from '@react-navigation/native';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {customPaletteType, darkPalette, lightPalette} from '../themes/palette';

const customLightTheme = {
  ...NavigationDefaultTheme,
  ...MD3LightTheme,
  colors: lightPalette,
};
const customDarkTheme = {
  ...NavigationDarkTheme,
  ...MD3DarkTheme,
  colors: darkPalette,
};

type ThemeContextProps = {
  theme: NavigationTheme & ThemeProp & {colors: customPaletteType};
  toggleTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: customLightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const useAppTheme = () => useContext(ThemeContext);

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const colorScheme = useColorScheme();

  const [isDark, setIsDark] = useState<boolean>(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [isDark]);

  const theme = useMemo(
    () => (isDark ? customDarkTheme : customLightTheme),
    [colorScheme, isDark],
  );

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isDark,
      theme,
    }),
    [toggleTheme, isDark],
  );

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <ThemeContext.Provider value={preferences}>
          {children}
        </ThemeContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default ThemeContextProvider;
