import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, FlatList, useWindowDimensions} from 'react-native';
import Card from '../components/ui/Card';
import NumberContainer from '../components/game/NumberContainer';
import InputTitle from '../components/ui/InputTitle';
import PryButton from '../components/ui/PryButton';
import Title from '../components/ui/Title';
import {Ionicons} from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({userNumber, gameOverHandler}) => {
  const intialGuess = generateRandomBetween(1, 100, userNumber);

  const [currGuess, setCurrGuess] = useState(intialGuess);
  const [guessRounds, setGuessRounds] = useState([intialGuess]);

  const {width, height} = useWindowDimensions();

  function nextGuessHandler(direction) {
    if ((direction === 'lower' && currGuess < userNumber) || (direction === 'higher' && currGuess > userNumber)) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{text: 'Sorry', style: 'cancel'}]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currGuess;
    } else {
      minBoundary = currGuess + 1;
    }

    const newRandomNum = generateRandomBetween(minBoundary, maxBoundary, currGuess);
    setCurrGuess(newRandomNum);
    setGuessRounds((prev) => [newRandomNum, ...prev]);
  }

  const guessRoundsListLength = guessRounds.length;

  useEffect(() => {
    if (currGuess === userNumber) {
      gameOverHandler(guessRoundsListLength);
    }
  }, [currGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  let content = (
    <>
      {/* GUESS */}
      <NumberContainer>{currGuess}</NumberContainer>

      {/* HIGHER OR LOWER */}
      <Card>
        <InputTitle style={styles.inputTitle}>Higher or lower?</InputTitle>
        <View style={styles.btnContainer}>
          <PryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </PryButton>
          <PryButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name='md-add' size={24} color='white' />
          </PryButton>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        {/* <InputTitle style={styles.inputTitle}>Higher or lower?</InputTitle> */}
        <View style={styles.btnsContainerWide}>
          <View style={styles.btnContainer}>
            <PryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='md-remove' size={24} color='white' />
            </PryButton>
          </View>
          <NumberContainer>{currGuess}</NumberContainer>
          <View style={styles.btnContainer}>
            <PryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              <Ionicons name='md-add' size={24} color='white' />
            </PryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's screen</Title>
      {content}
      {/* LOG ROUNDS */}
      <View style={[styles.listContainer, {width: width > 500 ? '60%' : 'auto'}]}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 24,
    height: '100%',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  btnsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTitle: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
