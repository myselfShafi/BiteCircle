import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, MainView} from '../components';
import {SCREEN_WIDTH} from '../utils/constants';
import {useStatusBar} from '../utils/hooks';

const NoConnection = () => {
  const theme = useTheme();
  useStatusBar(
    theme.colors.elevation.level2,
    theme.dark === true ? 'light-content' : 'dark-content',
  );

  return (
    <MainView
      style={[
        styles.container,
        {backgroundColor: theme.colors.elevation.level2},
      ]}>
      <View style={styles.wrapper}>
        <BoldText
          variant="displayMedium"
          children={'Whoops !!'}
          style={{color: theme.colors.primary}}
        />
        <BoldText
          variant="headlineSmall"
          children={'No Internet Connection :('}
        />
      </View>
      <Image source={require('../assets/network.png')} style={styles.icon} />
      <View style={styles.wrapper}>
        <BoldText
          variant="titleMedium"
          children={'Please check your internet settings, or connect to Wi-Fi'}
          style={[styles.body, {color: theme.colors.onBackground}]}
        />
        <BoldText
          variant="titleMedium"
          children={'Please check and try again.'}
          style={[styles.body, {color: theme.colors.onBackground}]}
        />
      </View>
    </MainView>
  );
};

export default NoConnection;

interface Style {
  container: ViewStyle;
  wrapper: ViewStyle;
  body: TextStyle;
  icon: ImageStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 50,
  },
  wrapper: {
    alignItems: 'center',
    rowGap: 20,
  },
  body: {
    textAlign: 'center',
    maxWidth: '75%',
  },
  icon: {
    width: SCREEN_WIDTH / 1.75,
    height: SCREEN_WIDTH / 1.75,
  },
});
