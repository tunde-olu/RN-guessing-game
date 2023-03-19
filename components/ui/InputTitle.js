import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';

const InputTitle = ({children, style}) => {
  return <Text style={[styles.inputTitle, style]}>{children}</Text>;
};

export default InputTitle;

const styles = StyleSheet.create({
  inputTitle: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
