import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home} from '../screens';

type RootStackParamList = {
  home: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
