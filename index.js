/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as StoreApp} from './app.json';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

AppRegistry.registerComponent(StoreApp, () => App);
