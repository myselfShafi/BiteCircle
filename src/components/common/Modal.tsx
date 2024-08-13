import React from 'react';
import {FlexStyle, StyleSheet, ViewStyle} from 'react-native';
import {Modal, ModalProps, Portal, useTheme} from 'react-native-paper';

export type ModalWrapperProps = ModalProps & {
  disableBackdrop?: boolean;
  placement?: FlexStyle['justifyContent'];
};

const ModalWrapper = ({
  children,
  style,
  placement = 'center',
  contentContainerStyle,
  disableBackdrop = false,
  ...props
}: ModalWrapperProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        style={[
          styles.container,
          style,
          {
            justifyContent: placement,
          },
        ]}
        contentContainerStyle={[
          styles.contentWrapper,
          contentContainerStyle,
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
    alignItems: 'center',
  },
  contentWrapper: {
    borderRadius: 15,
    position: 'relative',
  },
});
