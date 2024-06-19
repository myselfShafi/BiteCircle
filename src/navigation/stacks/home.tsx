import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home} from '../../screens';

type RootStackParamList = {
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
