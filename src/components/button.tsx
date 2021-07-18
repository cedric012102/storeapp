//import liraries
import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from './styles/button-style';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ButtonProps {
  text: 'string';
  onPress: () => void;
}

// create a component
const Button = ({text, iconName, iconColor, onPress}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Text style={styles.text}>{text}</Text>
      <AntDesign
            name={iconName}
            size={20}
            color={iconColor}
          />
    </Pressable>
  );
};

//make this component available to the app
export default Button;

//Pressable is a button
