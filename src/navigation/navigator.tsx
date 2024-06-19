import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStack, SearchStack} from './stacks';

type RootTabParamList = {
  homeTab: undefined;
  searchTab: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator labeled={false}>
        <Tab.Screen
          name="homeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'home-circle' : 'home-circle-outline'}
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="searchTab"
          component={SearchStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'food-drumstick' : 'food-drumstick-outline'}
                color={color}
                size={25}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
