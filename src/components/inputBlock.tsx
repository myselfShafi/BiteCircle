import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const InputBox = ({...props}): JSX.Element => {
  const [comment, setComment] = useState('');

  return (
    <TextInput
      {...props}
      value={comment}
      onChangeText={text => setComment(text)}
      underlineStyle={styles.underline}
      style={styles.container}
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  underline: {display: 'none'},
  container: {
    borderRadius: 20,
    borderTopRightRadius: 20,
  },
});
