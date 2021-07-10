//import liraries
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screen';
import MenuScreen from '../screens/menu-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './home-stack';
import ShoppingCartStack from './shopping-cart-stack';

const Tab = createBottomTabNavigator();

// create a component
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#e47911',
        activeTintColor: '#ffbd7d',
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="Profile"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={ShoppingCartStack}
        name="ShoppingCart"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="More"
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default BottomTabNav;

//stacking navigators. create different navigation screens and replace them in the components
