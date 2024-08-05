import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {TrendsData} from '../configs/types';
import {SCREEN_WIDTH} from '../utils/constants';

type TrendingItemProps = TouchableOpacityProps & {
  data: TrendsData;
};

const TrendingItem = ({data, ...props}: TrendingItemProps): JSX.Element => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <Image
        style={styles.img}
        source={{
          uri: data.url,
        }}
      />
    </TouchableOpacity>
  );
};

export default TrendingItem;

interface Style {
  img: ImageStyle;
}

const styles: Style = StyleSheet.create<Style>({
  img: {
    width: (SCREEN_WIDTH - 6) / 3,
    aspectRatio: 1,
    objectFit: 'cover',
    margin: 1,
  },
});
