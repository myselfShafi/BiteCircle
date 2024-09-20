import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Button, Divider, Switch, Text} from 'react-native-paper';
import {
  BoldText,
  IconBtn,
  List,
  MainView,
  ModalWrapper,
} from '../../../components';
import {ModalWrapperProps} from '../../../components/common/Modal';
import {textConfig} from '../../../configs';
import {ChatListData} from '../../../configs/types';
import {useAppTheme} from '../../../context/Theme';
import {sampleChats} from '../../../mockData';
import {ChatStackParamList} from '../../../navigation/stacks/Chats';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {useStatusBar} from '../../../utils/hooks';

type ChatlistProps = NativeStackScreenProps<ChatStackParamList, 'chats'>;

const ChatlistSettings = memo(
  ({...props}: Omit<ModalWrapperProps, 'children'>): JSX.Element => {
    const {theme} = useAppTheme();

    const [status, setStatus] = useState<boolean>(true);
    const [chatNotify, setChatNotify] = useState<boolean>(true);
    const [backup, setBackup] = useState<boolean>(false);

    const toggleStatus = () => setStatus(prev => !prev);
    const toggleNotification = () => setChatNotify(prev => !prev);
    const toggleBackup = () => setBackup(prev => !prev);

    return (
      <ModalWrapper
        contentContainerStyle={styles.modalView}
        disableBackdrop
        {...props}>
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
    );
  },
);

const Chatlist = ({navigation}: ChatlistProps): JSX.Element => {
  const {theme} = useAppTheme();
  useStatusBar(
    theme.colors.elevation.level2,
    theme.dark ? 'light-content' : 'dark-content',
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState(sampleChats);

  const handleOpen = () => setVisible(true);
  const handleDismiss = useCallback(() => setVisible(false), []);

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
        <ChatlistSettings visible={visible} onDismiss={handleDismiss} />
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
