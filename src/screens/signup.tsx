//import liraries
import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {signUp} from '../assets/controller/login-controller';
import Button from '../components/button';
import styles from './styles/signup-style';

// create a component
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonPressed = () => {
    signUp(email, password, signUpComplete);
  };

  const signUpComplete = () => {
    navigation.navigate('HomeTabs');
  };

  const input = React.createRef();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shoe Utopia</Text>
      <Image source={require('../assets/images/AirJordan1.jpg')} />
      <Input
        ref={input}
        clear
        placeholder="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize={'none'}
        leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
      />

      <Input
        ref={input}
        clear
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize={'none'}
        leftIcon={<FontAwesome name="lock" size={24} color="black" />}
      />

      <Button text="SIGN UP" onPress={buttonPressed} />
    </View>
  );
};

//make this component available to the app
export default SignUp;
