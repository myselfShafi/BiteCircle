import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SCREEN_HEIGHT} from '../../utils/constants';

const Spinner = (): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator animating={true} size={40} />
    </View>
  );
};

export default Spinner;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    height: SCREEN_HEIGHT / 4,
    justifyContent: 'center',
  },
});
