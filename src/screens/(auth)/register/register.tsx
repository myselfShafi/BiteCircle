import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
import {Image, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Divider, TextInput} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, CustomButton, InputBox} from '../../../components';
import {textConfig} from '../../../configs';
import {RegisterInput} from '../../../configs/types';
import {RegisterSchema} from '../../../utils/validationSchema';
import {AuthProps} from '../welcome';

type SignupProps = Omit<AuthProps, 'route'> & {
  goLogin: () => void;
};

const Register = ({goLogin, navigation}: SignupProps): JSX.Element => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  let initialValues = {fullName: '', email: '', password: ''};

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const handleSignup = (values: RegisterInput) => {
    console.log({values});
    navigation.push('verifyEmail');
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.signupTitle}
      </BoldText>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSignup}>
        {({handleSubmit, handleChange, handleBlur, values, errors}) => (
          <>
            <InputBox
              placeholder={textConfig.placeholders.fullName}
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              errorText={errors.fullName}
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
              variant="titleMedium"
              size="large"
              style={styles.button}
              onPress={() => handleSubmit()}>
              {textConfig.signup}
            </CustomButton>
          </>
        )}
      </Formik>
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
      <CustomButton
        mode="text"
        children={textConfig.goLogin}
        size="small"
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
