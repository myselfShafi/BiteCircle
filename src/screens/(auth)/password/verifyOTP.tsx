import React, {Fragment, useCallback, useState} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, OtpInput} from '../../../components';
import {textConfig} from '../../../configs';
import {SCREEN_HEIGHT} from '../../../utils/constants';
import {storeSession} from '../../../utils/encryptStorage';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';

const VerifyOTP = ({
  addProgress,
  email = 'your account email',
}: {
  addProgress: () => void;
  email: string;
}) => {
  const theme = useTheme();
  const {loading, fetchData} = useCustomFetch();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(async (otp: string) => {
    const verifiedUser = await fetchData({
      method: 'POST',
      url: '/api/otp/verify-pwdOtp',
      data: {email, clientOtp: otp},
    });
    if (verifiedUser?.data.success) {
      setSuccess(true);
      await storeSession('tokens', {
        accessToken: verifiedUser?.data.data.accessToken,
      });
      setTimeout(() => {
        addProgress();
      }, 2000);
    }
  }, []);

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.resetPwdTitle}
      </BoldText>
      <BoldText
        variant="bodyMedium"
        style={[styles.title, {color: theme.colors.onBackground}]}
        children={`${textConfig.resetPwdSubTitle} ${email}`}
      />
      <OtpInput
        handleSubmit={handleSubmit}
        buttonText={success ? textConfig.verified : textConfig.verifyOtp}
        loading={loading}
        success={success}
        data={{email, action: 'PASS-RESET'}}
      />
    </Fragment>
  );
};

export default VerifyOTP;

interface Style {
  title: TextStyle;
  container: ViewStyle;
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
});
