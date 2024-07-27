// theme.js
import {useColorScheme} from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {darkPalette, lightPalette} from './palette';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';

const customLightTheme = {...MD3LightTheme, colors: lightPalette};
const customDarkTheme = {...MD3DarkTheme, colors: darkPalette};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export const useAppTheme = () => {
  const colorScheme = useColorScheme();

  const theme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return theme;
};
