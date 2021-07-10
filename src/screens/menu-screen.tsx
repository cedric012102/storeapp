//import liraries
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../components/button';

// create a component
const MenuScreen = () => {
  const onLogout = () => {
    Auth.signOut();
  };
  return (
    <SafeAreaView>
      <Button text="Sign Out" onPress={onLogout} />
    </SafeAreaView>
  );
};

//make this component available to the app
export default MenuScreen;
