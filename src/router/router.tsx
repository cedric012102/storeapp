//import liraries
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import BottomTabNav from './bottom-tab-nav';

const Root = createStackNavigator();

// create a component
const Router = () => {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        <Root.Screen component={BottomTabNav} name="HomeTabs" />
      </Root.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Router;
