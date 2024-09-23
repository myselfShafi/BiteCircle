import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Avatar, Surface, Tooltip, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BoldText,
  CustomButton,
  MainView,
  MediaUpload,
} from '../../../components';
import {textConfig} from '../../../configs';
import {StackParamList} from '../../../navigation/navigator';
import {SCREEN_HEIGHT} from '../../../utils/constants';

export type uploadAvatarProps = NativeStackScreenProps<
  StackParamList,
  'uploadAvatar'
>;

const UploadAvatar = ({navigation, route}: uploadAvatarProps) => {
  const theme = useTheme();
  const {
    data: {userName},
  } = route.params;
  const [coverImage, setCoverImage] = useState<string | undefined | null>(null);
  const [avatar, setAvatar] = useState<string | undefined | null>(null);

  const handleSkip = () => {
    navigation.reset({index: 0, routes: [{name: 'app'}]});
  };

  let avatarSrc = avatar
    ? {uri: avatar}
    : require('../../../assets/avatar.webp');
  let coverImageSrc = coverImage
    ? {uri: coverImage}
    : require('../../../assets/cover.webp');

  return (
    <MainView>
      <SafeAreaView style={styles.container}>
        <BoldText
          variant="displaySmall"
          children={'Almost there!'}
          style={styles.title}
        />
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <BoldText variant="bodyLarge" children={'Your Username'} />
            <Tooltip
              title={'You can change this later from your profile.'}
              enterTouchDelay={0}>
              <Surface elevation={0} style={styles.username}>
                <BoldText>@{userName || 'new_user2018'}</BoldText>
              </Surface>
            </Tooltip>
          </View>
          <View style={styles.wrapper}>
            <BoldText variant="bodyLarge" children={'Upload Your Avatar'} />
            <MediaUpload style={styles.center} setUpload={setAvatar}>
              <Avatar.Image size={SCREEN_HEIGHT / 5} source={avatarSrc} />
            </MediaUpload>
          </View>
          <View style={styles.wrapper}>
            <BoldText
              variant="bodyLarge"
              children={'Upload Your Cover Image'}
            />
            <MediaUpload
              style={[
                styles.coverWrapper,
                styles.center,
                {
                  borderColor: theme.colors.surfaceVariant,
                  backgroundColor: theme.colors.surface,
                },
              ]}
              setUpload={setCoverImage}>
              <Image
                source={coverImageSrc}
                style={coverImage ? styles.cover : styles.placeholder}
              />
            </MediaUpload>
          </View>
        </View>
        <View style={styles.action}>
          <CustomButton
            mode="text"
            color={theme.colors.primary}
            variant="bodyMedium"
            size="small"
            onPress={handleSkip}>
            {textConfig.skip}
          </CustomButton>
          <CustomButton variant="bodyMedium" size="small" style={styles.button}>
            {textConfig.continue}
          </CustomButton>
        </View>
      </SafeAreaView>
    </MainView>
  );
};

export default UploadAvatar;

interface Style {
  container: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  action: ViewStyle;
  wrapper: ViewStyle;
  center: ViewStyle;
  coverWrapper: ViewStyle;
  cover: ImageStyle;
  placeholder: ImageStyle;
  content: ViewStyle;
  username: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    padding: 35,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    gap: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverWrapper: {
    borderWidth: 2,
    borderRadius: 20,
    height: SCREEN_HEIGHT / 4,
    width: '100%',
    overflow: 'hidden',
  },
  placeholder: {
    height: 80,
    width: 80,
  },
  cover: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  username: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
});
