import React, {useEffect, useState} from 'react';
import {I18nManager, Platform, StatusBar} from 'react-native';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {firebaseConfig, MAP_API_KEY} from './src/constants/Config';
import {AsyncKeys, saveItem} from './src/constants/helpers';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import ar from './src/localization/ar';
import en from './src/localization/en';
import {Fonts, ScreenOptions} from './src/constants/styleConstants';
import AppInitializer from './src/screens/AppInitializer';
import {RootState} from "./src/store/store";
import {useSelector} from "react-redux";

const {isRTL, forceRTL, allowRTL} = I18nManager;

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: ar,
    },
    en: {
      translation: en,
    },
  },
  lng: isRTL ? 'ar' : 'en',
  fallbackLng: isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false,
  },
});
const App = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [fcmToken, setFcmToken] = useState('');
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log('firebase token',token)
      await saveItem(AsyncKeys.NOTFICTION_TOKEN, token);
      if (enabled) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app();
      }
    }
    requestUserPermission();
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
          console.log(remoteMessage);
        }
      });
  }, []);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <AppInitializer/>
      <FlashMessage
        position="top"
        hideOnPress={true}
        style={{
          paddingTop: Platform.OS !== 'ios' ? ScreenOptions.StatusBarHeight : 5,
        }}
        titleStyle={{
          fontFamily: Fonts.medium,
          paddingTop:
            Platform.OS !== 'ios' ? ScreenOptions.StatusBarHeight : 10,
          alignSelf: 'flex-start'
        }}
        textStyle={{
          fontFamily: Fonts.medium,
        }}
        floating={Platform.OS === 'ios'}
      />
    </>
  );
};

export default App;
