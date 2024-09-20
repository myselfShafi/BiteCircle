import React, {useCallback, useRef, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';
import {MediaReel, Spinner} from '../../../components';
import {ReelsData} from '../../../configs/types';
import {sampleReels} from '../../../mockData';

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
