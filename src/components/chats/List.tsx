import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Avatar, Badge, Surface, Text, useTheme} from 'react-native-paper';
import {ChatListData} from '../../configs/types';
import BoldText from '../common/BoldText';

const List = ({data}: {data: ChatListData}): JSX.Element => {
  const theme = useTheme();
  return (
    <Surface elevation={0} style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.wrapper}>
        <Avatar.Image
          size={65}
          source={{
            uri: data.avatar,
          }}
        />
        <Badge
          size={10}
          style={[
            styles.badge,
            {backgroundColor: theme.colors.secondary},
            data.status && {opacity: 1},
          ]}
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
    </Surface>
  );
};

export default List;

interface Style {
  wrapper: ViewStyle;
  container: ViewStyle;
  contentWrapper: ViewStyle;
  msgContainer: ViewStyle;
  msg: TextStyle;
  badge: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flexDirection: 'row',
    columnGap: 10,
  },
  container: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
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
  badge: {
    alignSelf: 'center',
    opacity: 0,
  },
});
