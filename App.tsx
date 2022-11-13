import {Calculator, Result, Start} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CALCULATOR_ROUTE,
  RESULT_ROUTE,
  START_ROUTE,
} from './src/constants/routes';

export type RootStackParamList = {
  START_ROUTE: undefined;
  CALCULATOR_ROUTE: undefined;
  RESULT_ROUTE: {
    calories: number;
    fat: number;
    protein: number;
    carbohydrate: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={START_ROUTE}>
        <Stack.Screen name={START_ROUTE} component={Start} />
        <Stack.Screen name={CALCULATOR_ROUTE} component={Calculator} />
        <Stack.Screen name={RESULT_ROUTE} component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
