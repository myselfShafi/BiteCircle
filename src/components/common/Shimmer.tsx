import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import ShimmerPlaceholder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';

type ShimmerPropsType = ShimmerPlaceholderProps & {
  children?: React.ReactNode;
};

const Shimmer = ({children, ...props}: ShimmerPropsType): JSX.Element => {
  const theme = useTheme();
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      shimmerColors={[
        theme.colors.elevation.level0,
        theme.colors.elevation.level1,
        theme.colors.elevation.level0,
      ]}
      {...props}>
      {children}
    </ShimmerPlaceholder>
  );
};

export default Shimmer;
