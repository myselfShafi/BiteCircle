import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IconButton, IconButtonProps, Text} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';

type LabelIconButtonProps = IconButtonProps & {
  icon: string;
  label: ReactNode;
  variant?: 'vertical' | 'horizontal';
};

const LabelIconButton = ({
  icon,
  label,
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
        icon={({color}) => <IonIcon name={icon} size={25} color={color} />}
        {...props}
      />
      {label && <Text variant="bodyMedium">{label}</Text>}
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
