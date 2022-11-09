import {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import {COLORS} from '../../constants/theme';
import {ICircleRadioButton} from '../../models/ICircleRadioButton';
import {IRadioButtonItem} from '../../models/IRadioButtonItem';

interface CircleRadioButtonProps {
  items: ICircleRadioButton[];
  onChange: (item: IRadioButtonItem, index: number) => void;
}

const CircleRadioButton: FC<CircleRadioButtonProps> = ({items, onChange}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const changeHandler = (item: IRadioButtonItem, index: number) => {
    setSelectedIndex(index);
    onChange(item, index);
  };

  return (
    <RadioForm formHorizontal={false} animation={false}>
      {items.map((item, index) => (
        <RadioButton labelHorizontal={true} key={index}>
          <RadioButtonInput
            obj={item}
            index={index}
            isSelected={selectedIndex === index}
            onPress={() => changeHandler(item, index)}
            buttonStyle={{borderWidth: 2}}
            buttonInnerColor={COLORS.primary}
            buttonOuterColor={
              selectedIndex === index ? COLORS.primary : COLORS.secondary
            }
          />
          <TouchableOpacity
            style={styles.labelContainer}
            onPress={() => changeHandler(item, index)}>
            <Text style={styles.label}>{item.label}</Text>
            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </TouchableOpacity>
        </RadioButton>
      ))}
    </RadioForm>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginLeft: 10,
    paddingRight: 24,
  },
  label: {
    color: COLORS.primaryText,
  },
  description: {
    color: COLORS.secondaryText,
  },
});

export default CircleRadioButton;
