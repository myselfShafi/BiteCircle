import React from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

const Home = (): JSX.Element => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Text
        variant="displayLarge"
        style={{backgroundColor: theme.colors.primary}}>
        Home
      </Text>
    </View>
  );
};

export default Home;
