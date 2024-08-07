import React, {useCallback, useRef, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';
import {MediaReel, Spinner} from '../../components';
import {ReelsData} from '../../configs/types';

const sampleReels: ReelsData[] = [
  {
    id: '1',
    src: require('../../assets/videos/Video-670.mp4'),
    img: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
    name: 'John Doe',
    comment: 'Just tried this amazing new pasta recipe. Highly recommend!',
  },
  {
    id: '2',
    src: require('../../assets/videos/Video-579.mp4'),
    img: 'https://images.unsplash.com/photo-1514626585111-9aa86183ac98',
    name: 'Jane Smith',
    comment: "Homemade pizza night! 🍕 What's your favorite topping?",
  },
  {
    id: '3',
    src: require('../../assets/videos/1111421-hd_1920_1080_30fps.mp4'),
    img: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
    name: 'Alice Johnson',
    comment: 'Freshly baked cookies straight out of the oven. Smells heavenly!',
  },
  {
    id: '4',
    src: require('../../assets/videos/Video-291.mp4'),
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    name: 'Alice Brown',
    comment:
      'Exploring new flavors with this exotic fruit salad. So refreshing!',
  },
];

const Reels = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);

  const keyExtractor = useCallback((item: any) => item.id, []);

  const viewabilityConfig = useRef({itemVisiblePercentThreshold: 80});
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  );

  const ReelComp = useCallback(
    ({item, index}: {item: ReelsData; index: number}) => (
      <MediaReel data={item} currentIndex={index} index={activeIndex} />
    ),
    [activeIndex],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={sampleReels}
      renderItem={ReelComp}
      keyExtractor={keyExtractor}
      pagingEnabled
      maxToRenderPerBatch={2}
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      onEndReached={() => setFetching(true)} // change to false when fetched
      ListFooterComponent={fetching ? <Spinner /> : null}
    />
  );
};

export default Reels;
