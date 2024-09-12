import {
  StyleSheet,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {
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
};

const CustomButton = ({
  size,
  children,
  style,
  icon,
  mode = 'contained',
  variant = 'labelLarge',
  ...props
}: CustomButtonProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        size && styles[size],
        mode === 'contained' && {
          backgroundColor: theme.colors.secondaryContainer,
        },
        {
          borderColor: theme.colors.secondaryContainer,
        },
        icon && styles.icon,
        style,
      ]}
      activeOpacity={0.7}
      {...props}>
      <BoldText
        variant={variant}
        style={{
          color:
            mode === 'contained'
              ? theme.colors.onSecondaryContainer
              : theme.colors.secondaryContainer,
        }}>
        {children}
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
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    columnGap: 5,
  },
});
