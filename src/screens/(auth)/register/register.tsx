import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import {BoldText, MainView} from '../../../components';

const Register = (): JSX.Element => {
  return (
    <MainView>
      <BoldText variant="titleLarge" style={styles.title}>
        Create New Account
      </BoldText>
    </MainView>
  );
};

export default Register;

interface Style {
  title: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  title: {
    textAlign: 'center',
  },
});
