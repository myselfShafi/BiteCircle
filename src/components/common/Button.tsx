import {
  StyleSheet,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {TextProps as PaperTextProps, useTheme} from 'react-native-paper';
import BoldText from './BoldText';

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
      <BoldText
        variant={variant}
        style={{color: theme.colors.onSecondaryContainer}}>
        {children}
      </BoldText>
    </TouchableOpacity>
  );
};

export default CustomButton;

interface Style {
  small: ViewStyle;
  medium: ViewStyle;
  large: ViewStyle;
  button: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  small: {paddingVertical: 5, paddingHorizontal: 15},
  medium: {paddingVertical: 10, paddingHorizontal: 20},
  large: {paddingVertical: 15, paddingHorizontal: 25},
  button: {
    borderRadius: 10,
    width: 'auto',
  },
});
