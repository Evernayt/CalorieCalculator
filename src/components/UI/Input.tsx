import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {COLORS} from '../../constants/theme';

const Input: FC<TextInputProps> = props => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.primaryText,
    paddingHorizontal: 18,
  },
});

export default Input;
