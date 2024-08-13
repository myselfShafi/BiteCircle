import React, {forwardRef, LegacyRef} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IconButton, IconButtonProps} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../../context/Theme';

type IconBtnProps = Partial<IconButtonProps> & {
  name: string;
  size?: number;
  bgColor?: any;
};

const IconBtn = forwardRef(
  (
    {name, size: iconSize, bgColor, style, ...props}: IconBtnProps,
    ref: LegacyRef<View>,
  ): JSX.Element => {
    const {theme} = useAppTheme();

    return (
      <IconButton
        ref={ref}
        icon={({color, size}) => (
          <IonIcon name={name} size={size} color={color} />
        )}
        size={iconSize}
        style={[
          style,
          styles.icon,
          {backgroundColor: bgColor ?? theme.colors.onTertiary},
        ]}
        {...props}
      />
    );
  },
);

export default IconBtn;

interface Style {
  icon: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  icon: {
    borderRadius: 10,
  },
});
