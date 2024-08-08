import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TextInput, TextInputProps, useTheme} from 'react-native-paper';

type InputBoxProps = TextInputProps & {
  handleSend?: () => void;
};

const InputBox = ({handleSend, ...props}: InputBoxProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TextInput
      underlineStyle={styles.underline}
      style={styles.container}
      left={
        <TextInput.Icon
          icon={'emoticon-outline'}
          size={22}
          onPress={() => console.log('comment Pressed')}
        />
      }
      right={
        <TextInput.Icon
          icon={'send-circle-outline'}
          size={30}
          color={theme.colors.secondary}
          onPress={handleSend}
        />
      }
      {...props}
    />
  );
};

export default InputBox;

interface Style {
  underline: ViewStyle;
  container: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  underline: {display: 'none'},
  container: {
    borderRadius: 20,
    borderTopRightRadius: 20,
  },
});
