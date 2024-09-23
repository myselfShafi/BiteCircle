import {
  ColorValue,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {
  ActivityIndicator,
  ButtonProps,
  TextProps as PaperTextProps,
  useTheme,
} from 'react-native-paper';
import BoldText from './BoldText';

type CustomButtonProps = TouchableOpacityProps & {
  size: 'small' | 'medium' | 'large' | undefined;
  variant?: PaperTextProps<TextProps>['variant'];
  mode?: ButtonProps['mode'];
  icon?: JSX.Element;
  iconDirection?: 'left' | 'right';
  color?: ColorValue;
  loading?: boolean;
};

const CustomButton = ({
  size,
  children,
  style,
  icon,
  iconDirection,
  loading,
  color,
  mode = 'contained',
  variant = 'labelLarge',
  ...props
}: CustomButtonProps): JSX.Element => {
  const theme = useTheme();
  const currentColor = color || theme.colors.secondaryContainer;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        size && styles[size],
        mode === 'contained' && {
          backgroundColor: currentColor,
        },
        {
          borderColor: mode === 'text' ? 'transparent' : currentColor,
        },
        icon && styles.icon,
        icon &&
          (iconDirection === 'right' ? styles.iconRight : styles.iconLeft),
        mode === 'text' && styles.text,
        style,
      ]}
      activeOpacity={loading ? 1 : 0.7}
      {...props}>
      <BoldText
        variant={variant}
        style={{
          color:
            mode === 'contained'
              ? theme.colors.onSecondaryContainer
              : currentColor,
        }}>
        {loading ? (
          <ActivityIndicator animating={true} color={theme.colors.secondary} />
        ) : (
          children
        )}
      </BoldText>
      {icon}
    </TouchableOpacity>
  );
};

export default CustomButton;

interface Style {
  small: ViewStyle;
  medium: ViewStyle;
  large: ViewStyle;
  button: ViewStyle;
  icon: ViewStyle;
  iconLeft: ViewStyle;
  iconRight: ViewStyle;
  text: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  small: {paddingVertical: 5, paddingHorizontal: 15},
  medium: {paddingVertical: 10, paddingHorizontal: 20},
  large: {paddingVertical: 15, paddingHorizontal: 25},
  button: {
    borderRadius: 10,
    width: 'auto',
    alignItems: 'center',
    borderWidth: 2,
  },
  icon: {
    justifyContent: 'center',
    columnGap: 5,
  },
  iconLeft: {
    flexDirection: 'row-reverse',
  },
  iconRight: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
  },
});
