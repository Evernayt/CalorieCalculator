import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {RectRadioButton, Input} from '../components';
import CircleRadioButton from '../components/UI/CircleRadioButton';
import {ACTIVENESS, GENDERS} from '../constants/app';
import {COLORS} from '../constants/theme';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calorie calculator</Text>
      <Text style={styles.label}>Gender</Text>
      <RectRadioButton items={GENDERS} onChange={() => console.log()} />
      <Text style={styles.label}>{'Height (cm)'}</Text>
      <Input />
      <Text style={styles.label}>{'Weight (kg)'}</Text>
      <Input />
      <Text style={styles.label}>Activeness</Text>
      <CircleRadioButton items={ACTIVENESS} onChange={() => console.log()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: COLORS.primaryText,
  },
  label: {
    fontSize: 16,
  },
});

export default Home;
