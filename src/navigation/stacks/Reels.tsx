import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Reels} from '../../screens';

type RootStackParamList = {
  reels: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ReelStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="reels">
      <Stack.Screen
        name="reels"
        component={Reels}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ReelStack;
