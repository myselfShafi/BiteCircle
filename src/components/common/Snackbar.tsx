import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  Icon,
  Portal,
  Snackbar,
  SnackbarProps,
  useTheme,
} from 'react-native-paper';
import {SCREEN_HEIGHT} from '../../utils/constants';
import BoldText from './BoldText';

type CustomSnackbarProps = SnackbarProps & {
  variant?: 'error' | 'success';
};

const CustomSnackbar = ({
  icon = 'close-circle-outline',
  elevation = 5,
  children,
  style,
  wrapperStyle,
  variant,
  ...props
}: CustomSnackbarProps) => {
  const theme = useTheme();

  const backgroundColor = () => {
    switch (variant) {
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.secondary;
      default:
        return theme.colors.onBackground;
    }
  };
  return (
    <Portal>
      <Snackbar
        icon={props => (
          <Icon {...props} source={icon} color={theme.colors.onTertiary} />
        )}
        duration={5000}
        elevation={elevation}
        style={[styles.snackbar, {backgroundColor: backgroundColor()}, style]}
        wrapperStyle={[styles.content, wrapperStyle]}
        {...props}>
        <BoldText variant="bodyMedium" style={{color: theme.colors.onTertiary}}>
          {children}
        </BoldText>
      </Snackbar>
    </Portal>
  );
};

export default CustomSnackbar;

interface Style {
  snackbar: ViewStyle;
  content: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  snackbar: {
    borderRadius: 100,
    paddingHorizontal: 5,
  },
  content: {
    paddingHorizontal: 30,
    top: SCREEN_HEIGHT / 10,
  },
});
