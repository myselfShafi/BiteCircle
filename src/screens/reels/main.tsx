import React from 'react';
import {FlatList, StyleSheet, ViewStyle} from 'react-native';
import {MediaReel} from '../../components';
import {ReelsData} from '../../configs/types';

const sampleReels: ReelsData[] = [
  {
    id: '1',
    src: '../../assets/videos/demo-1.mp4',
    img: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
    name: 'John Doe',
    comment: 'Just tried this amazing new pasta recipe. Highly recommend!',
  },
  {
    id: '2',
    src: '../../assets/videos/demo-2.mp4',
    img: 'https://images.unsplash.com/photo-1514626585111-9aa86183ac98',
    name: 'Jane Smith',
    comment: "Homemade pizza night! 🍕 What's your favorite topping?",
  },
  {
    id: '3',
    src: '../../assets/videos/1111421-hd_1920_1080_30fps.mp4',
    img: 'https://images.unsplash.com/photo-1508184964240-ee96bb9677a7',
    name: 'Alice Johnson',
    comment: 'Freshly baked cookies straight out of the oven. Smells heavenly!',
  },
  {
    id: '4',
    src: '../../assets/videos/7525507-hd_1080_1920_25fps.mp4',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    name: 'Alice Brown',
    comment:
      'Exploring new flavors with this exotic fruit salad. So refreshing!',
  },
];

const Reels = (): JSX.Element => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.wrapper}
      data={sampleReels}
      renderItem={({item}) => <MediaReel data={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default Reels;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    width: '100%',
    height: '100%',
  },
});
