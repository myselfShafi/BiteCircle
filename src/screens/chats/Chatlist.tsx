import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Button, Divider, Switch, Text, useTheme} from 'react-native-paper';
import {
  BoldText,
  IconBtn,
  List,
  MainView,
  ModalWrapper,
} from '../../components';
import {textConfig} from '../../configs';
import {ChatListData} from '../../configs/types';
import {useAppTheme} from '../../context/Theme';
import {ChatStackParamList} from '../../navigation/stacks/Chats';
import {SCREEN_WIDTH} from '../../utils/constants';

const sampleChats: ChatListData[] = [
  {
    id: 1,
    username: 'John Doe',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    lastMessage: 'Hey, how are you?',
    timestamp: '9:15 PM',
    status: true,
    unread: 3,
  },
  {
    id: 2,
    username: 'Jane Smith',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    lastMessage: 'See you tomorrow!',
    timestamp: '8:45 PM',
    status: true,
    unread: 1,
  },
  {
    id: 3,
    username: 'Alice Johnson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    lastMessage:
      "See you tomorrow! Don't forget to bring the documents we talked about earlier. It's important for the meeting.",
    timestamp: '8:30 PM',
    status: false,
  },
  {
    id: 4,
    username: 'Michael Brown',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    lastMessage: 'Thank you!',
    timestamp: '8:00 PM',
    status: false,
  },
  {
    id: 5,
    username: 'Emily Davis',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    lastMessage:
      "I'll call you later. We need to discuss the new project and allocate the tasks accordingly.",
    timestamp: '7:45 PM',
    status: false,
  },
  {
    id: 6,
    username: 'David Wilson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    lastMessage: 'Where are you?',
    timestamp: '7:30 PM',
    status: true,
  },
  {
    id: 7,
    username: 'Sophia Martinez',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    lastMessage: 'Good night!',
    timestamp: '7:00 PM',
    status: false,
  },
  {
    id: 8,
    username: 'Chris Lee',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
    lastMessage: "Let's meet at 5 PM.  😊",
    timestamp: '6:45 PM',
    status: true,
  },
  {
    id: 9,
    username: 'Olivia Gonzalez',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar9.png',
    lastMessage:
      "What's up? I haven't heard from you in a while. Just checking in to see how things are going.",
    timestamp: 'Thu',
    status: false,
    unread: 4,
  },
  {
    id: 10,
    username: 'Matthew Anderson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar10.png',
    lastMessage: 'See you soon.',
    timestamp: 'Thu',
    status: false,
  },
  {
    id: 11,
    username: 'Ava Thomas',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar11.png',
    lastMessage: 'Got it, thanks.',
    timestamp: 'Sat',
    status: false,
  },
  {
    id: 12,
    username: 'James Taylor',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar12.png',
    lastMessage: "I'll be there soon.",
    timestamp: 'Sat',
    status: false,
  },
];

type ChatlistProps = NativeStackScreenProps<ChatStackParamList, 'chats'>;

const Chatlist = ({navigation}: ChatlistProps): JSX.Element => {
  const theme = useTheme();
  const {isDark} = useAppTheme();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(theme.colors.elevation.level2);
      StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
      return () => {
        StatusBar.setBackgroundColor(theme.colors.background);
        StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
      };
    }, [theme, isDark]),
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);
  const [chatNotify, setChatNotify] = useState<boolean>(true);
  const [backup, setBackup] = useState<boolean>(false);
  const [data, setData] = useState(sampleChats);

  const toggleStatus = () => setStatus(prev => !prev);
  const toggleNotification = () => setChatNotify(prev => !prev);
  const toggleBackup = () => setBackup(prev => !prev);
  const handleOpen = () => setVisible(true);

  const navigate = (data: ChatListData) => {
    // temp passing whole data, pass user id to fetch chat
    navigation.getParent()?.navigate('conversation', {data});
  };

  const onDelete = (id: number) => {
    setData(prev => prev.filter(list => list.id !== id));
  };

  return (
    <MainView>
      <View
        style={[
          styles.header,
          styles.flexRow,
          {backgroundColor: theme.colors.elevation.level2},
        ]}>
        <View style={styles.flexRow}>
          <BoldText variant="headlineLarge">{textConfig.chat}</BoldText>
          {data.length > 0 && (
            <BoldText variant="bodyLarge">(3 unread)</BoldText>
          )}
        </View>
        <View style={styles.flexRow}>
          <IconBtn
            name="search-outline"
            size={25}
            bgColor={'transparent'}
            rippleColor={'transparent'}
            onPress={() => console.log('searching ..')}
          />
          <IconBtn
            name="ellipsis-vertical-circle-outline"
            size={25}
            onPress={handleOpen}
          />
        </View>
        <ModalWrapper
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalView}
          disableBackdrop>
          <BoldText variant={'titleMedium'} style={styles.title}>
            {textConfig.chatSettings}
          </BoldText>
          <Divider bold style={styles.divider} />
          <View style={styles.status}>
            <Text variant={'titleSmall'}>{textConfig.activity}</Text>
            <Text>
              <Switch
                value={status}
                onValueChange={toggleStatus}
                color={theme.colors.secondary}
              />
            </Text>
          </View>
          <View style={styles.status}>
            <Text variant={'titleSmall'}>{textConfig.chatNotification}</Text>
            <Text>
              <Switch value={chatNotify} onValueChange={toggleNotification} />
            </Text>
          </View>
          <Divider bold style={styles.divider} />
          <View style={styles.status}>
            <View style={styles.text}>
              <Text variant={'titleSmall'}>{textConfig.backup}</Text>
              <Text variant={'bodySmall'}>{textConfig.backupInfo}</Text>
            </View>
            <IconBtn
              name={backup ? 'checkmark-circle' : 'ellipse-outline'}
              onPress={toggleBackup}
              bgColor={theme.colors.errorContainer}
            />
          </View>
        </ModalWrapper>
      </View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          bounces={false}
          renderItem={({item}) => (
            <List data={item} onPress={navigate} onDelete={onDelete} />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />
      ) : (
        <View style={styles.emptyView}>
          <BoldText variant="titleLarge">
            {textConfig.emptyState.chatsHeader}
          </BoldText>
          <Text variant="bodyLarge" style={styles.title}>
            {textConfig.emptyState.chatsTitle}
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.getParent()?.navigate('searchTab')}>
            {textConfig.emptyState.chatsBtn}
          </Button>
        </View>
      )}
    </MainView>
  );
};

export default Chatlist;

interface Style {
  header: ViewStyle;
  flexRow: ViewStyle;
  container: ViewStyle;
  modalView: ViewStyle;
  status: ViewStyle;
  title: TextStyle;
  divider: ViewStyle;
  text: TextStyle;
  emptyView: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  header: {
    padding: 10,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  container: {
    rowGap: 10,
    paddingVertical: 10,
  },
  modalView: {
    padding: 15,
    width: (SCREEN_WIDTH * 5) / 6,
  },

  status: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  divider: {
    width: '60%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  text: {flexShrink: 1},
  emptyView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH * 3) / 4,
    alignSelf: 'center',
    rowGap: 10,
  },
});
