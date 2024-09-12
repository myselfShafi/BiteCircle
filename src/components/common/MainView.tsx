import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

const MainView = ({children, style, ...props}: ViewProps): JSX.Element => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      {children}
    </View>
  );
};

export default MainView;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
});
