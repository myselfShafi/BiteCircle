import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar} from 'react-native-paper';
import {FoodCard, MainAppBar, MainView, Shimmer, Story} from '../components';
import {StoryData} from '../configs/types';
import {SamplePosts, sampleStory} from '../mockData';
import {HomeStackParamList} from '../navigation/stacks/home';

type HomeProps = NativeStackScreenProps<HomeStackParamList, 'home'>;

const Home = ({navigation}: HomeProps): JSX.Element => {
  const [storyFetch, setStoryFetch] = useState(false);
  const [cardFetch, setCardFetch] = useState(false);

  const story = useCallback(
    ({item}: {item: StoryData}) => <Story data={item} />,
    [sampleStory],
  );

  return (
    <MainView>
      <MainAppBar icon={'notifications-outline'} />
      <FlatList
        data={SamplePosts}
        renderItem={({item}) => (
          <FoodCard
            data={item}
            onPress={() => {
              navigation.navigate('postDetail', {data: item});
            }}
          />
        )}
        keyExtractor={item => item?.id.toString()}
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
              data={sampleStory}
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
