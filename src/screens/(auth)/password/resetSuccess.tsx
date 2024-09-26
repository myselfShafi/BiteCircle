import React, {Fragment} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, CustomButton} from '../../../components';
import {textConfig} from '../../../configs';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {PwdScreenProps} from '../password';

const ResetSuccess = ({
  navigation,
}: {
  navigation: PwdScreenProps['navigation'];
}) => {
  const theme = useTheme();

  const handleRedirect = () => {
    navigation.reset({routes: [{name: 'auth'}]});
  };
  return (
    <Fragment>
      <Image
        source={require('../../../assets/success.webp')}
        style={styles.image}
      />
      <BoldText variant="headlineSmall" style={styles.title}>
        {textConfig.pwdSuccessTitle}
      </BoldText>
      <BoldText
        variant="titleMedium"
        style={[styles.title, {color: theme.colors.onBackground}]}>
        {textConfig.pwdSuccessSubTitle}
      </BoldText>
      <CustomButton
        variant="titleMedium"
        size="large"
        style={styles.button}
        onPress={handleRedirect}>
        {textConfig.login}
      </CustomButton>
    </Fragment>
  );
};

export default ResetSuccess;

interface Style {
  image: ImageStyle;
  title: TextStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  image: {
    marginHorizontal: 'auto',
    width: SCREEN_WIDTH / 2.2,
    height: SCREEN_WIDTH / 2.2,
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {},
});
