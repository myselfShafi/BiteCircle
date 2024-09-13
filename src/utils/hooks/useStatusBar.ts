import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {useAppTheme} from '../../context/Theme';

const useStatusBar = (
  backgroundColor: StatusBarProps['backgroundColor'],
  barStyle?: StatusBarProps['barStyle'],
  translucent: StatusBarProps['translucent'] = false,
  animated: StatusBarProps['animated'] = true,
) => {
  const isFocused = useIsFocused();
  const {theme} = useAppTheme();

  useEffect(() => {
    backgroundColor && StatusBar.setBackgroundColor(backgroundColor, animated);
    barStyle && StatusBar.setBarStyle(barStyle);
    translucent && StatusBar.setTranslucent(translucent);

    return () => {
      StatusBar.setBackgroundColor(theme.colors.background, animated);
      StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
      StatusBar.setTranslucent(false);
    };
  }, [isFocused, theme]);
};

export default useStatusBar;
