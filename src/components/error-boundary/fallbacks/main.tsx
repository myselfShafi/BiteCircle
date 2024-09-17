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
import {SCREEN_WIDTH} from '../../../utils/constants';
import {useStatusBar} from '../../../utils/hooks';
import BoldText from '../../common/BoldText';
import CustomButton from '../../common/Button';
import MainView from '../../common/MainView';

const FallbackMain = () => {
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
          children={'Uh Oh..!'}
          style={{color: theme.colors.primary}}
        />
        <Image
          source={require('../../../assets/error.png')}
          style={styles.icon}
        />
      </View>
      <BoldText variant="headlineSmall" children={'Something Went Wrong'} />
      <View style={styles.wrapper}>
        <BoldText
          variant="bodyMedium"
          children={
            'Looks like we’re having some issues while trying to connect with our server.'
          }
          style={[styles.body, {color: theme.colors.onBackground}]}
        />
        <BoldText
          variant="bodyMedium"
          children={'Please try after some time. '}
          style={[styles.body, {color: theme.colors.onBackground}]}
        />
      </View>
      <CustomButton size="small" variant="bodyLarge" children={'Retry'} />
    </MainView>
  );
};

export default FallbackMain;

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
    rowGap: 15,
  },
  body: {
    textAlign: 'center',
    maxWidth: '75%',
  },
  icon: {
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_WIDTH / 1.5,
  },
});
