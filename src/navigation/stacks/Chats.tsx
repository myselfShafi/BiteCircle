import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Chatlist from '../../screens/chats/Chatlist';

type RootStackParamList = {
  chats: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ChatStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="chats">
      <Stack.Screen
        name="chats"
        component={Chatlist}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
