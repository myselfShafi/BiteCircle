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
import {textConfig} from '../../configs';
import InputBox from '../inputBlock';
import CustomButton from './Button';

type OtpInputProps = {
  handleSubmit?: () => void;
  buttonText?: string;
};

const OtpInput = ({
  handleSubmit,
  buttonText = textConfig.submit,
}: OtpInputProps) => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);

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
            value={field}
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
        onPress={handleSubmit}>
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
});
