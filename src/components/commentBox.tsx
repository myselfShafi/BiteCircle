import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';

interface CommentData {
  id: number;
  image: string;
  name: string;
  comment: string;
}
type CommentProps = {
  data: CommentData;
};

const CommentBox = ({data}: CommentProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Avatar.Image size={40} source={{uri: data.image}} />
      <Card mode="contained" style={styles.card}>
        <Card.Title title={data.name} />
        <Card.Content>
          <Text>{data.comment}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CommentBox;

interface Style {
  wrapper: ViewStyle;
  card: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  card: {},
});
