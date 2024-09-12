import React, {Fragment, useState} from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoldText, CustomButton, IconBtn, MainView} from '../../components';
import {textConfig} from '../../configs';
import {useAppTheme} from '../../context/Theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/constants';
import Login from './login/login';
import Register from './register/register';

const Welcome = (): JSX.Element => {
  const {theme} = useAppTheme();

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const showAuth = showLogin || showSignup;

  const handleBack = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <MainView>
      <ImageBackground
        source={require('../../assets/welcome1.webp')}
        resizeMode="cover"
        style={styles.image}>
        {showAuth && (
          <IconBtn
            name={'return-up-back'}
            onPress={handleBack}
            style={styles.back}
          />
        )}
        <LinearGradient
          colors={['transparent', 'transparent', theme.colors.background]}
          style={styles.logoWrapper}>
          <Image
            source={require('../../assets/bg_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          {!showAuth && (
            <BoldText variant="titleSmall" style={styles.tagline}>
              {textConfig.tagline}
            </BoldText>
          )}
        </LinearGradient>
      </ImageBackground>
      <View
        style={[
          styles.container,
          showLogin
            ? styles.loginWrapper
            : showSignup
            ? styles.signupWrapper
            : styles.wrapper,
        ]}>
        {!showAuth && (
          <Fragment>
            <CustomButton
              variant="titleMedium"
              size="large"
              style={styles.button}
              onPress={() => setShowSignup(true)}>
              {textConfig.signup}
            </CustomButton>
            <CustomButton
              mode="outlined"
              variant="titleMedium"
              size="large"
              style={styles.button}
              onPress={() => setShowLogin(true)}>
              {textConfig.login}
            </CustomButton>
          </Fragment>
        )}
        {showLogin && <Login />}
        {showSignup && <Register />}
      </View>
    </MainView>
  );
};

export default Welcome;

interface Style {
  logoWrapper: ViewStyle;
  back: ViewStyle;
  image: ImageStyle;
  logo: ImageStyle;
  container: ViewStyle;
  wrapper: ViewStyle;
  loginWrapper: ViewStyle;
  signupWrapper: ViewStyle;
  tagline: TextStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: 15,
  },
  image: {
    flex: 1,
  },
  logo: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
  },
  container: {
    padding: 35,
    rowGap: 20,
  },
  wrapper: {
    height: (SCREEN_HEIGHT * 1) / 3,
  },
  loginWrapper: {
    height: (SCREEN_HEIGHT * 2) / 3,
  },
  signupWrapper: {
    height: (SCREEN_HEIGHT * 3) / 4,
  },
  tagline: {
    width: SCREEN_WIDTH / 1.75,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    borderRadius: 20,
  },
});
