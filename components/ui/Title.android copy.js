import {StyleSheet, Text, Platform} from 'react-native';

const Title = ({children}) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    // color: Platform.select({ios: 'red', android: 'green'}),
    borderWidth: 2,
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    // borderWidth: Platform.select({ios: 0, android: 2}),
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});
