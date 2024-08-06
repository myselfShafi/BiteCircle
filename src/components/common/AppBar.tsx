import React from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import IconBtn from './IconButton';

type MainAppBarProps = {
  icon: string;
  bgColor?: any;
  onPress?: () => void;
};

const MainAppBar = ({icon, bgColor, onPress}: MainAppBarProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../../assets/logo.png')}
        alt="app logo"
        style={styles.logo}
      />
      <IconBtn name={icon} size={24} bgColor={bgColor} onPress={onPress} />
    </View>
  );
};

export default MainAppBar;

interface Style {
  wrapper: ViewStyle;
  logo: ImageStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
