import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconBtn, Suggestion, TrendingItem} from '../../components';
import {textConfig} from '../../configs';
import {useAppTheme} from '../../themes/theme';

const sampleTrending = [
  {
    id: 'image1',
    url: 'https://images.unsplash.com/photo-1722689417442-65b2a3012952',
    category: 'culinary',
  },
  {
    id: 'image2',
    url: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5',
    category: 'fruit',
  },
  {
    id: 'image3',
    url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    category: 'burger',
  },
  {
    id: 'image4',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    category: 'cereal',
  },
  {
    id: 'image5',
    url: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9',
    category: 'fruit',
  },
  {
    id: 'image6',
    url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f',
    category: 'ice cream',
  },
  {
    id: 'image7',
    url: 'https://images.unsplash.com/photo-1483918793747-5adbf82956c4',
    category: 'drinks',
  },
  {
    id: 'image8',
    url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    category: 'pancake',
  },
  {
    id: 'image9',
    url: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7',
    category: 'asian food',
  },
  {
    id: 'image10',
    url: 'https://images.unsplash.com/photo-1700760934249-93efbb574d23',
    category: 'pizza',
  },
  {
    id: 'image11',
    url: 'https://images.unsplash.com/photo-1612095437389-d459aee25de4',
    category: 'coffee',
  },
  {
    id: 'image12',
    url: 'https://images.unsplash.com/photo-1504674900247-dac964293360',
    category: 'healthy',
  },
];

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const theme = useAppTheme();
  return (
    <View>
      <View style={styles.searchWrapper}>
        <Searchbar
          icon={({color}) => <Icon name={'search'} color={color} size={20} />}
          placeholder={textConfig.search_placeholder}
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <FlatList
        data={sampleTrending}
        renderItem={({item}) => <TrendingItem data={item} />}
        keyExtractor={item => item?.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text variant="titleMedium" style={styles.title}>
              {textConfig.suggestion}
            </Text>
            <FlatList
              horizontal
              data={Array(6).fill(null)}
              renderItem={({item}) => <Suggestion />}
              keyExtractor={(item, idx) => item?.id.toString() || idx}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardWrapper}
              ListFooterComponent={
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.seeAllWrapper}>
                  <IconBtn name="grid-outline" size={24} />
                  <Text variant="titleSmall">{textConfig.allSuggestion}</Text>
                </TouchableOpacity>
              }
            />
            <Text variant="titleMedium" style={styles.title}>
              {textConfig.trending}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Search;

interface Style {
  searchWrapper: ViewStyle;
  cardWrapper: ViewStyle;
  title: TextStyle;
  seeAllWrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  searchWrapper: {
    padding: 15,
  },
  cardWrapper: {paddingHorizontal: 20, columnGap: 20},
  title: {
    marginLeft: 10,
    marginVertical: 15,
  },
  seeAllWrapper: {
    flex: 1,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
