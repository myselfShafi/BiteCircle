import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Appbar, Avatar, Text, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, Bubble, InputBox, MainView} from '../../components';
import {textConfig} from '../../configs';
import {ChatData} from '../../configs/types';
import {sampleChat} from '../../mockData';
import {StackParamList} from '../../navigation/navigator';

type ConversationProps = NativeStackScreenProps<StackParamList, 'conversation'>;
type ConversationRouteProp = RouteProp<StackParamList, 'conversation'>;

const ConversationHeader = memo(
  ({navigation}: {navigation: ConversationProps['navigation']}) => {
    const theme = useTheme();

    const {params} = useRoute<ConversationRouteProp>();
    const {avatar, lastMessage, status, timestamp, username} = params.data;

    return (
      <Appbar.Header style={{backgroundColor: theme.colors.elevation.level2}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={[styles.wrapper, styles.profile]}>
          <Avatar.Image size={50} source={{uri: avatar}} />
          <View>
            <BoldText variant="titleMedium">{username}</BoldText>
            <View style={[styles.wrapper, styles.status]}>
              <IonIcon
                name={status ? 'ellipse' : 'ellipse-outline'}
                size={8}
                color={status ? theme.colors.secondary : ''}
              />
              <Text
                variant="bodySmall"
                style={{color: status ? theme.colors.secondary : ''}}>
                {status ? textConfig.online : textConfig.lastActive}
              </Text>
            </View>
          </View>
        </View>
        <Appbar.Action
          icon={({color, size}) => (
            <IonIcon name={'call-outline'} size={size} color={color} />
          )}
          onPress={() => {}}
        />
        <Appbar.Action
          icon={({color, size}) => (
            <IonIcon name={'videocam-outline'} size={size} color={color} />
          )}
          onPress={() => {}}
        />
      </Appbar.Header>
    );
  },
);

const Conversation = ({navigation}: ConversationProps): JSX.Element => {
  const theme = useTheme();

  const flatListRef = useRef<FlatList<ChatData>>(null);

  const [chatData, setChatData] = useState<ChatData[]>(sampleChat);
  const [sendChat, setSendChat] = useState<string>('');

  const sentTime = new Date().toISOString();

  const onChangeText = (text: string) => setSendChat(text);
  const handleSend = () => {
    if (sendChat !== '') {
      setChatData(prev => [
        ...prev,
        {
          id: sentTime,
          sender: false,
          status: 1,
          message: sendChat,
          timestamp: sentTime,
        },
      ]);
      Keyboard.dismiss();
      setSendChat('');
    }
  };

  useEffect(() => {
    const scrollEnd = setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: false});
    }, 100);
    return () => clearTimeout(scrollEnd);
  }, [chatData]);

  return (
    <MainView>
      <ConversationHeader navigation={navigation} />
      <FlatList
        ref={flatListRef}
        data={chatData}
        renderItem={({item}) => <Bubble data={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
      <View style={styles.input}>
        <InputBox
          placeholder="Type your message.."
          value={sendChat}
          onChangeText={onChangeText}
          handleSend={handleSend}
        />
      </View>
      <StatusBar
        backgroundColor={theme.colors.elevation.level2}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        animated
      />
    </MainView>
  );
};

export default Conversation;

interface Style {
  wrapper: ViewStyle;
  profile: ViewStyle;
  container: ViewStyle;
  status: ViewStyle;
  input: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    flex: 1,
    columnGap: 10,
  },
  container: {
    rowGap: 10,
    paddingTop: 10,
  },
  status: {
    columnGap: 4,
  },
  input: {
    padding: 10,
  },
});
