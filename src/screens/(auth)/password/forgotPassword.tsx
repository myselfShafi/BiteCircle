import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {IconBtn, MainView} from '../../../components';
import {StackParamList} from '../../../navigation/navigator';

type PwdScreenProps = NativeStackScreenProps<StackParamList, 'forgotPwd'>;

const ForgotPassword = ({navigation}: PwdScreenProps) => {
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <MainView>
      <IconBtn
        name={'return-up-back'}
        onPress={handleBack}
        style={styles.back}
      />
    </MainView>
  );
};

export default ForgotPassword;

interface Style {
  back: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  back: {
    position: 'absolute',
    zIndex: 10,
    top: 40,
    left: 15,
  },
});
