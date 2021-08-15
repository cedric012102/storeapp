//import liraries
import React from 'react';
import {View, Text, ImageBackground, Alert} from 'react-native';
import styles from './styles/login-style';
import Auth from '@react-native-firebase/auth';
import Button from '../components/button';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// create a component
const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        }}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>Shoe Utopia</Text>

        <Button
          text="Continue with Google"
          iconName="google"
          iconColor="rgb(66, 133, 244)"
          onPress={onGoogleButtonPress}
        />
      </ImageBackground>
    </View>
  );

  async function onGoogleButtonPress() {
    try {
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;
      // Create a Google credential with the token
      const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential into Firebase (Auth() is Firebase)
      await Auth().signInWithCredential(googleCredential);

      navigation.navigate('HomeTabs');
    } catch (e) {
      if (e.code !== statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert(
          'Google Login Failure',
          'Google authentication has failed. If this persists, contact us',
          [{text: 'Close', style: 'destructive'}],
        );
      }
    }
  }
};

//make this component available to the app
export default Login;
