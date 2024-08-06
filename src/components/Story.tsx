import React, {Fragment, useState} from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {StoryData} from '../configs/types';
import Shimmer from './common/Shimmer';

type ReelPropType = {
  data: StoryData;
};

const Story = ({data}: ReelPropType): JSX.Element => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
      <View
        style={[
          styles.wrapper,
          {borderColor: theme.colors.onPrimaryContainer},
          loading && {display: 'none'},
        ]}>
        <Image
          style={styles.img}
          alt={data.image}
          source={{
            uri: data.image,
          }}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      <Shimmer
        style={[styles.shimmer, !loading && {display: 'none'}]}
        visible={!loading}
      />
    </Fragment>
  );
};

export default Story;

interface Style {
  wrapper: ViewStyle;
  img: ImageStyle;
  shimmer: ViewStyle;
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
  shimmer: {
    width: 75,
    height: 75,
    borderRadius: 75,
    marginHorizontal: 10,
  },
});
