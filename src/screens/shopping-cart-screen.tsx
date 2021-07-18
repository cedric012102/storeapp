//import liraries
import React, {useState, useEffect} from 'react'; //useeffect fetches a product
import {View, Text, FlatList, ActivityIndicator, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {DataStore, Auth} from 'aws-amplify'; // to display what was clicked on on the home screen. add auth to pass user
// import {Product, CartProduct} from '../models'; //<- this is actual data //imported cartproduct

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

 
  //   const fetchCartProducts = async () => {
  //     const userData = await Auth.currentAuthenticatedUser();
  //     //create function using async to save data and query the data and use .then to set the new value
  //     //query only my cart items.
  //     DataStore.query(CartProduct, cp => cp.userSub("eq", userData.attributes.sub), 
  //     ).then(setCartProducts); //to only get user's cart data.
  //   };

  //   useEffect(() => {
  //     fetchCartProducts(); //call the function here
  // }, []); //this useffect will be called whenever we open this page after navigating from productscreen

    

  // useEffect(() => {
  //   if (cartProducts.filter(cp => !cp.product).length === 0) {
      
  //     return;
  //   } //cp stands for cart product

  //   const fetchProducts = async () => {
  //     //query all products used in cart
  //     const products = await Promise.all(
  //       cartProducts.map(
  //         cartProduct => DataStore.query(Product, cartProduct.productId), //will return a promise
  //       ),
  //     );

  //     //assign the products to the cart items
  //     setCartProducts(currentCartProducts =>
  //       currentCartProducts.map(cartProduct => ({
  //         ...cartProduct,
  //         product: products.find(p => p.id === cartProduct.productId), //p stands for product
  //       })),
  //     );
  //   };

  //   fetchProducts();
  // }, [cartProducts]);

  // useEffect(() => {
  //   const subscription = DataStore.observe(CartProduct).subscribe(msg =>
  //     fetchCartProducts(),
  //   );
  //   return subscription.unsubscribe;
  // }, []);

  // useEffect(() => {
  //   const subscriptions = cartProducts.map(cp =>
  //     DataStore.observe(CartProduct, cp.id).subscribe(msg => {
  //       if (msg.opType === 'UPDATE') {
  //         setCartProducts(curCartProducts => //currentcartproducts
  //           curCartProducts.map(cp => {
  //             if (cp.id !== msg.element.id) {
  //               console.log('differnt id');
  //               return cp;
  //             }
  //             return {
  //               ...cp,
  //               ...msg.element, //objects. overrides
  //             };
  //           }),
  //         );
  //       }
  //     }),
  //   );

    

  //   return () => {
  //     subscriptions.forEach(sub => sub.unsubscribe());
  //   };
  // }, [cartProducts]);

  // const totalPrice = cartProducts.reduce(
  //   (summedPrice, product) =>
  //     summedPrice + (product?.product?.price || 0) * product.quantity,
  //   0,
  // );

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  // if (cartProducts.filter(cp => !cp.product).length !== 0) { //check if there are any cartproducts.
  //   return <ActivityIndicator />;
  // }


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
            <Button text="Proceed To Checkout!" 
            onPress={onCheckout} 
            />
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
