import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';

const CustomStatusBar = ({routeName}: {routeName?: string}) => {
  const theme = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(
    theme.colors.background,
  );

  useEffect(() => {
    let bgColor;
    switch (routeName) {
      case 'chatTab':
        bgColor = theme.colors.elevation.level2;
        break;

      default:
        bgColor = theme.colors.background;
        break;
    }
    setBackgroundColor(bgColor);
  }, [routeName]);

  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={theme.dark ? 'light-content' : 'dark-content'}
      animated
    />
  );
};

export default CustomStatusBar;
