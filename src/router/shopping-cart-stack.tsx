//import liraries
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartScreen from '../screens/shopping-cart-screen';
import AddressScreen from '../screens/address-screen';

const Stack = createStackNavigator();

// create a component
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShoppingCartScreen}
        name="Cart"
        options={{title: 'ShoppingCart', headerLeft: null}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="Address"
        options={{title: 'Address'}}
      />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default HomeStack;

//options to change title of a screen
