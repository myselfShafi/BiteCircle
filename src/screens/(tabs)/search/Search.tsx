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
import {
  BoldText,
  IconBtn,
  MainView,
  Suggestion,
  TrendingItem,
} from '../../../components';
import {textConfig} from '../../../configs';
import {SampleSuggestions, sampleTrending} from '../../../mockData';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');

  return (
    <MainView>
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
            <BoldText variant="titleMedium" style={styles.title}>
              {textConfig.suggestion}
            </BoldText>
            <FlatList
              horizontal
              data={SampleSuggestions}
              renderItem={({item}) => <Suggestion data={item} />}
              keyExtractor={(item, idx) => item?.id}
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
            <BoldText variant="titleMedium" style={styles.title}>
              {textConfig.trending}
            </BoldText>
          </View>
        }
      />
    </MainView>
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
