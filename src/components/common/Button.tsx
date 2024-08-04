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
  small: {padding: 5},
  medium: {padding: 10},
  large: {padding: 15},
  button: {
    borderRadius: 10,
    width: '100%',
  },
  text: {
    fontWeight: 800,
    textAlign: 'center',
  },
});
