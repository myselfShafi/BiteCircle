import React from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ReelData} from '../configs/types';

type ReelPropType = {
  data: ReelData;
};

const Reels = ({data}: ReelPropType): JSX.Element => {
  const theme = useTheme();

  return (
    <View
      style={[styles.wrapper, {borderColor: theme.colors.onPrimaryContainer}]}>
      <Image
        style={styles.img}
        source={{
          uri: data.image,
        }}
      />
    </View>
  );
};

export default Reels;

interface Style {
  wrapper: ViewStyle;
  img: ImageStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    borderRadius: 65,
    padding: 2,
    borderWidth: 3,
    marginHorizontal: 10,
  },
  img: {
    borderRadius: 65,
    width: 65,
    height: 65,
    objectFit: 'cover',
  },
});
