import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {IconButton, IconButtonProps} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../themes/theme';

type IconBtnProps = Partial<IconButtonProps> & {
  name: string;
  size?: number;
  bgColor?: any;
};

const IconBtn = ({
  name,
  size = 24,
  bgColor,
  ...props
}: IconBtnProps): JSX.Element => {
  const theme = useAppTheme();

  return (
    <IconButton
      icon={() => (
        <IonIcon name={name} size={size} color={theme.colors.primary} />
      )}
      size={size + 5}
      style={[styles.icon, {backgroundColor: bgColor ?? theme.colors.card}]}
      {...props}
    />
  );
};

export default IconBtn;

interface Style {
  icon: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  icon: {
    borderRadius: 10,
  },
});
