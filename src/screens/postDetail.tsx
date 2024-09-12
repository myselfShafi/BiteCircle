import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Appbar, TextInput, useTheme} from 'react-native-paper';
import {CommentBox, FoodCard, InputBox} from '../components';
import {Comments} from '../mockData';
import {HomeStackParamList} from '../navigation/stacks/home';

type PostDetailProps = NativeStackScreenProps<HomeStackParamList, 'postDetail'>;
type PostDetailRouteProp = RouteProp<HomeStackParamList, 'postDetail'>;

const PostDetail = ({navigation}: PostDetailProps): JSX.Element => {
  const theme = useTheme();
  const [comments, setComments] = useState(Comments);
  const commentRef = useRef(null);
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
              <InputBox
                placeholder="Send your comment..."
                ref={commentRef}
                style={styles.border}
                left={
                  <TextInput.Icon
                    icon={'emoticon-outline'}
                    size={22}
                    onPress={() => console.log('comment Pressed')}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={'send-circle-outline'}
                    size={30}
                    color={theme.colors.secondary}
                  />
                }
              />
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
  border: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    padding: 20,
  },
  border: {
    borderTopLeftRadius: 0,
  },
});
