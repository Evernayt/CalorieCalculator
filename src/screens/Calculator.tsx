import {Image, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {RectRadioButton, Input, Button} from '../components';
import CircleRadioButton from '../components/UI/CircleRadioButton';
import {ACTIVITIES, GENDERS} from '../constants/app';
import {COLORS} from '../constants/theme';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {CALCULATOR_ROUTE, RESULT_ROUTE} from '../constants/routes';
import {useEffect, useState} from 'react';
import {bg} from '../constants/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof CALCULATOR_ROUTE
>;

const Calculator = ({navigation}: Props) => {
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [activeness, setActiveness] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!error) return;

    const timerId = setTimeout(() => setError(''), 3600);
    return () => clearInterval(timerId);
  }, [error]);

  const calculate = () => {
    if (!isAllDataFilled()) return;

    const ageNum = Number(age.replace(/[^0-9]/g, ''));
    const heightNum = Number(height.replace(/[^0-9]/g, ''));
    const weightNum = Number(weight.replace(/[^0-9]/g, ''));

    let calories: number = 10 * weightNum + 6.25 * heightNum - 5 * ageNum;

    if (gender === 'Male') {
      calories += 5;
    } else {
      calories -= 161;
    }

    switch (activeness) {
      case 'Minimum':
        calories *= 1.2;
        break;
      case 'Low':
        calories *= 1.375;
        break;
      case 'Average':
        calories *= 1.53;
        break;
      case 'High':
        calories *= 1.725;
        break;
      case 'Very high':
        calories *= 1.9;
        break;
    }

    calories = Math.floor(calories);
    const fat: number = Math.floor((calories * 0.25) / 9);
    const protein: number = Math.floor((calories * 0.25) / 4);
    const carbohydrate: number = Math.floor((calories * 0.25) / 4);

    navigation.navigate(RESULT_ROUTE, {
      calories,
      fat,
      protein,
      carbohydrate,
    });
  };

  const isAllDataFilled = () => {
    if (!gender) {
      setError('Please enter your gender');
      return false;
    } else if (!age || age === '0') {
      setError('Please enter your age');
      return false;
    } else if (!height || height === '0') {
      setError('Please enter your height');
      return false;
    } else if (!weight || weight === '0') {
      setError('Please enter your weight');
      return false;
    } else if (!activeness) {
      setError('Please indicate your physical activity');
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={bg} style={styles.bgImage} />
      <Text style={styles.title}>Calorie calculator</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.label}>Gender</Text>
        <RectRadioButton
          items={GENDERS}
          onChange={item => setGender(item.label)}
        />
        <Text style={styles.label}>Age</Text>
        <Input
          value={age}
          onChangeText={text => setAge(text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>{'Height (cm)'}</Text>
        <Input
          value={height}
          onChangeText={text => setHeight(text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>{'Weight (kg)'}</Text>
        <Input
          value={weight}
          onChangeText={text => setWeight(text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Activeness</Text>
        <CircleRadioButton
          items={ACTIVITIES}
          onChange={item => setActiveness(item.label)}
        />
      </ScrollView>
      <Text style={styles.error}>{error}</Text>
      <Button
        text="Calculate"
        containerStyle={styles.button}
        onPress={calculate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingVertical: 12,
  },
  bgImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    resizeMode: 'contain',
  },
  scroll: {
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 12,
    marginHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryText,
    marginTop: 12,
    marginBottom: 8,
  },
  error: {
    color: COLORS.danger,
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 24,
  },
});

export default Calculator;
