import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';

export type customPaletteType = NavigationTheme['colors'] &
  ThemeProp['colors'] & {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
    surfaceDisabled: string;
    onSurfaceDisabled: string;
    backdrop: string;
  };

export const lightPalette: customPaletteType = {
  ...NavigationDefaultTheme.colors,
  ...MD3LightTheme.colors,
  primary: 'rgba(230, 126, 34, 1)',
  onPrimary: 'rgba(255, 255, 255, 1)',
  primaryContainer: 'rgba(253, 220, 178, 1)',
  onPrimaryContainer: 'rgba(85, 37, 0, 1)',
  secondary: 'rgba(116, 150, 81, 1)',
  onSecondary: 'rgba(255, 255, 255, 1)',
  secondaryContainer: 'rgba(193, 211, 172, 1)',
  onSecondaryContainer: 'rgba(51, 67, 33, 1)',
  tertiary: 'rgba(155, 89, 182, 1)',
  onTertiary: 'rgba(255, 255, 255, 1)',
  tertiaryContainer: 'rgba(218, 177, 255, 1)',
  onTertiaryContainer: 'rgba(67, 29, 106, 1)',
  error: 'rgba(176, 0, 32, 1)',
  onError: 'rgba(255, 243, 240, 1)',
  errorContainer: 'rgba(255, 225, 225, 1)',
  onErrorContainer: 'rgba(130, 30, 20, 1)',
  background: 'rgba(250, 250, 240, 1)',
  onBackground: 'rgba(52, 52, 52, 1)',
  surface: 'rgba(255, 255, 255, 1)',
  onSurface: 'rgba(52, 52, 52, 1)',
  surfaceVariant: 'rgba(242, 242, 232, 1)',
  onSurfaceVariant: 'rgba(102, 72, 45, 1)',
  outline: 'rgba(189, 189, 189, 1)',
  outlineVariant: 'rgba(224, 224, 224, 1)',
  shadow: 'rgba(0, 0, 0, 0.2)',
  scrim: 'rgba(0, 0, 0, 0.4)',
  inverseSurface: 'rgba(60, 60, 60, 1)',
  inverseOnSurface: 'rgba(255, 255, 255, 1)',
  inversePrimary: 'rgba(235, 147, 86, 1)',
  elevation: {
    level0: 'rgba(235, 235, 210, 1)',
    level1: 'rgba(245, 245, 230, 1)',
    level2: 'rgba(240, 240, 220, 1)',
    level3: 'rgba(235, 235, 210, 1)',
    level4: 'rgba(230, 230, 200, 1)',
    level5: 'rgba(225, 225, 190, 1)',
  },
  surfaceDisabled: 'rgba(245, 245, 245, 1)',
  onSurfaceDisabled: 'rgba(189, 189, 189, 1)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

export const darkPalette: customPaletteType = {
  ...NavigationDarkTheme.colors,
  ...MD3DarkTheme.colors,
  primary: 'rgba(230, 126, 34, 1)',
  onPrimary: 'rgba(255, 255, 255, 1)',
  primaryContainer: 'rgba(253, 220, 178, 1)',
  onPrimaryContainer: 'rgba(85, 37, 0, 1)',
  secondary: 'rgba(116, 150, 81, 1)',
  onSecondary: 'rgba(255, 255, 255, 1)',
  secondaryContainer: 'rgba(193, 211, 172, 1)',
  onSecondaryContainer: 'rgba(51, 67, 33, 1)',
  tertiary: 'rgba(155, 89, 182, 1)',
  onTertiary: 'rgba(255, 255, 255, 1)',
  tertiaryContainer: 'rgba(218, 177, 255, 1)',
  onTertiaryContainer: 'rgba(67, 29, 106, 1)',
  error: 'rgba(176, 0, 32, 1)',
  onError: 'rgba(255, 243, 240, 1)',
  errorContainer: 'rgba(255, 225, 225, 1)',
  onErrorContainer: 'rgba(130, 30, 20, 1)',
  background: 'rgb(32, 26, 24)',
  onBackground: 'rgb(237, 224, 221)',
  surface: 'rgba(45, 45, 45, 1)',
  onSurface: 'rgba(255, 255, 255, 1)',
  surfaceVariant: 'rgba(65, 65, 65, 1)',
  onSurfaceVariant: 'rgba(255, 255, 255, 1)',
  outline: 'rgba(189, 189, 189, 1)',
  outlineVariant: 'rgba(224, 224, 224, 1)',
  shadow: 'rgba(0, 0, 0, 0.4)',
  scrim: 'rgba(0, 0, 0, 0.5)',
  inverseSurface: 'rgba(255, 255, 255, 1)',
  inverseOnSurface: 'rgba(30, 30, 30, 1)',
  inversePrimary: 'rgba(255, 183, 77, 1)',
  elevation: {
    level0: 'rgb(83, 67, 63)',
    level1: 'rgb(43, 34, 31)',
    level2: 'rgb(50, 38, 35)',
    level3: 'rgb(57, 43, 39)',
    level4: 'rgb(59, 45, 40)',
    level5: 'rgb(63, 48, 43)',
  },
  surfaceDisabled: 'rgba(80, 80, 80, 1)',
  onSurfaceDisabled: 'rgba(189, 189, 189, 1)',
  backdrop: 'rgba(59, 45, 41, 0.4)',
};
