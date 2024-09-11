import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import {BoldText, MainView} from '../../../components';

const Login = (): JSX.Element => {
  return (
    <MainView>
      <BoldText variant="titleLarge" style={styles.title}>
        Log In To Your Account
      </BoldText>
    </MainView>
  );
};

export default Login;

interface Style {
  title: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  title: {
    textAlign: 'center',
  },
});
