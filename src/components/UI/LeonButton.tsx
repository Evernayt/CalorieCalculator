import {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

interface LeonButtonProps extends TouchableOpacityProps {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const LeonButton: FC<LeonButtonProps> = ({text, containerStyle, ...props}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} {...props}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff1011',
    alignSelf: 'center',
    padding: 2,
    borderRadius: 20,
  },
  buttonContainer: {
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    alignSelf: 'center',
  },
  text: {
    fontSize: 29,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LeonButton;
