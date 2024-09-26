import React, {
  Fragment,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {textConfig} from '../../configs';
import useCustomFetch from '../../utils/hooks/useCustomFetch';
import InputBox from '../inputBlock';
import BoldText from './BoldText';
import CustomButton from './Button';
import CustomSnackbar from './Snackbar';

type OtpInputProps = {
  handleSubmit: (otp: string) => void;
  buttonText?: string;
  loading?: boolean;
  success?: boolean;
  data: {email: string; action: 'VERIFY-EMAIL' | 'PASS-RESET'};
};

const OtpInput = ({
  handleSubmit,
  buttonText = textConfig.submit,
  loading,
  success,
  data,
}: OtpInputProps) => {
  const theme = useTheme();

  const {error, handleError, fetchData} = useCustomFetch();
  const [resent, setResent] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60);
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [err, setErr] = useState<boolean>(false);

  const inputRefs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (text: string, idx: number) => {
    setErr(false);
    if (text.length > 1) {
      const newCodes = text.split('');
      setCode(newCodes);
      inputRefs[3]!.current?.focus();
      return;
    }
    const newCodes = [...code];
    newCodes[idx] = text;
    setCode(newCodes);
    if (text !== '' && idx < 3) {
      inputRefs[idx + 1]!.current?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number,
  ) => {
    let key = e.nativeEvent.key;
    if (key === 'Backspace' && idx > 0) {
      handleChange('', idx);
      inputRefs[idx - 1].current?.focus();
    }
  };

  const validateSubmit = () => {
    if (code.some(field => field.trim() === '')) {
      setErr(true);
      return;
    }
    setErr(false);
    let otp = code.join('');
    handleSubmit(otp);
  };

  const HandleResend = useCallback(async () => {
    const resendOtp = await fetchData({
      method: 'POST',
      url: 'api/otp/send-emailOtp',
      data,
    });
    if (resendOtp?.data.success) {
      setResent(true);
      let counter = setInterval(() => {
        setCount(prevCount => {
          if (prevCount <= 0) {
            clearInterval(counter);
            setResent(false);
            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
      setCount(60);
    }
  }, [fetchData]);

  return (
    <Fragment>
      <View style={styles.wrapper}>
        {code.map((field: string, index: number) => (
          <InputBox
            key={index}
            ref={inputRefs[index]}
            keyboardType="numeric"
            returnKeyType="next"
            textContentType="oneTimeCode"
            maxLength={index === 0 ? code.length : 1}
            contentStyle={styles.input}
            errorStyle={styles.error}
            disabled={loading || success}
            value={field}
            errorText={err ? '!' : ''}
            onChangeText={(text: string) => handleChange(text, index)}
            onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
              handleKeyPress(e, index)
            }
          />
        ))}
      </View>
      <CustomButton
        variant="titleMedium"
        size="large"
        style={styles.button}
        loading={loading}
        disabled={loading}
        icon={
          success ? (
            <IonIcon name={'checkmark-done-circle-outline'} size={25} />
          ) : (
            <></>
          )
        }
        iconDirection={'right'}
        onPress={validateSubmit}>
        {buttonText}
      </CustomButton>
      {!success &&
        (resent ? (
          <>
            <BoldText
              variant="bodyLarge"
              children={count}
              style={[styles.title, {color: theme.colors.tertiary}]}
            />
            <BoldText
              children={textConfig.otpResent}
              style={[styles.title, {color: theme.colors.tertiary}]}
            />
          </>
        ) : (
          <CustomButton
            mode="text"
            children={textConfig.resendOtp}
            disabled={loading}
            size="small"
            onPress={HandleResend}
          />
        ))}

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

export default OtpInput;

interface Style {
  button: ViewStyle;
  wrapper: ViewStyle;
  input: TextStyle;
  error: ViewStyle;
  title: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  button: {
    borderRadius: 20,
    marginVertical: 20,
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
