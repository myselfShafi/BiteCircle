import React, {ReactNode} from 'react';
import {StyleSheet, TextProps, View, ViewStyle} from 'react-native';
import {IconButton, IconButtonProps, Text} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';

type LabelIconButtonProps = IconButtonProps & {
  icon: string;
  label: ReactNode;
  variant?: 'vertical' | 'horizontal';
  labelStyle?: TextProps['style'];
};

const LabelIconButton = ({
  icon,
  label,
  iconColor,
  labelStyle,
  variant = 'horizontal',
  ...props
}: LabelIconButtonProps): JSX.Element => {
  return (
    <View
      style={[
        styles.wrapper,
        {flexDirection: variant === 'vertical' ? 'column' : 'row'},
      ]}>
      <IconButton
        icon={({color, size}) => (
          <IonIcon name={icon} size={size} color={color} />
        )}
        iconColor={iconColor}
        {...props}
      />
      {label && (
        <Text variant="bodyMedium" style={[{color: iconColor}, labelStyle]}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default LabelIconButton;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    alignItems: 'center',
  },
});
