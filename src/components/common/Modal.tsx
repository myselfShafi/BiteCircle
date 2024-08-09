import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Modal, ModalProps, Portal, useTheme} from 'react-native-paper';

type ModalWrapperProps = ModalProps & {
  disableBackdrop?: boolean;
};

const ModalWrapper = ({
  children,
  style,
  contentContainerStyle,
  disableBackdrop = false,
  ...props
}: ModalWrapperProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        style={[styles.container, style]}
        contentContainerStyle={[
          contentContainerStyle,
          styles.contentWrapper,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
        theme={{
          colors: {
            backdrop: disableBackdrop ? 'transparent' : theme.colors.backdrop,
          },
        }}
        {...props}>
        {children}
      </Modal>
    </Portal>
  );
};

export default ModalWrapper;

interface Style {
  container: ViewStyle;
  contentWrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  contentWrapper: {
    borderRadius: 15,
    position: 'relative',
  },
});
