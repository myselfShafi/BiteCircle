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
import {useAppTheme} from '../../context/Theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/constants';
import Login from './login/login';
import Register from './register/register';

const Welcome = (): JSX.Element => {
  const {theme} = useAppTheme();

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const handleBack = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const showAuth = showLogin || showSignup;

  return (
    <MainView>
      <ImageBackground
        source={require('../../assets/welcome1.webp')}
        resizeMode="cover"
        style={styles.image}>
        {showAuth && <IconBtn name={'return-up-back'} onPress={handleBack} />}
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0)',
            theme.colors.background,
          ]}
          style={styles.logoWrapper}>
          <Image
            source={require('../../assets/bg_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          {!showAuth && (
            <BoldText variant="titleSmall" style={styles.tagline}>
              Share Your Culinary Adventures and Explore New Flavors from a
              Community that Celebrates the Love of Food!
            </BoldText>
          )}
        </LinearGradient>
      </ImageBackground>
      <View
        style={[
          styles.container,
          showAuth ? styles.authWrapper : styles.wrapper,
        ]}>
        {!showAuth && (
          <Fragment>
            <CustomButton
              variant="titleMedium"
              size="large"
              onPress={() => setShowSignup(true)}>
              Sign Up
            </CustomButton>
            <CustomButton
              mode="outlined"
              variant="titleMedium"
              size="large"
              onPress={() => setShowLogin(true)}>
              Log In
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
  image: ImageStyle;
  logo: ImageStyle;
  container: ViewStyle;
  wrapper: ViewStyle;
  authWrapper: ViewStyle;
  tagline: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  authWrapper: {
    height: (SCREEN_HEIGHT * 2) / 3,
  },
  tagline: {
    width: SCREEN_WIDTH / 1.75,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
