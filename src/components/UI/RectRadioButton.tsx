import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IRadioButtonItem} from '../../models/IRadioButtonItem';
import Button, {ButtonVarians} from './Button';

interface RectRadioButtonProps {
  items: IRadioButtonItem[];
  onChange: (item: IRadioButtonItem, index: number) => void;
}

const RectRadioButton: FC<RectRadioButtonProps> = ({items, onChange}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const changeHandler = (item: IRadioButtonItem, index: number) => {
    setSelectedIndex(index);
    onChange(item, index);
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Button
          text={item.label}
          variant={
            selectedIndex === index
              ? ButtonVarians.primary
              : ButtonVarians.secondary
          }
          containerStyle={styles.button}
          onPress={() => changeHandler(item, index)}
          key={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: -4,
    flexWrap: 'wrap',
  },
  button: {
    margin: 4,
  },
});

export default RectRadioButton;
