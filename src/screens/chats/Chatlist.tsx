import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {Divider, useTheme} from 'react-native-paper';
import {BoldText, IconBtn, List} from '../../components';
import {textConfig} from '../../configs';
import {ChatListData} from '../../configs/types';

const sampleChats: ChatListData[] = [
  {
    id: 1,
    username: 'John Doe',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    lastMessage: 'Hey, how are you?',
    timestamp: '9:15 PM',
  },
  {
    id: 2,
    username: 'Jane Smith',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    lastMessage: 'See you tomorrow!',
    timestamp: '8:45 PM',
  },
  {
    id: 3,
    username: 'Alice Johnson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    lastMessage:
      "See you tomorrow! Don't forget to bring the documents we talked about earlier. It's important for the meeting.",
    timestamp: '8:30 PM',
  },
  {
    id: 4,
    username: 'Michael Brown',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    lastMessage: 'Thank you!',
    timestamp: '8:00 PM',
  },
  {
    id: 5,
    username: 'Emily Davis',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    lastMessage:
      "I'll call you later. We need to discuss the new project and allocate the tasks accordingly.",
    timestamp: '7:45 PM',
  },
  {
    id: 6,
    username: 'David Wilson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    lastMessage: 'Where are you?',
    timestamp: '7:30 PM',
  },
  {
    id: 7,
    username: 'Sophia Martinez',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    lastMessage: 'Good night!',
    timestamp: '7:00 PM',
  },
  {
    id: 8,
    username: 'Chris Lee',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
    lastMessage: "Let's meet at 5 PM.  😊",
    timestamp: '6:45 PM',
  },
  {
    id: 9,
    username: 'Olivia Gonzalez',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar9.png',
    lastMessage:
      "What's up? I haven't heard from you in a while. Just checking in to see how things are going.",
    timestamp: '6:30 PM',
  },
  {
    id: 10,
    username: 'Matthew Anderson',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar10.png',
    lastMessage: 'See you soon.',
    timestamp: '6:00 PM',
  },
  {
    id: 11,
    username: 'Ava Thomas',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar11.png',
    lastMessage: 'Got it, thanks.',
    timestamp: '5:45 PM',
  },
  {
    id: 12,
    username: 'James Taylor',
    avatar: 'https://bootdey.com/img/Content/avatar/avatar12.png',
    lastMessage: "I'll be there soon.",
    timestamp: '5:30 PM',
  },
];

const Chatlist = (): JSX.Element => {
  const theme = useTheme();
  return (
    <View>
      <FlatList
        data={sampleChats}
        renderItem={({item}) => <List data={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider horizontalInset bold />}
        ListHeaderComponent={
          <View
            style={[
              styles.header,
              styles.flexRow,
              {backgroundColor: theme.colors.elevation.level2},
            ]}>
            <View style={styles.flexRow}>
              <BoldText variant="headlineLarge">{textConfig.chat}</BoldText>
              <BoldText variant="bodyLarge">(12 unread)</BoldText>
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
});
