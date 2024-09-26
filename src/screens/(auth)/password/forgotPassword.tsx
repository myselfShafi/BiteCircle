import {Formik} from 'formik';
import React, {Fragment} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  BoldText,
  CustomButton,
  CustomSnackbar,
  InputBox,
} from '../../../components';
import {textConfig} from '../../../configs';
import {EmailInput} from '../../../configs/types';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';
import {EmailSchema} from '../../../utils/validationSchema';

const ForgotPassword = ({
  addProgress,
  setEmail,
}: {
  addProgress: () => void;
  setEmail: (email: string) => void;
}) => {
  const {loading, error, handleError, fetchData} = useCustomFetch();
  const theme = useTheme();

  const handleEmail = async (values: EmailInput) => {
    const sendOtp = await fetchData({
      method: 'POST',
      url: 'api/otp/send-emailOtp',
      data: {email: values.email, action: 'PASS-RESET'},
    });
    if (sendOtp?.data.success) {
      setEmail(values.email);
      addProgress();
    }
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.forgotPwdTitle}
      </BoldText>
      <BoldText
        variant="bodyMedium"
        style={[styles.title, {color: theme.colors.onBackground}]}
        children={textConfig.forgotPwdSubTitle}
      />
      <Formik
        initialValues={{email: ''}}
        validationSchema={EmailSchema}
        onSubmit={handleEmail}>
        {({handleSubmit, handleChange, handleBlur, values, errors}) => (
          <>
            <InputBox
              placeholder={'Email'}
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorText={errors.email}
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
            <CustomButton
              variant="titleMedium"
              size="large"
              style={styles.button}
              loading={loading}
              disabled={loading}
              onPress={() => handleSubmit()}>
              {textConfig.submit}
            </CustomButton>
          </>
        )}
      </Formik>
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

export default ForgotPassword;

interface Style {
  title: TextStyle;
  container: ViewStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    height: SCREEN_HEIGHT / 2.5,
    padding: 35,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    marginVertical: 20,
  },
});
