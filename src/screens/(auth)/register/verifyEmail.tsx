import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  BoldText,
  CustomButton,
  CustomSnackbar,
  OtpInput,
} from '../../../components';
import {textConfig} from '../../../configs';
import {AuthInitialState} from '../../../configs/types';
import {StackParamList} from '../../../navigation/navigator';
import {useAppSelector} from '../../../store/hooks';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import {useStatusBar} from '../../../utils/hooks';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';
import LogoWrapper from '../layout/logoWrapper';

export type verifyEmailProps = NativeStackScreenProps<
  StackParamList,
  'verifyEmail'
>;

const VerifyEmail = ({navigation}: verifyEmailProps) => {
  const theme = useTheme();
  const {loading, error, handleError, fetchData} = useCustomFetch();
  const [success, setSuccess] = useState<boolean>(false);
  const {data: storeData}: {data: AuthInitialState['data']} = useAppSelector(
    state => state.auth,
  );
  useStatusBar('transparent', 'light-content', true);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSubmit = async (otp: string) => {
    const verified = await fetchData({
      method: 'POST',
      url: '/api/otp/verify-otp',
      data: {
        email: storeData?.email,
        clientOtp: otp,
      },
    });
    if (verified?.data.success) {
      setSuccess(true);
      setTimeout(() => {
        navigation.push('uploadAvatar');
      }, 2000);
    }
  };
  return (
    <LogoWrapper handleBack={handleBack}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BoldText variant="titleLarge" style={styles.title}>
          {textConfig.verifyEmailTitle}
        </BoldText>
        <BoldText
          variant="bodyMedium"
          children={`🎉 Welcome aboard, ${
            storeData?.fullName || 'Foodie'
          }!\n Let's get started! 🚀`}
          style={[styles.title, {color: theme.colors.primary}]}
        />
        <BoldText
          variant="bodyMedium"
          style={[styles.title, {color: theme.colors.onBackground}]}
          children={`${textConfig.verifyEmailSubTitle} ${
            textConfig.resetPwdSubTitle
          } ${storeData?.email || 'your account email'} `}
        />
        <OtpInput
          buttonText={
            success ? textConfig.verified : textConfig.verifyEmailTitle
          }
          success={success}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        {!success && (
          <CustomButton
            mode="text"
            children={textConfig.resendOtp}
            disabled={loading}
            size="small"
          />
        )}
      </ScrollView>
      <CustomSnackbar
        variant="error"
        visible={error.status}
        onDismiss={handleError}
        onIconPress={handleError}
        children={error.message}
      />
    </LogoWrapper>
  );
};

export default VerifyEmail;

interface Style {
  container: ViewStyle;
  title: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    padding: 35,
    height: SCREEN_HEIGHT / 2.5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
