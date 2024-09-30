import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {ReactNode, useCallback, useState} from 'react';
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
  CustomSnackbar,
  IconBtn,
  InputBox,
  MainView,
  MediaUpload,
} from '../../../components';
import {textConfig} from '../../../configs';
import {HomeStackParamList} from '../../../navigation/stacks/home';
import useCustomFetch from '../../../utils/hooks/useCustomFetch';

type AddPostProps = NativeStackScreenProps<HomeStackParamList, 'createPost'>;

interface SectionTitleProps {
  icon: string;
  title: string;
  hasError?: boolean;
  children?: ReactNode;
}

const SectionTitle = ({icon, title, hasError, children}: SectionTitleProps) => {
  const theme = useTheme();

  return (
    <View style={[styles.spacing, styles.title]}>
      <Icon name={icon} size={18} color={theme.colors.onSurface} />
      <BoldText variant="titleMedium" children={title} />
      {children}
      {hasError && (
        <Icon name={'alert-circle'} size={15} color={theme.colors.error} />
      )}
    </View>
  );
};

const AddPost = ({navigation}: AddPostProps) => {
  const theme = useTheme();
  const {fetchData, loading, handleError, error, data} = useCustomFetch();

  const [caption, setCaption] = useState<string>('');
  const [images, setImages] = useState<Asset[]>([]);
  const [tag, setTag] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  let initialErr = {caption: false, images: false};
  const [err, setErr] = useState(initialErr);
  const [success, setSuccess] = useState<boolean>(false);
  const handleBack = () => navigation.goBack();

  const handleUpload = (imageData: Asset) => {
    setErr(prev => ({...prev, images: false}));
    setImages(prev => [...prev, imageData]);
  };

  const handleDelete = (file: Asset['uri']) => {
    setImages(prev => prev.filter(img => img.uri !== file));
  };

  const addTags = () => {
    if (!hashtags.includes(tag)) {
      setHashtags(prev => [...prev, tag.toLowerCase()]);
      setTag('');
    }
  };

  const removeTags = (selectedTag: string) => {
    setHashtags(prev => prev.filter(list => list !== selectedTag));
  };

  const handlePublish = useCallback(async () => {
    setErr(initialErr);

    if (!caption || caption === '') {
      setErr(prev => ({...prev, caption: true}));
      return;
    }
    if (images.length === 0) {
      setErr(prev => ({...prev, images: true}));
      return;
    }
    let formdata = new FormData();
    formdata.append('caption', caption);
    formdata.append('hastags', hashtags);
    for (let i = 0; i < images.length; i++) {
      formdata.append('postMedia', {
        uri: images[i].uri,
        type: images[i].type,
        name: images[i].fileName,
      });
    }

    const addPost = await fetchData({
      method: 'POST',
      url: '/api/posts/create-post',
      authorize: true,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formdata,
    });
    if (addPost?.data.success) {
      setSuccess(true);
      console.log('saved post !!!! add navigation later !!!!', addPost.data);
    }
  }, [caption, images, hashtags]);

  return (
    <MainView style={styles.container}>
      <View style={[styles.header, styles.spacing]}>
        <IconBtn name={'return-up-back'} onPress={handleBack} />
        <BoldText
          variant="titleLarge"
          children={loading ? textConfig.creating : textConfig.create}
        />
        <CustomButton
          mode="text"
          color={theme.colors.primary}
          variant="titleMedium"
          size="small"
          loading={loading}
          onPress={handlePublish}>
          {textConfig.publish}
        </CustomButton>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <SectionTitle
          icon="clipboard-outline"
          title={textConfig.description}
          hasError={err.caption}
        />
        <InputBox
          placeholder={textConfig.placeholders.postDesc}
          multiline
          numberOfLines={5}
          value={caption}
          error={err.caption}
          onChangeText={(text: string) => setCaption(text)}
          onFocus={() => setErr(prev => ({...prev, caption: false}))}
          maxLength={300}
          disabled={loading}
        />
        <Text
          variant="bodySmall"
          style={[
            styles.max,
            caption.length >= 300 && {color: theme.colors.error},
          ]}
          children={`${caption.length}/300`}
        />
        <SectionTitle
          icon="images-outline"
          title={textConfig.imgTitle}
          hasError={err.images}
          children={
            <Text variant="bodySmall" children={`(${images.length}/5)`} />
          }
        />
        <BoldText
          style={styles.text}
          variant="labelMedium"
          children={textConfig.imgSubTitle}
        />
        <Surface
          elevation={0}
          style={[
            styles.surface,
            err.images && {borderWidth: 2, borderColor: theme.colors.error},
          ]}>
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
                  onPress={() => handleDelete(item.uri)}
                  disabled={loading}
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
                <MediaUpload setUpload={handleUpload} disabled={loading}>
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
          disabled={loading || hashtags.length >= 5}
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
          {hashtags.map(list => (
            <Chip
              key={list}
              children={list}
              onClose={() => removeTags(list)}
              disabled={loading}
            />
          ))}
        </View>
      </ScrollView>
      <CustomSnackbar
        variant={success ? 'success' : 'error'}
        visible={success || error.status}
        onDismiss={success ? () => setSuccess(false) : handleError}
        onIconPress={success ? undefined : handleError}
        children={success ? textConfig.successAddPost : error.message}
      />
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
