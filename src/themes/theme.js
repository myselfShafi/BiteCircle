// theme.js
import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {darkPalette, lightPalette} from './palette';

export const useAppTheme = () => {
  const colorScheme = useColorScheme();

  const theme =
    colorScheme === 'dark'
      ? {
          ...MD3DarkTheme,
          colors: darkPalette,
        }
      : {
          ...MD3LightTheme,
          colors: lightPalette,
        };

  return theme;
};
