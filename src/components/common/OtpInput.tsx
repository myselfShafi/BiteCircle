import React, {Fragment, RefObject, useEffect, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {textConfig} from '../../configs';
import InputBox from '../inputBlock';
import CustomButton from './Button';

type OtpInputProps = {
  handleSubmit: (otp: string) => void;
  buttonText?: string;
  loading?: boolean;
  success?: boolean;
};

const OtpInput = ({
  handleSubmit,
  buttonText = textConfig.submit,
  loading,
  success = false,
}: OtpInputProps) => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<boolean>(false);

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
    setError(false);
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
      setError(true);
      return;
    }
    setError(false);
    let otp = code.join('');
    handleSubmit(otp);
  };

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
            errorText={error ? '!' : ''}
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
    </Fragment>
  );
};

export default OtpInput;

interface Style {
  button: ViewStyle;
  wrapper: ViewStyle;
  input: TextStyle;
  error: ViewStyle;
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
});
