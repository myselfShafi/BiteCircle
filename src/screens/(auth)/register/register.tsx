import React, {Fragment, useState} from 'react';
import {Image, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Button, Divider, TextInput, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, CustomButton, InputBox} from '../../../components';
import {textConfig} from '../../../configs';
import {AuthProps} from '../welcome';

type SignupProps = Omit<AuthProps, 'route'> & {
  goLogin: () => void;
};

const Register = ({goLogin, navigation}: SignupProps): JSX.Element => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const handleSignup = () => {
    navigation.push('verifyEmail');
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.signupTitle}
      </BoldText>
      <InputBox
        placeholder={textConfig.placeholders.fullName}
        left={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon name="person-outline" size={size} color={color} />
            )}
            size={20}
            disabled
            aria-disabled
          />
        }
      />
      <InputBox
        placeholder={textConfig.placeholders.email}
        keyboardType="email-address"
        left={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon name="mail-outline" size={size} color={color} />
            )}
            size={20}
            disabled
            aria-disabled
          />
        }
      />
      <InputBox
        placeholder={textConfig.placeholders.password}
        secureTextEntry={!showPwd}
        autoCorrect={false}
        left={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon
                name={showPwd ? 'lock-open-outline' : 'lock-closed-outline'}
                size={size}
                color={color}
              />
            )}
            size={20}
            disabled
            aria-disabled
          />
        }
        right={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon
                name={showPwd ? 'eye-outline' : 'eye-off-outline'}
                size={size}
                color={color}
              />
            )}
            size={20}
            onPress={togglePwd}
          />
        }
      />
      <CustomButton
        variant="titleMedium"
        size="large"
        style={styles.button}
        onPress={handleSignup}>
        {textConfig.signup}
      </CustomButton>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Divider style={{flex: 1}} horizontalInset />
        <BoldText variant="bodyMedium">or</BoldText>
        <Divider style={{flex: 1}} horizontalInset />
      </View>
      <CustomButton
        variant="titleMedium"
        mode="outlined"
        size="large"
        icon={
          <Image
            source={require('../../../assets/google.png')}
            style={{width: 25, height: 25}}
          />
        }
        style={styles.button}>
        {textConfig.googleSignup}
      </CustomButton>
      <Button
        mode="text"
        children={textConfig.goLogin}
        textColor={theme.colors.secondary}
        rippleColor={'transparent'}
        onPress={goLogin}
      />
    </Fragment>
  );
};

export default Register;

interface Style {
  title: TextStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
  },
});
