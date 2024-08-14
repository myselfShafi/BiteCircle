import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PostData} from '../../configs/types';
import {Home, PostDetail} from '../../screens';

export type HomeStackParamList = {
  home: undefined;
  postDetail: {
    data: PostData;
  }; //temporary
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="postDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
