import {FC, useState} from 'react';
import {Text, View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
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
          <View>
            <RadioButtonLabel
              obj={item}
              index={index}
              labelHorizontal={true}
              labelStyle={{color: COLORS.primaryText}}
              onPress={() => changeHandler(item, index)}
            />
            {item.description && (
              <Text style={{marginLeft: 10}}>{item.description}</Text>
            )}
          </View>
        </RadioButton>
      ))}
    </RadioForm>
  );
};

export default CircleRadioButton;
