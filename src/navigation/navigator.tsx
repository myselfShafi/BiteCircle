import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar, MaterialBottomTabScreenProps} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {dummyImg} from '../components/FoodCard';
import {ChatListData} from '../configs/types';
import {Conversation, Profile} from '../screens';
import {useAppTheme} from '../themes/theme';
import {ChatStack, HomeStack, ReelStack, SearchStack} from './stacks';

export type StackParamList = {
  app: MaterialBottomTabScreenProps<RootTabParamList>;
  conversation: {
    data: ChatListData; // temp passing whole static data. Pass user id to fetch chat
  };
  profile: undefined;
};

type RootTabParamList = {
  homeTab: undefined;
  searchTab: undefined;
  reelTab: undefined;
  chatTab: undefined;
  profileTab: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const TabNavigator = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('homeTab');

  const ComponentPlaceholder = () => <View></View>;
  return (
    <Tab.Navigator
      labeled={false}
      keyboardHidesNavigationBar
      activeIndicatorStyle={[styles.activeIndicator]}
      barStyle={activeTab === 'reelTab' && styles.barStyle}
      screenListeners={({route}) => ({
        tabPress: () => setActiveTab(route.name),
      })}>
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
        component={ReelStack}
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
        component={ChatStack}
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
        component={ComponentPlaceholder}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Avatar.Image size={40} source={{uri: dummyImg}} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.getParent()?.navigate('profile');
          },
        })}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = (): JSX.Element => {
  const appTheme = useAppTheme();

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
        initialRouteName={'app'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'app'} component={TabNavigator} />
        <Stack.Screen name="conversation" component={Conversation} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
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
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  activeIndicator: {
    width: 40,
    height: 40,
  },
});
