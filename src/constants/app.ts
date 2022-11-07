import {ICircleRadioButton} from './../models/ICircleRadioButton';
import {IRadioButtonItem} from '../models/IRadioButtonItem';

const DEF_URL = 'DEF_URL';

const GENDERS: IRadioButtonItem[] = [
  {
    label: 'Male',
    value: 0,
  },
  {
    label: 'Female',
    value: 1,
  },
];

const ACTIVENESS: ICircleRadioButton[] = [
  {
    label: 'Minimum',
    value: 0,
    description: 'Sedentary work and no physical activity.',
  },
  {
    label: 'Low',
    value: 1,
    description: 'Rare, irregular training, activity at home.',
  },
  {
    label: 'Average',
    value: 2,
    description: 'Workout 3-5 times a week.',
  },
  {
    label: 'High',
    value: 3,
    description: 'Workout 6-7 times a week.',
  },
  {
    label: 'Very high',
    value: 4,
    description: 'More than 6 workouts per week and physical work.',
  },
];

export {DEF_URL, GENDERS, ACTIVENESS};
