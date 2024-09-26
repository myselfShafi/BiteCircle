import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, OtpInput} from '../../../components';
import {textConfig} from '../../../configs';
import {StackParamList} from '../../../navigation/navigator';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import {storeSession} from '../../../utils/encryptStorage';
import {useStatusBar} from '../../../utils/hooks';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';
import LogoWrapper from '../layout/logoWrapper';

export type verifyEmailProps = NativeStackScreenProps<
  StackParamList,
  'verifyEmail'
>;

const VerifyEmail = ({navigation, route}: verifyEmailProps) => {
  const theme = useTheme();
  useStatusBar('transparent', 'light-content', true);
  const {
    data: {email, fullName},
  } = route.params;

  const {loading, fetchData} = useCustomFetch();
  const [success, setSuccess] = useState<boolean>(false);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSubmit = useCallback(
    async (otp: string) => {
      const verifiedUser = await fetchData({
        method: 'POST',
        url: '/api/otp/verify-emailOtp',
        data: {email, clientOtp: otp},
      });
      if (verifiedUser?.data.success) {
        let userData = verifiedUser.data.data;
        setSuccess(true);
        await storeSession('tokens', {
          accessToken: userData.accessToken,
          refreshToken: userData.refreshToken,
        });
        setTimeout(() => {
          navigation.push('uploadAvatar', {data: userData.user});
        }, 2000);
      }
    },
    [fetchData, email, navigation],
  );

  return (
    <LogoWrapper handleBack={handleBack}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BoldText variant="titleLarge" style={styles.title}>
          {textConfig.verifyEmailTitle}
        </BoldText>
        <BoldText
          variant="bodyMedium"
          children={`🎉 Welcome aboard, ${
            fullName || 'Foodie'
          }!\n Let's get started! 🚀`}
          style={[styles.title, {color: theme.colors.primary}]}
        />
        <BoldText
          variant="bodyMedium"
          style={[styles.title, {color: theme.colors.onBackground}]}
          children={`${textConfig.verifyEmailSubTitle} ${
            textConfig.resetPwdSubTitle
          } ${email || 'your account email'} `}
        />
        <OtpInput
          buttonText={
            success ? textConfig.verified : textConfig.verifyEmailTitle
          }
          handleSubmit={handleSubmit}
          loading={loading}
          success={success}
          data={{email, action: 'VERIFY-EMAIL'}}
        />
      </ScrollView>
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
