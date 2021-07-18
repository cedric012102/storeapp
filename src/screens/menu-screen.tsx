//import liraries
import React from 'react';
import {SafeAreaView} from 'react-native';
import Auth from '@react-native-firebase/auth';
import Button from '../components/button';
import {StackActions, useNavigation} from '@react-navigation/native';

// create a component
const MenuScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Button text="Sign Out" onPress={onLogout} />
    </SafeAreaView>
  );

  function onLogout() {
    //Logout functionality here
    Auth().signOut();
    navigation.dispatch(StackActions.replace('Login'));
  }
};

//make this component available to the app
export default MenuScreen;
