import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {
  Chip,
  FAB,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BoldText,
  CustomButton,
  IconBtn,
  InputBox,
  MainView,
  MediaUpload,
} from '../../../components';
import {textConfig} from '../../../configs';
import {HomeStackParamList} from '../../../navigation/stacks/home';

type AddPostProps = NativeStackScreenProps<HomeStackParamList, 'createPost'>;

const AddPost = ({navigation}: AddPostProps) => {
  const theme = useTheme();

  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<Asset[]>([]);
  const [tag, setTag] = useState<string>('');
  const [taglist, setTaglist] = useState<string[]>([]);
  const handleBack = () => navigation.goBack();

  const handleUpload = (imageData: Asset) => {
    setImages(prev => [...prev, imageData]);
  };

  const handleDelete = (file: Asset['fileName']) => {
    setImages(prev => prev.filter(img => img.fileName !== file));
  };

  const addTags = () => {
    if (!taglist.includes(tag)) {
      setTaglist(prev => [...prev, tag.toLowerCase()]);
      setTag('');
    }
  };

  const removeTags = (selectedTag: string) => {
    setTaglist(prev => prev.filter(list => list !== selectedTag));
  };

  return (
    <MainView style={styles.container}>
      <View style={[styles.header, styles.spacing]}>
        <IconBtn name={'return-up-back'} onPress={handleBack} />
        <BoldText variant="titleLarge" children={textConfig.create} />
        <CustomButton
          mode="text"
          color={theme.colors.primary}
          variant="titleMedium"
          size="small">
          {textConfig.publish}
        </CustomButton>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={[styles.spacing, styles.title]}>
          <Icon
            name={'clipboard-outline'}
            size={18}
            color={theme.colors.onSurface}
          />
          <BoldText variant="titleMedium" children={textConfig.description} />
        </View>
        <InputBox
          placeholder={textConfig.placeholders.postDesc}
          multiline
          numberOfLines={5}
          value={content}
          onChangeText={(text: string) => setContent(text)}
          maxLength={300}
        />
        <Text
          variant="bodySmall"
          style={[
            styles.max,
            content.length >= 300 && {color: theme.colors.error},
          ]}
          children={`${content.length}/300`}
        />
        <View style={[styles.spacing, styles.title]}>
          <Icon
            name={'images-outline'}
            size={18}
            color={theme.colors.onSurface}
          />
          <BoldText variant="titleMedium" children={textConfig.imgTitle} />
          <Text variant="bodySmall" children={`(${images.length}/5)`} />
        </View>
        <BoldText
          style={styles.text}
          variant="labelMedium"
          children={textConfig.imgSubTitle}
        />
        <Surface elevation={0} style={styles.surface}>
          <FlatList
            horizontal
            data={images}
            renderItem={({item}) => (
              <View>
                <Image source={{uri: item.uri}} style={styles.image} />
                <IconBtn
                  name="trash-outline"
                  size={15}
                  mode="outlined"
                  style={styles.delete}
                  bgColor={theme.colors.error}
                  onPress={() => handleDelete(item.fileName)}
                />
              </View>
            )}
            contentContainerStyle={[
              styles.imageWrapper,
              images.length === 0 && styles.center,
            ]}
            keyExtractor={(item, idx) => idx.toString()}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              images.length >= 5 ? null : (
                <MediaUpload setUpload={handleUpload}>
                  <FAB icon="plus" variant="secondary" animated size="large" />
                </MediaUpload>
              )
            }
            ListFooterComponentStyle={styles.footer}
          />
        </Surface>
        <View style={[styles.spacing, styles.title]}>
          <Text variant="titleLarge" children={'#'} />
          <BoldText variant="titleMedium" children={textConfig.hashtag} />
        </View>
        <InputBox
          placeholder={textConfig.placeholders.postHashtag}
          value={tag}
          onChangeText={(text: string) => setTag(text)}
          disabled={taglist.length >= 5}
          right={
            <TextInput.Icon
              icon={({size}) => (
                <Icon
                  name={'checkmark-sharp'}
                  size={size}
                  color={theme.colors.secondary}
                />
              )}
              size={20}
              onPress={addTags}
            />
          }
        />
        <View style={styles.tags}>
          {taglist.map(list => (
            <Chip key={list} children={list} onClose={() => removeTags(list)} />
          ))}
        </View>
      </ScrollView>
    </MainView>
  );
};

export default AddPost;

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  title: ViewStyle;
  wrapper: ViewStyle;
  spacing: ViewStyle;
  text: TextStyle;
  surface: ViewStyle;
  center: ViewStyle;
  footer: ViewStyle;
  image: ImageStyle;
  imageWrapper: ViewStyle;
  delete: ViewStyle;
  tags: ViewStyle;
  max: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    paddingHorizontal: 10,
  },
  spacing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    columnGap: 5,
    marginBottom: 10,
    marginTop: 30,
  },
  header: {
    justifyContent: 'space-between',
  },
  wrapper: {
    marginHorizontal: 10,
  },
  text: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  surface: {
    padding: 10,
    borderRadius: 20,
    minHeight: 200,
  },
  footer: {
    justifyContent: 'center',
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    columnGap: 20,
    position: 'relative',
  },
  center: {
    width: '100%',
    justifyContent: 'center',
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 999,
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    flexWrap: 'wrap',
  },
  max: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 5,
  },
});
