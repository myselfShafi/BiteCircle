import React, {Fragment, RefObject, useEffect, useRef} from 'react';
import {StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, CustomButton, OtpInput} from '../../../components';
import {textConfig} from '../../../configs';
import {SCREEN_HEIGHT} from '../../../utils/constants';

let email = 'test@gmail.com';

const VerifyOTP = ({addProgress}: {addProgress: () => void}) => {
  const theme = useTheme();

  const inputRefs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleSubmit = () => {
    addProgress();
  };

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
      <OtpInput handleSubmit={handleSubmit} buttonText={textConfig.verifyOtp} />
      <CustomButton mode="text" children={textConfig.resendOtp} size="small" />
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
