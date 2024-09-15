import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {ProgressBar, useTheme} from 'react-native-paper';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StackParamList} from '../../navigation/navigator';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/constants';
import {useStatusBar} from '../../utils/hooks';
import LogoWrapper from './layout/logoWrapper';
import ForgotPassword from './password/forgotPassword';
import ResetPassword from './password/resetPassword';
import VerifyOTP from './password/verifyOTP';

export type PwdScreenProps = NativeStackScreenProps<
  StackParamList,
  'forgotPwd'
>;

const UpdatePassword = ({navigation}: PwdScreenProps) => {
  const theme = useTheme();
  useStatusBar('transparent', 'light-content', true);

  const [progress, setProgress] = useState(1);

  const slide = useSharedValue<number>(1);
  const options = {duration: 1000};

  const addStyles = (level: number) => {
    'worklet';
    return {
      transform: [
        {
          translateX:
            slide.value === level
              ? withTiming(0, options)
              : withTiming(SCREEN_WIDTH, options),
        },
      ],
      opacity:
        slide.value === level ? withTiming(1, options) : withTiming(0, options),
    };
  };

  const AnimatePanel1 = useAnimatedStyle(() => addStyles(1));
  const AnimatePanel2 = useAnimatedStyle(() => addStyles(2));
  const AnimatePanel3 = useAnimatedStyle(() => addStyles(3));

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <LogoWrapper handleBack={handleBack}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {progress === 1 && (
          <Animated.View style={[AnimatePanel1]}>
            <ForgotPassword
              addProgress={() => {
                slide.value = withTiming(2, options, () => {
                  'worklet';
                  runOnJS(setProgress)(2);
                });
              }}
            />
          </Animated.View>
        )}
        {progress === 2 && (
          <Animated.View style={[AnimatePanel2]}>
            <VerifyOTP
              addProgress={() => {
                slide.value = withTiming(3, options, () => {
                  'worklet';
                  runOnJS(setProgress)(3);
                });
              }}
            />
          </Animated.View>
        )}
        {progress === 3 && (
          <Animated.View style={[AnimatePanel3]}>
            <ResetPassword
              addProgress={() => {
                slide.value = withTiming(4, options, () => {
                  'worklet';
                  runOnJS(setProgress)(4);
                });
              }}
            />
          </Animated.View>
        )}
      </ScrollView>
      <View style={styles.progress}>
        {[1, 2, 3].map(level => (
          <View key={level} style={styles.barWidth}>
            <ProgressBar
              progress={progress >= level ? 1 : 0}
              color={theme.colors.primary}
              style={styles.bar}
            />
          </View>
        ))}
      </View>
    </LogoWrapper>
  );
};

export default UpdatePassword;

interface Style {
  container: ViewStyle;
  progress: ViewStyle;
  barWidth: ViewStyle;
  bar: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  container: {
    padding: 35,
    height: SCREEN_HEIGHT / 2.5,
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 35,
  },
  barWidth: {width: '30%'},
  bar: {height: 6, borderRadius: 6},
});
