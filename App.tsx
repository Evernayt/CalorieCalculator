import React, {useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {FIREBASE_URL_KEY} from './src/constants/storage';
import {WebComponent} from './src/components';
import {Calculator, Result} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CALCULATOR_ROUTE, RESULT_ROUTE} from './src/constants/routes';
import SplashScreen from 'react-native-splash-screen';
import {View} from 'react-native';
import {DEF_URL} from './src/constants/app';

export type RootStackParamList = {
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
  const [url, setUrl] = useState<string>(DEF_URL);

  useEffect(() => {
    AsyncStorage.getItem(FIREBASE_URL_KEY).then(path => {
      remoteConfig()
        .fetchAndActivate()
        .then(() => loadFire(path));
    });
  }, []);

  useEffect(() => {
    if (url !== DEF_URL) {
      SplashScreen.hide();
    }
  }, [url]);

  const loadFire = (path: string | null) => {
    if (path) {
      setUrl(path);
    } else {
      const url = remoteConfig().getValue('url').asString();
      DeviceInfo.isEmulator().then(isEmulator => {
        if (!url || isEmulator) {
          setUrl('');
        } else {
          setUrl(url);
          AsyncStorage.setItem(FIREBASE_URL_KEY, url);
        }
      });
    }
  };

  const renderByUrl = () => {
    if (url === DEF_URL) {
      return null;
    } else if (url) {
      return <WebComponent url={url} disableGoBack />;
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={CALCULATOR_ROUTE}>
            <Stack.Screen name={CALCULATOR_ROUTE} component={Calculator} />
            <Stack.Screen name={RESULT_ROUTE} component={Result} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };

  return <View style={{flex: 1}}>{renderByUrl()}</View>;
};

export default App;
