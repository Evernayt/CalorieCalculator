import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {RESULT_ROUTE} from '../constants/routes';
import {bg, plate} from '../constants/images';
import {Button} from '../components';

type Props = NativeStackScreenProps<RootStackParamList, typeof RESULT_ROUTE>;

const Result = ({route, navigation}: Props) => {
  const back = () => {
    navigation.goBack();
  };

  const {calories, fat, protein, carbohydrate} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image source={bg} style={styles.bgImage} />
      <Text style={styles.title}>Calorie result</Text>
      <View style={styles.info}>
        <View>
          <View style={styles.caloriesContainer}>
            <Text style={styles.caloriesLabel}>Calorie Needed: </Text>
            <Text style={styles.calories}>{calories} g.</Text>
          </View>
          <View style={styles.plateContainer}>
            <Text style={styles.label}>
              You must intake the following daily
            </Text>
            <Image source={plate} style={styles.plateImage} />
            <View style={styles.plateLabelsContainer}>
              <Text style={styles.plateLabel}>Fat</Text>
              <Text style={[styles.calories, styles.fat]}>{fat} g.</Text>
              <Text style={styles.plateLabel}>Protein</Text>
              <Text style={[styles.calories, styles.protein]}>
                {protein} g.
              </Text>
              <Text style={styles.plateLabel}>Carbohydrate</Text>
              <Text style={[styles.calories, styles.carbohydrate]}>
                {carbohydrate} g.
              </Text>
            </View>
          </View>
        </View>
        <Button text="Back" onPress={back} />
      </View>
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
  info: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: 12,
    marginHorizontal: 24,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloriesLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryText,
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryText,
    backgroundColor: COLORS.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
  plateContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primaryText,
    position: 'absolute',
    top: 90,
    zIndex: 99,
  },
  plateImage: {
    width: SIZES.width,
    height: SIZES.width,
    resizeMode: 'contain',
    marginTop: 100,
    marginHorizontal: -24,
  },
  plateLabelsContainer: {
    position: 'absolute',
    paddingTop: 60,
  },
  plateLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 2,
    color: COLORS.secondaryText,
  },
  fat: {
    backgroundColor: COLORS.fat,
  },
  protein: {
    backgroundColor: COLORS.protein,
  },
  carbohydrate: {
    backgroundColor: COLORS.carbohydrate,
    color: 'white',
  },
});

export default Result;
