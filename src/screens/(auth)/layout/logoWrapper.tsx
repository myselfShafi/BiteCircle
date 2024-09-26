import React, {memo} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {IconBtn, MainView} from '../../../components';
import {SCREEN_WIDTH} from '../../../utils/constants';

type LogoWrapperProps = ViewProps & {handleBack: () => void; hideNav: boolean};

const LogoWrapper = memo(
  ({handleBack, hideNav, children}: LogoWrapperProps) => {
    const theme = useTheme();

    return (
      <MainView>
        <MainView
          style={[
            styles.logoWrapper,
            {backgroundColor: theme.colors.onSecondaryContainer},
          ]}>
          <Image
            source={require('../../../assets/bg_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </MainView>
        {!hideNav && (
          <IconBtn
            name={'return-up-back'}
            onPress={handleBack}
            style={styles.back}
          />
        )}
        {children}
      </MainView>
    );
  },
);

export default LogoWrapper;

interface Style {
  back: ViewStyle;
  logo: ImageStyle;
  logoWrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  back: {
    position: 'absolute',
    zIndex: 10,
    top: 40,
    left: 15,
  },
  logo: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
});
