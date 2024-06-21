import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {FoodCard, InputBox} from '../components';

const PostDetail = (): JSX.Element => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <ScrollView>
        <FoodCard />
        <View style={styles.wrapper}>
          <InputBox placeholder="Send your comment..." />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});
