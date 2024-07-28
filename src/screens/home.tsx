import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, Image, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {FoodCard} from '../components';
import {textConfig} from '../configs';
import {HomeStackParamList} from '../navigation/stacks/home';
import {useAppTheme} from '../themes/theme';

type HomeProps = NativeStackScreenProps<HomeStackParamList, 'home'>;

const Home = ({navigation}: HomeProps): JSX.Element => {
  const theme = useAppTheme();
  return (
    <View style={[styles.container]}>
      <View style={styles.appbar}>
        <View style={styles.logo}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: 50, height: 50}}
          />
          <Text variant="headlineSmall">{textConfig.app_Title}</Text>
        </View>
        <Icon
          name={'notifications-outline'}
          color={theme.colors.primary}
          size={25}
          style={[styles.bell, {backgroundColor: theme.colors.card}]}
        />
      </View>
      <FlatList
        data={new Array(4).fill(null)}
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
  logo: ViewStyle;
  bell: ViewStyle;
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bell: {
    padding: 6,
    borderRadius: 10,
  },
});
