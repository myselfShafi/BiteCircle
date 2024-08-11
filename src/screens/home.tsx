import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar} from 'react-native-paper';
import {FoodCard, MainAppBar, MainView, Shimmer, Story} from '../components';
import {StoryData} from '../configs/types';
import {HomeStackParamList} from '../navigation/stacks/home';

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
  const [storyFetch, setStoryFetch] = useState(false);
  const [cardFetch, setCardFetch] = useState(false);

  const story = useCallback(
    ({item}: {item: StoryData}) => <Story data={item} />,
    [sampleReels],
  );

  return (
    <MainView>
      <MainAppBar icon={'notifications-outline'} />
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
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          cardFetch ? (
            <View style={styles.foodCardShimmerWrapper}>
              <Shimmer style={styles.avatar} />
              <View>
                <Shimmer style={styles.title} delay={1000} />
                <Shimmer style={styles.subtitle} delay={1000} />
              </View>
            </View>
          ) : null
        }
        onEndReached={() => {
          setCardFetch(true); //set this false once new data fetched
        }}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <View style={styles.reelWrapper}>
            <FlatList
              horizontal
              data={sampleReels}
              ListHeaderComponent={<Avatar.Icon size={55} icon="plus" />}
              ListHeaderComponentStyle={styles.reelContainer}
              renderItem={story}
              keyExtractor={item => item?.id.toString()}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                storyFetch ? <Shimmer style={styles.reelsShimmer} /> : null
              }
              ListFooterComponentStyle={styles.reelContainer}
              onEndReached={() => {
                setStoryFetch(true); //set this false once new data fetched
              }}
              onEndReachedThreshold={0.4}
            />
          </View>
        }
      />
    </MainView>
  );
};

export default Home;

interface Style {
  reelWrapper: ViewStyle;
  reelContainer: ViewStyle;
  reelsShimmer: ViewStyle;
  foodCardShimmerWrapper: ViewStyle;
  avatar: ViewStyle;
  title: ViewStyle;
  subtitle: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  reelWrapper: {paddingVertical: 15},
  reelContainer: {justifyContent: 'center', marginHorizontal: 10},
  reelsShimmer: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  foodCardShimmerWrapper: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    height: 10,
    marginBottom: 10,
  },
  subtitle: {
    height: 10,
    width: '75%',
  },
});
