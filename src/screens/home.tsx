import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {FoodCard, Reels, Shimmer} from '../components';
import {HomeStackParamList} from '../navigation/stacks/home';
import {useAppTheme} from '../themes/theme';

const sampleReels = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618684833569-d9476d99c36e',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1594583388647-364ea6532257',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1706811833540-2a1054cddafb',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1490984792589-bc12fe270585',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1536724844213-31a3b25a807c',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1526096478311-ff9cf8d38693',
  },
];

type HomeProps = NativeStackScreenProps<HomeStackParamList, 'home'>;

const Home = ({navigation}: HomeProps): JSX.Element => {
  const theme = useAppTheme();

  return (
    <View style={[styles.container]}>
      <View style={styles.appbar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Icon
          name={'notifications-outline'}
          color={theme.colors.primary}
          size={25}
          style={[styles.bell, {backgroundColor: theme.colors.card}]}
        />
      </View>
      <View style={styles.reelWrapper}>
        <FlatList
          horizontal
          data={sampleReels}
          ListHeaderComponent={<Avatar.Icon size={55} icon="plus" />}
          ListHeaderComponentStyle={styles.reelContainer}
          renderItem={({item}) => <Reels data={item} />}
          keyExtractor={item => item?.id.toString()}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<Shimmer style={styles.reelsShimmer} />}
          ListFooterComponentStyle={styles.reelContainer}
        />
      </View>
      <FlatList
        data={Array(4).fill(null)}
        renderItem={({item}) => (
          <FoodCard
            onPress={() => {
              navigation.navigate('postDetail');
            }}
          />
        )}
        keyExtractor={(item, index) => item?.id || index}
      />
    </View>
  );
};

export default Home;

interface Style {
  container: ViewStyle;
  appbar: ViewStyle;
  logo: ImageStyle;
  bell: ViewStyle;
  reelWrapper: ViewStyle;
  reelContainer: ViewStyle;
  reelsShimmer: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {flex: 1},
  appbar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bell: {
    padding: 6,
    borderRadius: 10,
  },
  reelWrapper: {paddingVertical: 15},
  reelContainer: {justifyContent: 'center', marginLeft: 10},
  reelsShimmer: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
});
