import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, CustomButton, InputBox} from '../../../components';
import {textConfig} from '../../../configs';
import {LoginSchema} from '../../../utils/validationSchema';
import {AuthProps} from '../welcome';

const Login = ({navigation}: Omit<AuthProps, 'route'>): JSX.Element => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const goToForgotPwd = () => {
    navigation.push('forgotPwd');
  };

  const handleLogin = (value: any) => {
    // navigation.reset({index: 0, routes: [{name: 'app'}]});
    console.log({value});
    setErr(true);
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.loginTitle}
      </BoldText>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <>
            <InputBox
              placeholder={textConfig.placeholders.email}
              textContentType="emailAddress"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorText={errors.email}
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
              textContentType="password"
              secureTextEntry={!showPwd}
              autoCorrect={false}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorText={errors.password}
              left={
                <TextInput.Icon
                  icon={({size, color}) => (
                    <IonIcon
                      name={
                        showPwd ? 'lock-open-outline' : 'lock-closed-outline'
                      }
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
              mode="text"
              children={textConfig.forgotPwd}
              size="small"
              onPress={goToForgotPwd}
            />
            <CustomButton
              variant="titleMedium"
              size="large"
              style={styles.button}
              onPress={() => handleSubmit()}>
              {textConfig.login}
            </CustomButton>
          </>
        )}
      </Formik>
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
