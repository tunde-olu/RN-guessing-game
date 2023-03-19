import {StyleSheet, Text, View, Pressable} from 'react-native';
import Colors from '../../constants/colors';

const PryButton = ({children, onPress, direction}) => {
  return (
    <View style={styles.btnOuter}>
      <Pressable
        style={({pressed}) => (pressed ? [styles.btnInner, styles.pressed] : styles.btnInner)}
        onPress={onPress}
        android_ripple={{color: Colors.primary600}}>
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PryButton;

const styles = StyleSheet.create({
  btnInner: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 2,
  },
  btnOuter: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
