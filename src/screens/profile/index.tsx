import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {memo, useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  Surface,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BoldText,
  IconBtn,
  MainView,
  ModalWrapper,
  TrendingItem,
} from '../../components';
import {textConfig} from '../../configs';
import {StackParamList} from '../../navigation/navigator';
import {SCREEN_WIDTH} from '../../utils/constants';
import {sampleTrending} from '../search/Search';

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
  const theme = useTheme();
  const [settings, setSettings] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [fingerLock, setFingerLock] = useState<boolean>(false);

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
  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleLock = () => setFingerLock(prev => !prev);

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
      <ModalWrapper
        visible={settings}
        onDismiss={() => setSettings(false)}
        placement="flex-end"
        contentContainerStyle={styles.settingModal}>
        <Divider
          bold
          style={[
            styles.divider,
            {
              backgroundColor: theme.colors.onBackground,
            },
          ]}
        />
        <Surface elevation={0} style={styles.surface}>
          <View style={styles.flexRow}>
            <View
              style={[
                styles.surface,
                {backgroundColor: theme.colors.secondaryContainer},
              ]}>
              <Icon name={'options'} size={20} />
            </View>
            <View style={styles.text}>
              <BoldText variant={'titleMedium'}>
                {textConfig.preference}
              </BoldText>
              <Text variant="bodySmall">{textConfig.preferenceSub}</Text>
            </View>
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={darkMode ? 'moon' : 'moon-outline'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.darkMode}</BoldText>
            </View>
            <Text>
              <Switch
                value={darkMode}
                onValueChange={toggleTheme}
                color={theme.colors.secondary}
              />
            </Text>
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={'finger-print'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.lock}</BoldText>
            </View>
            <Text>
              <Switch value={fingerLock} onValueChange={toggleLock} />
            </Text>
          </View>
        </Surface>
        <Surface elevation={0} style={styles.surface}>
          <View style={styles.flexRow}>
            <View
              style={[
                styles.surface,
                {backgroundColor: theme.colors.secondaryContainer},
              ]}>
              <Icon name={'help-circle'} size={20} />
            </View>
            <View style={styles.text}>
              <BoldText variant={'titleMedium'}>{textConfig.help}</BoldText>
              <Text variant="bodySmall">{textConfig.helpSub}</Text>
            </View>
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={'flag'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.report}</BoldText>
            </View>
            <Icon name={'chevron-forward'} size={18} />
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={'mail'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.contact}</BoldText>
            </View>
            <Icon name={'chevron-forward'} size={18} />
          </View>
        </Surface>
        <Button
          mode="contained-tonal"
          contentStyle={{flexDirection: 'row-reverse'}}
          icon={({color, size}) => (
            <Icon name={'log-out'} size={size} color={color} />
          )}
          onPress={() => console.log('logged out ...')}>
          {textConfig.logout}
        </Button>
      </ModalWrapper>
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
  settingModal: ViewStyle;
  stack: ViewStyle;
  flexRow: ViewStyle;
  surface: ViewStyle;
  text: ViewStyle;
  divider: ViewStyle;
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
  settingModal: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    rowGap: 20,
  },
  stack: {
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  surface: {
    padding: 10,
    borderRadius: 10,
    rowGap: 15,
    overflow: 'hidden',
  },
  text: {
    flexShrink: 1,
    maxWidth: '80%',
  },
  divider: {
    width: '25%',
    marginVertical: 10,
    alignSelf: 'center',
  },
});
