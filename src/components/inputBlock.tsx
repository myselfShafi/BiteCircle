import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, TextStyle, View, ViewStyle} from 'react-native';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';

type InputBoxProps = TextInputProps & {
  errorText?: string;
};

const InputBox = forwardRef<TextInput, InputBoxProps>(
  ({style, errorText = '', ...props}, ref): JSX.Element => {
    const theme = useTheme();
    let hasError = errorText?.length > 0;

    return (
      <View>
        <PaperTextInput
          theme={{roundness: 20}}
          underlineStyle={styles.underline}
          style={[
            styles.container,
            style,
            {backgroundColor: theme.colors.surfaceVariant},
          ]}
          ref={ref}
          mode="outlined"
          outlineColor={hasError ? theme.colors.error : 'transparent'}
          error={hasError}
          {...props}
        />
        {hasError && (
          <HelperText type="error" visible={hasError} style={styles.helperText}>
            {errorText}
          </HelperText>
        )}
      </View>
    );
  },
);

export default InputBox;

interface Style {
  underline: ViewStyle;
  container: ViewStyle;
  helperText: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  underline: {display: 'none'},
  container: {
    borderRadius: 20,
  },
  helperText: {
    fontWeight: 900,
  },
});
