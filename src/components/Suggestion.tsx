import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {SuggestionData} from '../configs/types';
import BoldText from './common/BoldText';
import CustomButton from './common/Button';

type SuggestionProps = {
  data: SuggestionData;
};

const Suggestion = ({data}: SuggestionProps): JSX.Element => {
  return (
    <Surface elevation={0} style={styles.wrapper}>
      <Avatar.Image
        size={75}
        source={{
          uri: data.img,
        }}
      />
      <BoldText variant="labelLarge" numberOfLines={1} ellipsizeMode="tail">
        {data.name}
      </BoldText>
      <CustomButton size="small" children={'Follow'} />
    </Surface>
  );
};

export default Suggestion;

interface Style {
  wrapper: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  wrapper: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 10,
    rowGap: 5,
    maxWidth: 115,
  },
});
