import {RouteProp, useRoute} from '@react-navigation/native';
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
import {Comments} from '../mockData';
import {HomeStackParamList} from '../navigation/stacks/home';

type PostDetailProps = NativeStackScreenProps<HomeStackParamList, 'postDetail'>;
type PostDetailRouteProp = RouteProp<HomeStackParamList, 'postDetail'>;

const PostDetail = ({navigation}: PostDetailProps): JSX.Element => {
  const [comments, setComments] = useState(Comments);

  const {params} = useRoute<PostDetailRouteProp>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <FlatList
        ListHeaderComponent={
          <>
            <FoodCard data={params.data} />
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
