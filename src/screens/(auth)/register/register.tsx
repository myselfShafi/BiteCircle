import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
import {Image, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Divider, TextInput} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  BoldText,
  CustomButton,
  CustomSnackbar,
  InputBox,
} from '../../../components';
import {textConfig} from '../../../configs';
import {RegisterInput, User} from '../../../configs/types';
import {useAppDispatch} from '../../../store/hooks';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';
import {RegisterSchema} from '../../../utils/validationSchema';
import {AuthProps} from '../welcome';

type SignupProps = Omit<AuthProps, 'route'> & {
  goLogin: () => void;
};

const Register = ({goLogin, navigation}: SignupProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {loading, error, handleError, fetchData} = useCustomFetch();
  const [showPwd, setShowPwd] = useState<boolean>(false);
  let initialValues = {fullName: '', email: '', password: ''};

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const handleSignup = async (values: RegisterInput) => {
    const result = await fetchData({
      method: 'POST',
      url: 'api/users/signup',
      data: {
        fullName: values.fullName,
        email: values.email,
        passwordHash: values.password,
      },
    });
    if (result?.data.success) {
      let userData: User = result.data.data;
      navigation.push('verifyEmail', {
        data: {
          fullName: userData.fullName,
          email: userData.email,
        },
      });
    }
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
              wrapperStyle={styles.gap}
              disabled={loading}
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
              wrapperStyle={styles.gap}
              disabled={loading}
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
              wrapperStyle={styles.gap}
              disabled={loading}
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
              loading={loading}
              disabled={loading}
              onPress={() => handleSubmit()}>
              {textConfig.signup}
            </CustomButton>
          </>
        )}
      </Formik>
      <View style={styles.divider}>
        <Divider style={{flex: 1}} horizontalInset />
        <BoldText variant="bodyMedium">or</BoldText>
        <Divider style={{flex: 1}} horizontalInset />
      </View>
      <CustomButton
        variant="titleMedium"
        mode="outlined"
        size="large"
        style={[styles.button, styles.gap]}
        disabled={loading}
        icon={
          <Image
            source={require('../../../assets/google.png')}
            style={{width: 25, height: 25}}
          />
        }>
        {textConfig.googleSignup}
      </CustomButton>
      <CustomButton
        mode="text"
        children={textConfig.goLogin}
        size="small"
        disabled={loading}
        onPress={goLogin}
      />
      <CustomSnackbar
        variant="error"
        visible={error.status}
        onDismiss={handleError}
        onIconPress={handleError}
        children={error.message}
      />
    </Fragment>
  );
};

export default Register;

interface Style {
  title: TextStyle;
  button: ViewStyle;
  gap: ViewStyle;
  divider: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  gap: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
  },
  divider: {flexDirection: 'row', alignItems: 'center', marginVertical: 20},
});
