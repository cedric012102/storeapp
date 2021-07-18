//import liraries
import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './styles/login-style';
import Auth from '@react-native-firebase/auth';
import Button from '../components/button';
import {Input} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { login, subscribeToAuth } from '../assets/controller/login-controller'
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import AntDesign from 'react-native-vector-icons/AntDesign';

// create a component
const Login = ({navigation}) => {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const buttonPressed = () => {
    //     login(email, password, loginComplete)
    //   }

    //   const buttonSignUp = () => {
    //     navigation.navigate('SignUp')
    //   }
    
    //   const loginComplete = () => {
    //     navigation.navigate('HomeTabs')
    //   }
    
    //   useEffect(() => {
    //     subscribeToAuth(authStateChanged)
    //   })
    
     
    //   const authStateChanged = () => {
    //     if(Auth().currentUser !== null){
    //       navigation.navigate('HomeTabs')
    //     }
    //   }
    
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Shoe Utopia</Text>
            
            {/* <View style={{padding: 1, backgroundColor: "#ffffff80", marginBottom: 10, marginVertical: 5,}}>
            <Input
            placeholder="Enter Email"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize={'none'}
            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholderTextColor={'black'}
          />
          </View>

          <View style={{padding: 1, backgroundColor: '#ffffff80', marginBottom: 10, marginVertical: 5}}>
            <Input
             placeholder="Enter Password" secureTextEntry={true} 
             value={password}
             onChangeText={text => setPassword(text)}
             autoCapitalize={'none'}
             leftIcon={<FontAwesome name="lock" size={24} color="black" />}
             placeholderTextColor={'black'}
          />
          </View> */}

            {/* <Button text="SIGN IN" onPress={buttonPressed}/> */}
            <Button text="Continue with Google" iconName='google' iconColor="rgb(66, 133, 244)" onPress={onGoogleButtonPress} />
            
            {/* <Text style={{color: 'red', alignSelf: 'flex-start', marginTop: 15, top: 5,}}>No Account?</Text>
            
            <Button text="SIGN UP" onPress={buttonSignUp}/> */}
            
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
