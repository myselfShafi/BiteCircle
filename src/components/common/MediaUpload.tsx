import React, {Fragment, memo, useCallback, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button, Divider} from 'react-native-paper';
import BoldText from './BoldText';
import ModalWrapper from './Modal';

const defaultOptions: ImageLibraryOptions = {
  mediaType: 'photo',
};

type MediaUploadProps = TouchableOpacityProps & {
  options?: ImageLibraryOptions;
  setUpload: any;
};

const MediaUpload = memo(
  ({
    children,
    setUpload,
    style,
    options = defaultOptions,
    ...props
  }: MediaUploadProps) => {
    const [modal, setModal] = useState<boolean>(false);

    const handleUploadMode = useCallback(
      async (mode: 'camera' | 'gallery') => {
        try {
          const result =
            mode === 'camera'
              ? await launchCamera(options)
              : await launchImageLibrary(options);
          if (result.assets) {
            setUpload(result.assets[0]);
            setModal(false);
          }
        } catch (error) {
          console.log({error});
        }
      },
      [setUpload],
    );

    const handleOpen = () => {
      setModal(true);
    };

    return (
      <Fragment>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleOpen}
          style={[styles.wrapper, style]}
          {...props}>
          {children}
        </TouchableOpacity>
        <ModalWrapper
          visible={modal}
          onDismiss={() => setModal(false)}
          contentContainerStyle={styles.modal}>
          <BoldText variant="bodyLarge" children={'Select a way to upload!'} />
          <Divider horizontalInset />
          <Button
            icon={'camera-outline'}
            mode="text"
            children={'Take a photo'}
            onPress={() => handleUploadMode('camera')}
          />
          <Button
            icon={'cloud-upload-outline'}
            mode="text"
            children={'Upload from phone'}
            onPress={() => handleUploadMode('gallery')}
          />
        </ModalWrapper>
      </Fragment>
    );
  },
);

export default MediaUpload;

interface Style {
  wrapper: ViewStyle;
  modal: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    position: 'relative',
    alignSelf: 'center',
  },
  modal: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    rowGap: 10,
  },
});
