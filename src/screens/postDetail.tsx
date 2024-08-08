import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {CommentBox, FoodCard, InputBox} from '../components';
import {CommentData} from '../configs/types';
import {HomeStackParamList} from '../navigation/stacks/home';

const data: CommentData[] = [
  {
    id: 1,
    image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    name: 'Frank Odalthh',
    createdAt: 4,
    comment: 'Lorem ipsum dolor sit amet, commodo ligula eget dolor.',
  },
  {
    id: 2,
    image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    name: 'John DoeLink',
    createdAt: 2,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 3,
    image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    name: 'March SoulLaComa',
    createdAt: 6,
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ',
  },
  {
    id: 4,
    image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    name: 'Finn DoRemiFaso',
    createdAt: 10,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 5,
    image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    name: 'Maria More More',
    createdAt: 8,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
  {
    id: 6,
    image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    name: 'Clark June Boom!',
    createdAt: 10,
    comment: 'Lorem ipsum dolor sit amet.',
  },
  {
    id: 7,
    image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    name: 'The googler',
    createdAt: 10,
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
  },
];

type PostDetailProps = NativeStackScreenProps<HomeStackParamList, 'postDetail'>;

const PostDetail = ({navigation}: PostDetailProps): JSX.Element => {
  const [comments, setComments] = useState(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <FlatList
        ListHeaderComponent={
          <>
            <FoodCard />
            <View style={styles.wrapper}>
              <InputBox placeholder="Send your comment..." />
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
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
