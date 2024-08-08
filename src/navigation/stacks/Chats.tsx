import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Chatlist} from '../../screens';

export type ChatStackParamList = {
  chats: undefined;
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

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
