//import liraries
import React, {useState, useEffect} from 'react'; //useeffect fetches a product
import {View, Text, FlatList, ActivityIndicator, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './styles/shopping-cart-screen-style';
import CartProductItem from '../components/cart-product-item';
import Button from '../components/button';
import Firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

// create a component
const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState([]); //will be an empty array

  const navigation = useNavigation();

  useEffect(onSyncProducts, []);

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  return (
    <View style={styles.page}>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              SubTotal ({cartProducts.length} items):{' '}
              {/* <Text style={{color: '#e47911'}}>${totalPrice.toFixed(2)}</Text> */}
            </Text>
            <Button text="Proceed To Checkout!" onPress={onCheckout} />
          </View>
        )}
      />
    </View>
  );

  function onSyncProducts() {
    const unsubscribe = Firestore()
      .collection('CartProduct')
      .where('userId', '==', Auth().currentUser.uid)
      .onSnapshot({
        next: collection => {
          const collectionDocuments = collection.docs.map(item => item.data());
          setCartProducts(collectionDocuments);
        },
      });

    return unsubscribe;
  }
};

export default ShoppingCartScreen;
//make this component available to the app
//reduce puts amount added to one vale
//toFixed() gets rid of extra 0s after amount
