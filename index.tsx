/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as StoreApp} from './app.json';
import * as firebase from 'firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: 'AIzaSyAM6u8FEOdE91hVXDa1a5aYCzMTDR4_3MM',
  authDomain: 'storeapp-bab26.firebaseapp.com',
  projectId: 'storeapp-bab26',
  storageBucket: 'storeapp-bab26.appspot.com',
  messagingSenderId: '1019409082418',
  appId: '1:1019409082418:web:50f01ff1cb9751b144342b',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '1019409082418-ihv6agkc5fdqltgupahbdqd7ltosvpll.apps.googleusercontent.com',
});

AppRegistry.registerComponent(StoreApp, () => App);
