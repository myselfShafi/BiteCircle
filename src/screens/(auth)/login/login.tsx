import React, {Fragment, useState} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, CustomButton, InputBox} from '../../../components';
import {textConfig} from '../../../configs';
import {AuthProps} from '../welcome';

const Login = ({navigation}: Omit<AuthProps, 'route'>): JSX.Element => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const handleLogin = () => {
    navigation.navigate('app');
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.loginTitle}
      </BoldText>
      <InputBox
        placeholder={'Email'}
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
        placeholder={'Password'}
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
      <Button
        mode="text"
        textColor={theme.colors.secondary}
        children={textConfig.forgotPwd}
      />
      <CustomButton
        variant="titleMedium"
        size="large"
        style={styles.button}
        onPress={handleLogin}>
        {textConfig.login}
      </CustomButton>
    </Fragment>
  );
};

export default Login;

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
