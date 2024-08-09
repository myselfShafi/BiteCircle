import React, {Fragment, useMemo, useState} from 'react';
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
import {Divider, Text, useTheme} from 'react-native-paper';
import {TrendsData} from '../configs/types';
import {SCREEN_WIDTH} from '../utils/constants';
import IconBtn from './common/IconButton';
import LabelIconButton from './common/LabelIconButton';
import ModalWrapper from './common/Modal';
import Shimmer from './common/Shimmer';

type TrendingItemProps = TouchableOpacityProps & {
  data: TrendsData;
};

const TrendingItem = ({data, ...props}: TrendingItemProps): JSX.Element => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  const handleOpen = () => setVisible(true);

  const reactions = useMemo(
    () => [
      {
        icon: 'chatbubble-outline',
        content: '32',
        onPress: () => console.log('comment Pressed'),
      },
      {
        icon: 'heart-outline',
        selectIcon: 'heart',
        content: '1.45K',
        state: liked,
        onPress: () => setLiked(prev => !prev),
      },
      {icon: 'paper-plane-outline', onPress: () => console.log('send Pressed')},
    ],
    [liked, bookmark],
  );

  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.6}
        {...props}
        style={[styles.wrapper, loading && {display: 'none'}]}
        onPress={handleOpen}>
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
        <ModalWrapper
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalView}>
          <Image
            style={styles.modalImg}
            alt={data.category}
            source={{
              uri: data.url,
              cache: 'force-cache',
            }}
            onLoadEnd={() => setLoading(false)}
          />
          <IconBtn
            name={bookmark ? 'bookmark' : 'bookmark-outline'}
            style={styles.fav}
            onPress={() => setBookmark(prev => !prev)}
          />
          <Divider
            bold
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.onBackground,
              },
            ]}
          />
          <View style={styles.reaction}>
            {reactions.map(list => {
              const iconName = list.state ? list.selectIcon : list.icon;
              return (
                <View key={list.icon}>
                  <LabelIconButton
                    icon={iconName}
                    label={list.content}
                    onPress={list.onPress}
                  />
                </View>
              );
            })}
          </View>
        </ModalWrapper>
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
  modalView: ViewStyle;
  modalImg: ImageStyle;
  divider: ViewStyle;
  reaction: ViewStyle;
  fav: ViewStyle;
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
  modalView: {
    width: SCREEN_WIDTH - 20,
    padding: 10,
  },
  modalImg: {
    aspectRatio: 2 / 3,
    objectFit: 'contain',
  },
  divider: {
    width: '70%',
    marginVertical: 8,
    alignSelf: 'center',
  },
  reaction: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  fav: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
