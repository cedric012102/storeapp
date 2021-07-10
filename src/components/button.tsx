//import liraries
import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from './styles/button-style';

interface ButtonProps {
  text: 'string';
  onPress: () => void;
}

// create a component
const Button = ({text, onPress}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

//make this component available to the app
export default Button;

//Pressable is a button
