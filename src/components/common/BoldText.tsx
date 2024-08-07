import React from 'react';
import {StyleSheet, TextProps, TextStyle} from 'react-native';
import {TextProps as PaperTextProps, Text} from 'react-native-paper';

type BoldTextProps = PaperTextProps<TextProps> & {
  style?: TextStyle | TextStyle[];
};

const BoldText = ({children, style, ...props}: BoldTextProps): JSX.Element => {
  return (
    <Text style={[styles.bold, style]} {...props}>
      {children}
    </Text>
  );
};

export default BoldText;

interface Style {
  bold: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  bold: {
    fontWeight: 900,
  },
});
