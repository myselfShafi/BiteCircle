import React, {useState} from 'react';
import {FlatList, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Suggestion} from '../../components';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');
  return (
    <View>
      <View style={styles.searchWrapper}>
        <Searchbar
          icon={({color}) => <Icon name={'search'} color={color} size={20} />}
          placeholder="Looking for the best cooking ideas?"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <FlatList
        data={Array(12).fill(null)}
        renderItem={item => <Text>afasa</Text>}
        keyExtractor={(item, index) => item?.id || index}
        ListHeaderComponent={
          <View>
            <Text variant="titleMedium" style={styles.title}>
              Suggestions
            </Text>
            <FlatList
              horizontal
              data={Array(6).fill(null)}
              renderItem={({item}) => <Suggestion />}
              keyExtractor={(item, idx) => item?.id.toString() || idx}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardWrapper}
            />
            <Text variant="titleMedium" style={styles.title}>
              Trending
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
}

const styles: Style = StyleSheet.create<Style>({
  searchWrapper: {
    padding: 15,
  },
  cardWrapper: {padding: 20, columnGap: 20},
  title: {
    marginLeft: 10,
  },
});
