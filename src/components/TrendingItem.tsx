import React, {Fragment, useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {TrendsData} from '../configs/types';
import {SCREEN_WIDTH} from '../utils/constants';
import Shimmer from './common/Shimmer';

type TrendingItemProps = TouchableOpacityProps & {
  data: TrendsData;
};

const TrendingItem = ({data, ...props}: TrendingItemProps): JSX.Element => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.6}
        {...props}
        style={[styles.wrapper, loading && {display: 'none'}]}>
        <Image
          style={styles.img}
          alt={data.category}
          source={{
            uri: data.url,
            cache: 'force-cache',
          }}
          onLoadEnd={() => setLoading(false)}
        />
        <View
          style={[
            styles.title,
            {backgroundColor: theme.colors.secondaryContainer},
          ]}>
          <Text variant="titleSmall" style={styles.text}>
            {data.category}
          </Text>
        </View>
      </TouchableOpacity>
      <ItemShimmer isLoading={!loading} />
    </Fragment>
  );
};

const ItemShimmer = ({isLoading}: {isLoading: boolean}): JSX.Element => {
  return (
    <View style={[styles.img, isLoading && {display: 'none'}]}>
      <Shimmer style={styles.shimmerImg} visible={isLoading} />
      <Shimmer style={styles.shimmerText} isReversed visible={isLoading} />
    </View>
  );
};

export default TrendingItem;

interface Style {
  wrapper: ViewStyle;
  img: ImageStyle;
  title: ViewStyle;
  text: TextStyle;
  shimmerText: ViewStyle;
  shimmerImg: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {position: 'relative'},
  img: {
    width: (SCREEN_WIDTH - 6) / 3,
    aspectRatio: 1,
    objectFit: 'cover',
    margin: 1,
  },
  title: {
    position: 'absolute',
    paddingVertical: 3,
    paddingHorizontal: 6,
    opacity: 0.8,
    bottom: 0,
    left: 0,
    borderTopRightRadius: 10,
  },
  text: {
    textTransform: 'capitalize',
  },
  shimmerText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: 20,
    borderTopRightRadius: 10,
  },
  shimmerImg: {height: '100%', width: '100%'},
});
