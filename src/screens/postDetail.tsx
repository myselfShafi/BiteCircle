import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {CommentBox, FoodCard, InputBox} from '../components';

interface CommentData {
  id: number;
  image: string;
  name: string;
  comment: string;
}

const data: CommentData[] = [
  {
    id: 1,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Frank Odalthh',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 2,
    image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    name: 'John DoeLink',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 3,
    image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    name: 'March SoulLaComa',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 4,
    image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    name: 'Finn DoRemiFaso',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 5,
    image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Maria More More',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 6,
    image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    name: 'Clark June Boom!',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 7,
    image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    name: 'The googler',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
];

const PostDetail = (): JSX.Element => {
  const [comments, setComments] = useState(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <FlatList
        ListHeaderComponent={
          <>
            <FoodCard mode="contained" />
            <View style={styles.wrapper}>
              <InputBox placeholder="Send your comment..." />
            </View>
          </>
        }
        data={comments}
        renderItem={item => <CommentBox data={item.item} />}
        keyExtractor={item => item.id.toString()}
      />
    </KeyboardAvoidingView>
  );
};

export default PostDetail;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    padding: 20,
  },
});
