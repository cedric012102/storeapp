//import liraries
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import BottomTabNav from './bottom-tab-nav';
import SignUp from '../screens/signup';

const Root = createStackNavigator();

// create a component
const Router = () => {
  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName={'Login'}
        screenOptions={{headerShown: false}}>
        <Root.Screen component={Login} name="Login" />
        <Root.Screen component={BottomTabNav} name="HomeTabs" />
        <Root.Screen
          component={SignUp}
          name="SignUp"
          options={{
            headerShown: true,
          }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Router;
