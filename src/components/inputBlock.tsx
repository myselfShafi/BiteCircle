import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {TextInput as PaperTextInput, TextInputProps} from 'react-native-paper';

const InputBox = forwardRef<TextInput, TextInputProps>(
  ({style, ...props}, ref): JSX.Element => {
    return (
      <PaperTextInput
        theme={{roundness: 20}}
        underlineStyle={styles.underline}
        style={[styles.container, style]}
        ref={ref}
        {...props}
      />
    );
  },
);

export default InputBox;

interface Style {
  underline: ViewStyle;
  container: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  underline: {display: 'none'},
  container: {
    borderRadius: 20,
  },
});
