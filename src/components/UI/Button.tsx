import {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../constants/theme';

export enum ButtonVarians {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: ButtonVarians;
  containerStyle?: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = ({
  text,
  variant = ButtonVarians.primary,
  containerStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles[variant], containerStyle]}
      {...props}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 16,
    color: COLORS.primaryText,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
});

export default Button;
