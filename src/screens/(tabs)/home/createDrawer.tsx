import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BoldText, LabelIconButton, ModalWrapper} from '../../../components';
import {ModalWrapperProps} from '../../../components/common/Modal';
import {HomeStackParamList} from '../../../navigation/stacks/home';
import {HomeProps} from './home';

type CreateDrawerProps = Omit<ModalWrapperProps, 'children'> &
  Omit<HomeProps, 'route'>;

const CreateDrawer = ({
  navigation,
  ...props
}: CreateDrawerProps): JSX.Element => {
  const theme = useTheme();

  const create: {
    id: number;
    icon: string;
    label: string;
    route?: keyof HomeStackParamList;
  }[] = [
    {id: 1, icon: 'images-outline', label: 'Post', route: 'createPost'},
    {id: 2, icon: 'play-circle-outline', label: 'Story'},
    {id: 3, icon: 'albums-outline', label: 'Reel'},
    {id: 4, icon: 'radio-outline', label: 'Live'},
  ];

  const handleNav = (path: keyof HomeStackParamList | undefined) => {
    props?.onDismiss?.();
    navigation.push(path ?? 'home');
  };

  return (
    <ModalWrapper
      contentContainerStyle={[
        styles.title,
        {backgroundColor: theme.colors.elevation.level2},
      ]}
      {...props}>
      <BoldText children={'Create'} variant="bodyLarge" />
      <View style={styles.wrapper}>
        {create.map(list => (
          <LabelIconButton
            key={list.id}
            icon={list.icon}
            size={30}
            label={list.label}
            variant="vertical"
            labelStyle={[styles.label, {color: theme.colors.onSurfaceVariant}]}
            onPress={() => handleNav(list.route)}
          />
        ))}
      </View>
    </ModalWrapper>
  );
};

export default CreateDrawer;

interface Style {
  title: ViewStyle;
  wrapper: ViewStyle;
  label: TextStyle;
}

const styles: Style = StyleSheet.create<Style>({
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  wrapper: {
    flexDirection: 'row',
    columnGap: 20,
  },
  label: {
    fontWeight: 700,
  },
});
