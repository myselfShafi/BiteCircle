import React, {Fragment, useState} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, CustomButton, InputBox} from '../../../components';
import {textConfig} from '../../../configs';
import {SCREEN_HEIGHT} from '../../../utils/constants';

const ResetPassword = ({addProgress}: {addProgress: () => void}) => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const togglePwd = () => {
    setShowPwd(prev => !prev);
  };

  const handleSubmit = () => {
    addProgress();
  };

  return (
    <Fragment>
      <BoldText variant="titleLarge" style={styles.title}>
        {textConfig.setPwdTitle}
      </BoldText>
      <BoldText
        variant="bodyMedium"
        style={[styles.title, {color: theme.colors.onBackground}]}
        children={textConfig.setPwdSubTitle}
      />
      <InputBox
        placeholder={textConfig.placeholders.newPassword}
        textContentType="newPassword"
        secureTextEntry={!showPwd}
        autoCorrect={false}
        style={styles.gap}
        left={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon
                name={showPwd ? 'lock-open-outline' : 'lock-closed-outline'}
                size={size}
                color={color}
              />
            )}
            size={20}
            disabled
            aria-disabled
          />
        }
        right={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon
                name={showPwd ? 'eye-outline' : 'eye-off-outline'}
                size={size}
                color={color}
              />
            )}
            size={20}
            onPress={togglePwd}
          />
        }
      />
      <InputBox
        placeholder={textConfig.placeholders.cnfNewPassword}
        textContentType="newPassword"
        secureTextEntry={!showPwd}
        autoCorrect={false}
        left={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon
                name={showPwd ? 'lock-open-outline' : 'lock-closed-outline'}
                size={size}
                color={color}
              />
            )}
            size={20}
            disabled
            aria-disabled
          />
        }
        right={
          <TextInput.Icon
            icon={({size, color}) => (
              <IonIcon
                name={showPwd ? 'eye-outline' : 'eye-off-outline'}
                size={size}
                color={color}
              />
            )}
            size={20}
            onPress={togglePwd}
          />
        }
      />
      <CustomButton
        variant="titleMedium"
        size="large"
        style={styles.button}
        onPress={handleSubmit}>
        {textConfig.submit}
      </CustomButton>
    </Fragment>
  );
};

export default ResetPassword;

interface Style {
  title: TextStyle;
  container: ViewStyle;
  button: ViewStyle;
  gap: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    height: SCREEN_HEIGHT / 2.5,
    padding: 35,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  gap: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    marginVertical: 20,
  },
});
