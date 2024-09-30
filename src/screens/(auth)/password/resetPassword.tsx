import {Formik} from 'formik';
import React, {Fragment, useState} from 'react';
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
import {ResetPasswordInput} from '../../../configs/types';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import {resetSession} from '../../../utils/encryptStorage';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';
import {resetPasswordSchema} from '../../../utils/validationSchema';

const ResetPassword = ({addProgress}: {addProgress: () => void}) => {
  const theme = useTheme();
  const {fetchData, loading, error, handleError} = useCustomFetch();
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const handleSubmission = async (values: ResetPasswordInput) => {
    const result = await fetchData({
      method: 'POST',
      url: '/api/reset-pass',
      data: {newPassword: values.newPassword},
      authorize: true,
    });
    if (result?.data.success) {
      await resetSession().then(() => addProgress());
    }
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.setPwdTitle}
      </BoldText>
      <BoldText
        variant="bodyMedium"
        style={[styles.title, {color: theme.colors.onBackground}]}
        children={textConfig.setPwdSubTitle}
      />
      <Formik
        initialValues={{newPassword: '', cnfNewPassword: ''}}
        validationSchema={resetPasswordSchema}
        onSubmit={handleSubmission}>
        {({handleSubmit, handleChange, handleBlur, values, errors}) => (
          <>
            <InputBox
              placeholder={textConfig.placeholders.newPassword}
              textContentType="newPassword"
              secureTextEntry={!showPwd}
              autoCorrect={false}
              wrapperStyle={styles.gap}
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              errorText={errors.newPassword}
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
            <InputBox
              placeholder={textConfig.placeholders.cnfNewPassword}
              textContentType="newPassword"
              secureTextEntry={!showPwd}
              autoCorrect={false}
              value={values.cnfNewPassword}
              onChangeText={handleChange('cnfNewPassword')}
              onBlur={handleBlur('cnfNewPassword')}
              errorText={errors.cnfNewPassword}
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
              disabled={loading}
              loading={loading}
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

export default ResetPassword;

interface Style {
  title: TextStyle;
  container: ViewStyle;
  button: ViewStyle;
  gap: ViewStyle;
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
  gap: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    marginVertical: 20,
  },
});
