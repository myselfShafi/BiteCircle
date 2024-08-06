import React, {useMemo, useRef, useState} from 'react';
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Avatar, IconButton, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Video, {VideoRef} from 'react-native-video';
import {ReelsData} from '../configs/types';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/constants';
import MainAppBar from './common/AppBar';
import CustomButton from './common/Button';

const MediaReel = ({data}: {data: ReelsData}) => {
  const theme = useTheme();
  const [muted, setMuted] = useState(false);

  const [bookmark, setBookmark] = useState(false);
  const [liked, setLiked] = useState(false);

  const reactions = useMemo(
    () => [
      {
        icon: 'bookmark-outline',
        selectIcon: 'bookmark',
        state: bookmark,
        onPress: () => setBookmark(prev => !prev),
      },
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
      {
        icon: 'ellipsis-vertical-outline',
        onPress: () => console.log('more Pressed'),
      },
    ],
    [liked, bookmark],
  );

  const videoRef = useRef<VideoRef>(null);
  const background = require('../assets/videos/demo-2.mp4');

  const onBuffer = (buffer: any) => {
    console.log('buffring', buffer);
  };
  const onError = (error: any) => {
    console.log('error', error);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, styles.topContainer]}>
        <MainAppBar
          icon={muted ? 'volume-mute-outline' : 'volume-high-outline'}
          bgColor={theme.colors.backdrop}
          onPress={() => setMuted(!muted)}
        />
      </View>
      <TouchableOpacity style={styles.wrapper} activeOpacity={0.9}>
        <Video
          source={background}
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          style={styles.video}
          repeat={true}
          resizeMode="cover"
          muted={muted}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.contentContainer,
          styles.bottomContainer,
          {backgroundColor: theme.colors.backdrop},
        ]}>
        <View style={styles.user}>
          <Avatar.Image
            source={{
              uri: data.img,
            }}
            size={45}
          />
          <Text variant="titleMedium" style={styles.title}>
            {data.name}
          </Text>
          <CustomButton size="small" children={'Follow'} />
        </View>
        <Text
          variant="bodyLarge"
          style={styles.comment}
          numberOfLines={3}
          ellipsizeMode="tail">
          {data.comment}
        </Text>
        <View style={styles.reaction}>
          {reactions.map(list => {
            const iconName = list.state ? list.selectIcon : list.icon;
            return (
              <View style={styles.button} key={list.icon}>
                <IconButton
                  icon={({color}) => (
                    <Icon name={iconName} size={25} color={color} />
                  )}
                  onPress={list.onPress}
                />
                {list.content && (
                  <Text variant="bodyMedium">{list.content}</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default MediaReel;

interface Style {
  container: ViewStyle;
  wrapper: ViewStyle;
  logo: ImageStyle;
  video: ImageStyle;
  contentContainer: ViewStyle;
  topContainer: ViewStyle;
  bottomContainer: ViewStyle;
  title: TextStyle;
  comment: TextStyle;
  user: ViewStyle;
  reaction: ViewStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    width: 200,
    height: 50,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  topContainer: {
    top: 0,
  },
  bottomContainer: {
    bottom: 80, // temporary
    margin: 10,
    borderRadius: 10,
  },
  title: {fontWeight: 900},
  comment: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  user: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  reaction: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
