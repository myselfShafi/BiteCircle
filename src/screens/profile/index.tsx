import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {memo, useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {BoldText, IconBtn, MainView, TrendingItem} from '../../components';
import {textConfig} from '../../configs';
import {StackParamList} from '../../navigation/navigator';
import {SCREEN_WIDTH} from '../../utils/constants';
import {sampleTrending} from '../search/Search';
import ProfileSettings from './settings';

const profileData = {
  username: 'foodie_john',
  name: 'John Doe',
  bio: '🍕 Food lover | 🌍 World traveler | 🍳 Home chef \nExploring flavors, one bite at a time.',
  img: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg',
  posts: 58,
  followers: '1.2K',
  following: 345,
};

const profileStats = [
  {id: 1, label: textConfig.posts, value: profileData.posts},
  {id: 2, label: textConfig.followers, value: profileData.followers},
  {id: 3, label: textConfig.following, value: profileData.following},
];

type ProfileProps = NativeStackScreenProps<StackParamList, 'profile'>;

const offsetValue = 100;

const ListTitleComp = memo((): JSX.Element => {
  return (
    <BoldText variant="titleMedium" style={[styles.title]}>
      {textConfig.album} <Text>({sampleTrending.length})</Text>
    </BoldText>
  );
});

const StatsComp = memo((): JSX.Element => {
  return (
    <View style={styles.statsWrapper}>
      {profileStats.map(stat => (
        <View key={stat.id} style={styles.profile}>
          <BoldText variant="titleLarge">
            {stat.value.toLocaleString()}
          </BoldText>
          <Text variant="bodySmall">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
});

const handleInterpolation = (
  value: number,
  initialOutput: number,
  finalOutput: number,
) => {
  'worklet';
  return interpolate(
    value,
    [0, offsetValue],
    [initialOutput, finalOutput],
    Extrapolation.CLAMP,
  );
};

const Profile = ({navigation}: ProfileProps): JSX.Element => {
  const [settings, setSettings] = useState<boolean>(false);

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(e => {
    scrollY.value = Math.floor(e.contentOffset.y);
  });

  const AnimateHeader = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: handleInterpolation(
          scrollY.value,
          0,
          -(SCREEN_WIDTH / 3) + 20,
        ),
      },
    ],
  }));

  const AnimateImg = useAnimatedStyle(() => ({
    width: handleInterpolation(
      scrollY.value,
      SCREEN_WIDTH / 3,
      SCREEN_WIDTH / 4.5,
    ),
    borderRadius: handleInterpolation(
      scrollY.value,
      SCREEN_WIDTH / 6,
      SCREEN_WIDTH / 9,
    ),
  }));

  const AnimateName = useAnimatedStyle(() => ({
    transform: [{scale: handleInterpolation(scrollY.value, 1, 0.8)}],
  }));

  const AnimateBio = useAnimatedStyle(() => ({
    opacity: handleInterpolation(scrollY.value, 1, 0),
  }));

  const AnimateStats = useAnimatedStyle(() => ({
    opacity: handleInterpolation(scrollY.value, 0, 1),
    maxHeight: handleInterpolation(scrollY.value, 0, 200),
  }));

  const openSettings = () => setSettings(true);

  return (
    <MainView>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="" />
        <IconBtn name="cog-outline" onPress={openSettings} />
      </Appbar.Header>
      <ProfileSettings
        visible={settings}
        onDismiss={() => setSettings(false)}
      />
      <View>
        <Animated.View style={[styles.profile, AnimateHeader]}>
          <Animated.Image
            source={{uri: profileData.img}}
            style={[{aspectRatio: 1}, AnimateImg]}
          />
          <Animated.View style={[AnimateName]}>
            <BoldText variant="titleLarge">{profileData.name}</BoldText>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.stats2Wrapper, AnimateStats]}>
          <StatsComp />
        </Animated.View>
      </View>
      <Animated.View style={[AnimateStats]}>
        <ListTitleComp />
      </Animated.View>
      <Animated.FlatList
        data={sampleTrending}
        onScroll={handleScroll}
        renderItem={({item}) => <TrendingItem data={item} />}
        keyExtractor={item => item?.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Animated.View style={[AnimateBio]}>
              <View style={[styles.profile]}>
                <Text variant="bodyMedium" style={styles.username}>
                  @{profileData.username}
                </Text>
                <BoldText variant="bodyMedium" style={styles.bio}>
                  {profileData.bio}
                </BoldText>
              </View>
              <StatsComp />
              <ListTitleComp />
            </Animated.View>
          </>
        }
      />
    </MainView>
  );
};

export default Profile;

interface Style {
  profile: ViewStyle;
  username: TextStyle;
  title: TextStyle;
  bio: TextStyle;
  statsWrapper: ViewStyle;
  stats2Wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  profile: {
    alignItems: 'center',
    rowGap: 10,
    position: 'relative',
    zIndex: 2,
  },
  username: {fontStyle: 'italic'},
  bio: {
    marginVertical: 5,
    textAlign: 'center',
    maxWidth: (SCREEN_WIDTH * 5) / 6,
  },
  stats2Wrapper: {
    width: (SCREEN_WIDTH * 2) / 3,
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
    height: '100%',
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  title: {
    marginLeft: 10,
    marginVertical: 15,
  },
});
