import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PostData} from '../../configs/types';
import {AddPost, Home, PostDetail} from '../../screens';

export type HomeStackParamList = {
  home: undefined;
  postDetail: {
    data: PostData;
  }; //temporary
  createPost: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="postDetail" component={PostDetail} />
      <Stack.Screen name="createPost" component={AddPost} />
    </Stack.Navigator>
  );
};

export default HomeStack;
