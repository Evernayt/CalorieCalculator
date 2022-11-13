import {
  ImageBackground,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {LeonButton} from '../components';
import {startBg} from '../constants/images';
import {COLORS} from '../constants/theme';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {CALCULATOR_ROUTE, START_ROUTE} from '../constants/routes';
import { useEffect, useState } from 'react';
import { DEF_URL } from '../constants/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_URL_KEY } from '../constants/storage';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

type Props = NativeStackScreenProps<RootStackParamList, typeof START_ROUTE>;

const Start = ({navigation}: Props) => {
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

  const openCalculator = () => {
    navigation.navigate(CALCULATOR_ROUTE);

    if (url && url !== DEF_URL) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <LeonButton text="СТАРТ" onPress={openCalculator} />
      </View>
      <ImageBackground
        source={startBg}
        style={styles.bgContainer}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 99,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingVertical: 48,
  },
  bgContainer: {
    flex: 1,
  },
});

export default Start;
