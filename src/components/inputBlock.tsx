import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';

type InputBoxProps = TextInputProps & {
  hasError?: boolean;
};

const InputBox = forwardRef<TextInput, InputBoxProps>(
  ({style, hasError, ...props}, ref): JSX.Element => {
    const theme = useTheme();
    return (
      <PaperTextInput
        theme={{roundness: 20}}
        underlineStyle={styles.underline}
        style={[
          styles.container,
          style,
          {backgroundColor: theme.colors.surfaceVariant},
        ]}
        ref={ref}
        error={hasError}
        mode={hasError ? 'outlined' : 'flat'}
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
