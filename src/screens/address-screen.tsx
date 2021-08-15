import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import countryList from 'country-list';
import Button from '../components/button';
import styles from './styles/address-screen-style';
import {useNavigation} from '@react-navigation/native';

const countries = countryList.getData();

const AddressScreen = index => {
  const navigation = useNavigation();
  const [country, setCountry] = useState(countries[0].code);
  const [fullName, setFullname] = useState('');
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [city, setCity] = useState('');


  const onCheckout = () => {
    if (addressError) {
      Alert.alert('Please Fix All Field Errors Before Submitting!');
      return; //return by itself returns nothing(no message)
    }
    if (!fullName) {
      Alert.alert('Please Fill In The Full Name Field!');
      return; //return by itself returns nothing(no message)
    }

    if (!phone) {
      Alert.alert('Please Fill In The Phone Number Field!');
      return; //return by itself returns nothing(no message)
    }

    // console.warn('Success! Checkout!');
    saveOrder(); //will be called after all fields are validated.
  };

  const validateAddress = () => {
    if (address.length < 3) {
      setAddressError('Address Is Too Short');
    }
    if (address.length > 50) {
      setAddressError('Address Is Too Long');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ScrollView style={styles.root}>
        <View style={styles.row}>
          <Picker
            selectedValue={country}
            onValueChange={setCountry} //useState props to store changes/updates, put it in value
          >
            {countries.map(country => (
              <Picker.Item
                key={index}
                value={country.code}
                label={country.name}
              />
            ))}
          </Picker>
        </View>

        {/*full name */}
        <View style={styles.row}>
          <Text style={styles.label}>Full Name (First and Last Name)</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullname} //changes text value
          />
        </View>

        {/*phone number */}
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone} //changes text value
            keyboardType={'phone-pad'}
          />
        </View>

        {/*address */}
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onEndEditing={validateAddress}
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }} //changes text value //start typing to remove text
          />
          {!!addressError && (
            <Text style={styles.errorLabel}>{addressError}</Text>
          )}
        </View>

        {/*city */}
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity} //changes text value
          />
        </View>

        <Button text="Checkout" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;

//countrylist to get list of countries
//!! true or false boolean
