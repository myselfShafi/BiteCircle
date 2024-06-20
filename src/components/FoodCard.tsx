import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';

const dummyImg =
  'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718881367~exp=1718884967~hmac=eae0014733b68da80852a536180ff451c7ddceda3c08f01539848bb9b13f5e76&w=740';

const FoodCard = () => {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);

  return (
    <Card style={styles.container}>
      <Card.Title
        titleStyle={styles.title}
        title="John Doe"
        subtitle="8 hours ago"
        left={props => <Avatar.Image {...props} source={{uri: dummyImg}} />}
        right={props => (
          <View style={styles.icons} {...props}>
            <IconButton icon="share-variant-outline" size={20} />
            <IconButton icon="dots-vertical" size={20} />
          </View>
        )}
      />
      <Card.Cover
        source={{uri: 'https://picsum.photos/720'}}
        style={styles.cover}
      />
      <Card.Actions>
        <View style={styles.icons}>
          <Button
            icon={({color}) => (
              <Icon
                source={liked ? 'heart' : 'heart-outline'}
                size={20}
                color={liked ? theme.colors.error : color}
              />
            )}
            mode="text"
            rippleColor={'transparent'}
            onPress={() => setLiked(!liked)}>
            123
          </Button>
          <Button
            icon={({color}) => (
              <Icon source={'chat-outline'} size={20} color={color} />
            )}
            mode="text"
            rippleColor={'transparent'}
            onPress={() => console.log('Pressed')}>
            45
          </Button>
        </View>
        <IconButton
          icon="bookmark-outline"
          size={20}
          onPress={() => console.log('Pressed')}
        />
      </Card.Actions>
      <Card.Content>
        <Text variant="bodyLarge">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem hic
          commodi fugit sunt alias ex cumque. Omnis at quas deserunt accusamus
          perferendis non dolores eligendi aliquam blanditiis commodi! Iusto,
          voluptates.
        </Text>
      </Card.Content>
    </Card>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
  },
  title: {
    fontWeight: '900',
  },
  cover: {
    borderRadius: 0,
  },
  icons: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
