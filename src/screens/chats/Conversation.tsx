import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {Appbar, Avatar, Text, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {BoldText, Bubble} from '../../components';
import {textConfig} from '../../configs';
import {ChatData} from '../../configs/types';
import {ChatStackParamList} from '../../navigation/stacks/Chats';

type ConversationProps = NativeStackScreenProps<
  ChatStackParamList,
  'conversation'
>;
type ConversationRouteProp = RouteProp<ChatStackParamList, 'conversation'>;

const sampleChat: ChatData[] = [
  {
    id: '1',
    timestamp: '2024-08-04T10:15:30Z',
    sender: true,
    message:
      'Hey, have you tried the new Italian restaurant downtown? The pasta there is amazing!',
  },
  {
    id: '2',
    timestamp: '2024-08-05T10:16:05Z',
    sender: false,
    status: 3, // temporary, in use for msg sent-1, received-2, delivered-3
    message: "No, I haven't been there yet. What did you order?",
  },
  {
    id: '3',
    timestamp: '2024-08-06T10:17:15Z',
    sender: true,
    message:
      "I had the spaghetti carbonara, and it was probably the best I've ever had. They use fresh ingredients, and you can really taste the difference.",
  },
  {
    id: '4',
    timestamp: '2024-08-06T10:18:45Z',
    sender: false,
    status: 3, // temporary, in use for msg sent-1, received-2, delivered-3
    message:
      'That sounds delicious! I love carbonara. Did you try any of their appetizers or desserts?',
  },
  {
    id: '5',
    timestamp: '2024-08-07T10:20:00Z',
    sender: true,
    message:
      'Yes, we had the bruschetta for an appetizer, which was very fresh and flavorful. For dessert, we tried their tiramisu, and it was out of this world! The perfect end to a great meal.',
  },
  {
    id: '6',
    timestamp: '2024-08-08T10:21:30Z',
    sender: false,
    status: 3, // temporary, in use for msg sent-1, received-2, delivered-3
    message:
      "Wow, I'm definitely going to check it out. Thanks for the recommendation! Do they have any good vegetarian options?",
  },
  {
    id: '7',
    timestamp: '2024-08-08T10:22:45Z',
    sender: true,
    message:
      "Yes, they have a great selection of vegetarian dishes as well. My friend had the eggplant parmesan, and it was very tasty. You won't be disappointed!",
  },
  {
    id: '8',
    timestamp: '2024-08-08T10:24:10Z',
    sender: false,
    status: 2, // temporary, in use for msg sent-1, received-2, delivered-3
    message:
      "That's perfect. I'm always on the lookout for good vegetarian options. I'll make a reservation for this weekend. Thanks again!",
  },
];

const Conversation = ({navigation}: ConversationProps): JSX.Element => {
  const {params} = useRoute<ConversationRouteProp>();
  const {avatar, lastMessage, status, timestamp, username} = params.data;
  const theme = useTheme();

  return (
    <View>
      <FlatList
        data={sampleChat}
        renderItem={({item}) => <Bubble data={item} />}
        keyExtractor={(item, index) => index.toString()} //temp
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <Appbar.Header
            style={{backgroundColor: theme.colors.elevation.level2}}>
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
        }
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default Conversation;

interface Style {
  wrapper: ViewStyle;
  profile: ViewStyle;
  container: ViewStyle;
  status: ViewStyle;
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
  },
  status: {
    columnGap: 4,
  },
});
