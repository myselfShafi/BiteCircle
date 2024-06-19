import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home} from '../../screens';

type RootStackParamList = {
  search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const SearchStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="search">
      <Stack.Screen
        name="search"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
