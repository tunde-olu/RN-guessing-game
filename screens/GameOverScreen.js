import {Image, StyleSheet, Text, View, Dimensions, useWindowDimensions, ScrollView} from 'react-native';
import PryButton from '../components/ui/PryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame}) => {
  const {width, height} = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER</Title>
        <View style={[styles.imgContainer, imageStyle]}>
          <Image style={styles.img} source={require('../assets/images/success.png')} />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PryButton onPress={onStartNewGame}>Start New Game</PryButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    paddingVertical: 10,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  imgContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontSize: 24,
    fontFamily: 'open-sans',
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
