import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {ChatListData} from '../../configs/types';
import BoldText from '../common/BoldText';

const List = ({data}: {data: ChatListData}): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.wrapper, styles.container]}>
      <Avatar.Image
        size={65}
        source={{
          uri: data.avatar,
        }}
      />
      <View style={styles.contentWrapper}>
        <BoldText variant="titleMedium">{data.username}</BoldText>
        <View style={[styles.wrapper, styles.msgContainer]}>
          <Text variant="bodyMedium" style={styles.msg} numberOfLines={2}>
            {data.lastMessage}
          </Text>
          <BoldText variant="bodySmall">{data.timestamp}</BoldText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default List;

interface Style {
  wrapper: ViewStyle;
  container: ViewStyle;
  contentWrapper: ViewStyle;
  msgContainer: ViewStyle;
  msg: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flexDirection: 'row',
    columnGap: 15,
  },
  container: {
    padding: 15,
  },
  contentWrapper: {
    flex: 1,
  },
  msgContainer: {
    justifyContent: 'space-between',
  },
  msg: {
    flexShrink: 1,
  },
});
