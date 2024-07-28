import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar, Surface, Text} from 'react-native-paper';
import {CommentData} from '../configs/types';

type CommentProps = {
  data: CommentData;
};

const CommentBox = ({data}: CommentProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Avatar.Image size={40} source={{uri: data.image}} />
      <Surface elevation={0} style={styles.surface}>
        <View style={styles.title}>
          <Text variant="titleMedium">{data.name}</Text>
          <Text variant="labelSmall">{data.createdAt} hrs</Text>
        </View>
        <Text variant="bodyMedium">{data.comment}</Text>
      </Surface>
    </View>
  );
};

export default CommentBox;

interface Style {
  wrapper: ViewStyle;
  surface: ViewStyle;
  title: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    columnGap: 10,
  },
  surface: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
