import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import imageBg from './assets/images/background.png';
import {useState} from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />;

  function pickedNumHandler(pickedNum) {
    setUserNumber(pickedNum);
    setGameOver(false);
  }

  function gameOverHandler(numOfRounds) {
    setGameOver(true);
    setGuessRounds(numOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGameOver(true);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen pickedNumHandler={pickedNumHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} gameOverHandler={gameOverHandler} />;
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient style={styles.rootScreen} colors={[Colors.primary700, Colors.accent500]}>
        <ImageBackground
          source={imageBg}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.imageBg}>
          <SafeAreaView>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    // backgroundColor: '#ddb52f',
    flex: 1,
  },
  imageBg: {
    opacity: 0.5,
  },
});
