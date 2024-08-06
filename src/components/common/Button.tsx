import {
  StyleSheet,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {TextProps as PaperTextProps, Text, useTheme} from 'react-native-paper';

type customButtonProps = TouchableOpacityProps & {
  size: 'small' | 'medium' | 'large' | undefined;
  variant?: PaperTextProps<TextProps>['variant'];
};

const CustomButton = ({
  size,
  children,
  style,
  variant = 'labelLarge',
  ...props
}: customButtonProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        style,
        styles.button,
        size && styles[size],
        {backgroundColor: theme.colors.secondaryContainer},
      ]}
      activeOpacity={0.7}
      {...props}>
      <Text
        variant={variant}
        style={[styles.text, {color: theme.colors.onSecondaryContainer}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

interface Style {
  small: ViewStyle;
  medium: ViewStyle;
  large: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  small: {paddingVertical: 5, paddingHorizontal: 15},
  medium: {paddingVertical: 10, paddingHorizontal: 20},
  large: {paddingVertical: 15, paddingHorizontal: 25},
  button: {
    borderRadius: 10,
    width: 'auto',
  },
  text: {
    fontWeight: 800,
    textAlign: 'center',
  },
});
