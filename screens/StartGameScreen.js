import {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Card from '../components/ui/Card';
import InputTitle from '../components/ui/InputTitle';
import PryButton from '../components/ui/PryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

const StartGameScreen = ({pickedNumHandler}) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  const {width, height} = useWindowDimensions();

  function numberInputHandler(text) {
    setEnteredNumber(text);
  }

  function resetInput() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNum = parseInt(enteredNumber);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      // show alert
      Alert.alert('Invalid number', 'Number has to be a number between 1 and 99', [
        {text: 'Okay', style: 'destructive', onPress: resetInput},
      ]);

      return;
    }
    pickedNumHandler(chosenNum);
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
          <Title>Guess My Number</Title>
          <Card>
            <InputTitle style={styles.inputTitle}>Enter a number</InputTitle>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType={'number-pad'}
              autoCapitalize='none'
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.btnsContainer}>
              <View style={styles.btnContainer}>
                <PryButton resetInput={resetInput}>Reset</PryButton>
              </View>
              <View style={styles.btnContainer}>
                <PryButton onPress={confirmInputHandler}>Confirm</PryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const deviceHeight = Dimensions.get('window').height;

console.log(deviceHeight);

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  rootContainer: {
    alignItems: 'center',
  },

  numberInput: {
    height: 50,
    fontSize: 32,
    width: 50,
    marginHorizontal: 'auto',
    textAlign: 'center',
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  btnsContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
  },
});
