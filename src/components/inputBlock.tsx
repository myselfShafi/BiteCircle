import React, {useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const InputBox = ({...props}): JSX.Element => {
  const theme = useTheme();
  const [comment, setComment] = useState('');

  return (
    <TextInput
      {...props}
      value={comment}
      onChangeText={text => setComment(text)}
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
          onPress={() => console.log('sent')}
        />
      }
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
