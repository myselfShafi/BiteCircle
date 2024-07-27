import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {dummyImg} from '../components/FoodCard';
import {useAppTheme} from '../themes/theme';
import {HomeStack, SearchStack} from './stacks';

type RootTabParamList = {
  homeTab: undefined;
  searchTab: undefined;
  reelTab: undefined;
  chatTab: undefined;
  profileTab: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const AppNavigator = (): JSX.Element => {
  const appTheme = useAppTheme();

  return (
    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
        labeled={false}
        keyboardHidesNavigationBar
        activeIndicatorStyle={[styles.activeIndicator]}>
        <Tab.Screen
          name="homeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'home-sharp' : 'home-outline'}
                color={color}
                size={25}
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
                name={focused ? 'search' : 'search-outline'}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="reelTab"
          component={SearchStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'film' : 'film-outline'}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="chatTab"
          component={SearchStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon
                name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="profileTab"
          component={SearchStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Avatar.Image size={40} source={{uri: dummyImg}} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

interface Style {
  barStyle: ViewStyle;
  activeIndicator: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  barStyle: {
    borderTopWidth: 0,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  activeIndicator: {
    width: 40,
    height: 40,
  },
});
