import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, IconBtn, List} from '../../components';
import {textConfig} from '../../configs';
import {ChatListData} from '../../configs/types';
import {ChatStackParamList} from '../../navigation/stacks/Chats';

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

  const navigate = (data: ChatListData) => {
    // temp passing whole data, pass user id to fetch chat
    navigation.navigate('conversation', {data});
  };
  return (
    <View>
      <FlatList
        data={sampleChats}
        renderItem={({item}) => <List data={item} onPress={navigate} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View
            style={[
              styles.header,
              styles.flexRow,
              {backgroundColor: theme.colors.elevation.level2},
            ]}>
            <View style={styles.flexRow}>
              <BoldText variant="headlineLarge">{textConfig.chat}</BoldText>
              <BoldText variant="bodyLarge">(3 unread)</BoldText>
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
                onPress={() => console.log('settings ..')}
              />
            </View>
          </View>
        }
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default Chatlist;

interface Style {
  header: ViewStyle;
  flexRow: ViewStyle;
  container: ViewStyle;
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
  },
});
