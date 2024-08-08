import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ChatListData} from '../../configs/types';
import {Chatlist, Conversation} from '../../screens';

export type ChatStackParamList = {
  chats: undefined;
  conversation: {
    data: ChatListData; // temp passing whole static data. Pass user id to fetch chat
  };
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
      <Stack.Screen
        name="conversation"
        component={Conversation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
