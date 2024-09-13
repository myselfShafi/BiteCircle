import React, {memo, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Button, Divider, Surface, Switch, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProfileProps} from '.';
import {BoldText, ModalWrapper} from '../../components';
import {ModalWrapperProps} from '../../components/common/Modal';
import {textConfig} from '../../configs';
import {useAppTheme} from '../../context/Theme';
import {SCREEN_WIDTH} from '../../utils/constants';

const ProfileSettings = memo(
  ({
    navigation,
    ...props
  }: Omit<ModalWrapperProps, 'children'> &
    Omit<ProfileProps, 'route'>): JSX.Element => {
    const {isDark, theme, toggleTheme} = useAppTheme();

    const [fingerLock, setFingerLock] = useState<boolean>(false);

    const toggleLock = () => setFingerLock(prev => !prev);

    const handleLogout = () => {
      navigation.replace('auth');
    };

    return (
      <ModalWrapper
        placement="flex-end"
        contentContainerStyle={styles.settingModal}
        {...props}>
        <Divider
          bold
          style={[
            styles.divider,
            {
              backgroundColor: theme.colors.onBackground,
            },
          ]}
        />
        <Surface elevation={0} style={styles.surface}>
          <View style={styles.flexRow}>
            <View
              style={[
                styles.surface,
                {backgroundColor: theme.colors.secondaryContainer},
              ]}>
              <Icon name={'options'} size={20} />
            </View>
            <View style={styles.text}>
              <BoldText variant={'titleMedium'}>
                {textConfig.preference}
              </BoldText>
              <Text variant="bodySmall">{textConfig.preferenceSub}</Text>
            </View>
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={isDark ? 'moon' : 'moon-outline'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.darkMode}</BoldText>
            </View>
            <Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                color={theme.colors.primary}
              />
            </Text>
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={'finger-print'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.lock}</BoldText>
            </View>
            <Text>
              <Switch value={fingerLock} onValueChange={toggleLock} />
            </Text>
          </View>
        </Surface>
        <Surface elevation={0} style={styles.surface}>
          <View style={styles.flexRow}>
            <View
              style={[
                styles.surface,
                {backgroundColor: theme.colors.secondaryContainer},
              ]}>
              <Icon name={'help-circle'} size={20} />
            </View>
            <View style={styles.text}>
              <BoldText variant={'titleMedium'}>{textConfig.help}</BoldText>
              <Text variant="bodySmall">{textConfig.helpSub}</Text>
            </View>
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={'flag'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.report}</BoldText>
            </View>
            <Icon name={'chevron-forward'} size={18} />
          </View>
          <View style={[styles.flexRow, styles.stack]}>
            <View style={styles.flexRow}>
              <Icon name={'mail'} size={18} />
              <BoldText variant={'bodyLarge'}>{textConfig.contact}</BoldText>
            </View>
            <Icon name={'chevron-forward'} size={18} />
          </View>
        </Surface>
        <Button
          mode="contained-tonal"
          contentStyle={{flexDirection: 'row-reverse'}}
          icon={({color, size}) => (
            <Icon name={'log-out'} size={size} color={color} />
          )}
          onPress={handleLogout}>
          {textConfig.logout}
        </Button>
      </ModalWrapper>
    );
  },
);

export default ProfileSettings;

interface Style {
  settingModal: ViewStyle;
  stack: ViewStyle;
  flexRow: ViewStyle;
  surface: ViewStyle;
  text: ViewStyle;
  divider: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  settingModal: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    rowGap: 20,
  },
  stack: {
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  surface: {
    padding: 10,
    borderRadius: 10,
    rowGap: 15,
    overflow: 'hidden',
  },
  text: {
    flexShrink: 1,
    maxWidth: '80%',
  },
  divider: {
    width: '25%',
    marginVertical: 10,
    alignSelf: 'center',
  },
});
