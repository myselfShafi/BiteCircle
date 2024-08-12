import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Avatar, Badge, Surface, Text, useTheme} from 'react-native-paper';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ChatListData} from '../../configs/types';
import {SCREEN_WIDTH} from '../../utils/constants';
import BoldText from '../common/BoldText';
import IconBtn from '../common/IconButton';
import MainView from '../common/MainView';

type ListProps = {
  data: ChatListData;
  onPress: (data: ChatListData) => void;
  onDelete: (id: number) => void;
};

const AnimatedSurface = Animated.createAnimatedComponent(Surface);
const AnimatedIcon = Animated.createAnimatedComponent(IconBtn);

const List = ({data, onPress, onDelete}: ListProps): JSX.Element => {
  const theme = useTheme();
  const slider = useSharedValue(0);
  const deleteIcon = useSharedValue(0);

  const AnimateSlider = useAnimatedStyle(() => ({
    transform: [{translateX: slider.value - 2}],
  }));

  const AnimateDelete = useAnimatedStyle(() => ({
    transform: [{scale: deleteIcon.value}],
  }));

  const handleGestureSlide = Gesture.Pan().onFinalize(({translationX}) => {
    if (translationX < 0) {
      slider.value = withSpring(-100);
      deleteIcon.value = withSpring(1);
    } else {
      slider.value = withSpring(-2);
      deleteIcon.value = withSpring(0);
    }
  });

  const handleDelete = () => {
    slider.value = withTiming(-SCREEN_WIDTH, {duration: 300});
    deleteIcon.value = withTiming(0, {duration: 300}, () => {
      runOnJS(onDelete)(data.id);
    });
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <GestureDetector gesture={handleGestureSlide}>
          <AnimatedSurface elevation={0} style={[AnimateSlider]}>
            <TouchableOpacity
              style={styles.wrapper}
              activeOpacity={0.7}
              onPress={() => onPress(data)}>
              <Avatar.Image
                size={65}
                source={{
                  uri: data.avatar,
                }}
              />
              <Badge
                size={10}
                style={[
                  styles.badge,
                  {backgroundColor: theme.colors.secondary},
                  data.status && {opacity: 1},
                ]}
              />
              <MainView>
                <BoldText variant="titleMedium">{data.username}</BoldText>
                <Text variant="bodyMedium" style={styles.msg} numberOfLines={2}>
                  {data.lastMessage}
                </Text>
              </MainView>
              <View style={[styles.msgContainer]}>
                <BoldText variant="bodySmall">{data.timestamp}</BoldText>
                <Badge
                  size={18}
                  style={[
                    {backgroundColor: theme.colors.secondary},
                    !data.unread && {opacity: 0},
                  ]}>
                  {data.unread}
                </Badge>
              </View>
            </TouchableOpacity>
          </AnimatedSurface>
        </GestureDetector>
        <View
          style={[
            styles.deleteWrapper,
            {backgroundColor: theme.colors.onError},
          ]}>
          <AnimatedIcon
            name="trash"
            size={30}
            bgColor={theme.colors.errorContainer}
            iconColor={theme.colors.error}
            onPress={handleDelete}
            style={[AnimateDelete]}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default List;

interface Style {
  wrapper: ViewStyle;
  container: ViewStyle;
  msgContainer: ViewStyle;
  msg: TextStyle;
  badge: ViewStyle;
  deleteWrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 10,
  },
  container: {
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  msgContainer: {
    rowGap: 10,
  },
  msg: {
    flexShrink: 1,
  },
  badge: {
    alignSelf: 'center',
    opacity: 0,
  },
  deleteWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: -1,
  },
});
