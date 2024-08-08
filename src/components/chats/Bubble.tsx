import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Divider, Surface, Text, useTheme} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ChatData} from '../../configs/types';
import {getDateFormat} from '../../utils';
import {SCREEN_WIDTH} from '../../utils/constants';

type BubbleProps = {
  data: ChatData;
};

const Bubble = ({data}: BubbleProps): JSX.Element => {
  const theme = useTheme();
  const time = getDateFormat(data.timestamp);

  return (
    <View style={!data.sender && {alignItems: 'flex-end'}}>
      <Surface
        elevation={0}
        style={[
          styles.wrapper,
          data.sender ? styles.sender : styles.self,
          !data.sender && {backgroundColor: theme.colors.secondaryContainer},
        ]}>
        <Text>{data.message}</Text>
        <Divider
          bold
          style={[
            styles.divider,
            {
              backgroundColor: theme.colors.onBackground,
            },
            !data.sender && {alignSelf: 'flex-end'},
          ]}
        />
        <View style={styles.timestamp}>
          {data.status && (
            <View style={styles.status}>
              {Array(data.status)
                .fill(null)
                .map((em, idx) => (
                  <IonIcon
                    key={idx}
                    name={'ellipse'}
                    size={6}
                    color={theme.colors.secondary}
                  />
                ))}
            </View>
          )}
          <Text variant="bodySmall">{time}</Text>
        </View>
      </Surface>
    </View>
  );
};

export default Bubble;

interface Style {
  wrapper: ViewStyle;
  sender: ViewStyle;
  self: ViewStyle;
  divider: ViewStyle;
  timestamp: ViewStyle;
  status: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 10,
    maxWidth: (SCREEN_WIDTH * 3) / 4,
  },
  sender: {
    borderTopLeftRadius: 0,
  },
  self: {
    borderBottomRightRadius: 0,
  },
  divider: {
    width: 30,
    marginVertical: 6,
  },
  timestamp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
  },
  status: {
    flexDirection: 'row',
    columnGap: 1,
  },
});
