import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {HomeStack, SearchStack} from './stacks';

type RootTabParamList = {
  homeTab: undefined;
  searchTab: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="homeTab"
          component={HomeStack}
          // options={{
          //   tabBarIcon: ({focused, color}) => (
          //     <Icon name="bell" color={color} size={25} />
          //   ),
          // }}
        />
        <Tab.Screen name="searchTab" component={SearchStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
