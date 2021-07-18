// import React, {useState} from 'react';
// import {View, Image, Text} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import styles from './styles/cart-product-item-stye';
// import QuantitySelector from './quantity-selector';
// // import {DataStore} from 'aws-amplify'; // to display what was clicked on on the home screen. add auth to pass user
// // import {CartProduct} from '../models'; //<- this is actual data //imported cartprod

// interface CartProductItemProps {
//   cartItem: CartProduct; //from aws
// }

// const CartProductItem = ({cartItem}: CartProductItemProps) => {
//   const {product, ...cartProduct} = cartItem;

//   const updateQuantity = async (newQuantity: number) => {
//     const original = await DataStore.query(CartProduct, cartProduct.id);

//     await DataStore.save(
//       CartProduct.copyOf(original, updated => {
//         //cartItem is the object. this is from interface above
//         updated.quantity = newQuantity;
//       }),
//     );
//   };

//   return (
//     <View style={styles.root}>
//       <View style={styles.row}>
//         <Image style={styles.image} source={{uri: product.image}} />
//         <View style={styles.rightContainer}>
//           <Text style={styles.title} numberOfLines={3}>
//             {product.title}
//           </Text>
//           <View style={styles.ratingsContainer}>
//             {[0, 0, 0, 0, 0].map((el, i) => (
//               <FontAwesome
//                 key={`${product.id}-${i}`}
//                 style={styles.star}
//                 name={i < Math.floor(product.avgRating) ? 'star' : 'star-o'}
//                 size={18}
//                 color={'#e47911'}
//               />
//             ))}
//             <Text>{product.ratings}</Text>
//           </View>
//           <Text style={styles.price}>
//             {product.price}
//             {product.oldPrice && (
//               <Text style={styles.oldPrice}>${product.oldPrice}</Text>
//             )}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.quantityContainer}>
//         <QuantitySelector
//           quantity={cartProduct.quantity}
//           setQuantity={updateQuantity}
//         />
//       </View>
//     </View>
//   );
// };

// export default CartProductItem;

//Math.floor function returns the largest integer less than or equal to a given number.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActionSheetIOS,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles/cart-product-item-stye';
import QuantitySelector from './quantity-selector';
// import Auth from '@react-native-firebase/auth';
// import Firestore from '@react-native-firebase/firestore';



const CartProductItem = ({ cartItem, route, navigation }) => {
  const {product, ...cartProduct} = cartItem;


  // useEffect(onSyncProducts, []);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: cartItem.image}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {cartItem.title}
          </Text>
          <View style={styles.ratingsContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${cartItem.id}-${i}`}
                style={styles.star}
                name={i < Math.floor(cartItem.avgRating) ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}
            {/* <Text>{cartItem.ratings}</Text> */}
          </View>
          <Text style={styles.price}>
            {cartItem.price}
            {cartItem.oldPrice && (
              <Text style={styles.oldPrice}>${cartItem.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        {/* <QuantitySelector
          quantity={cartItem.quantity}
          setQuantity={updateQuantity}
        /> */}
      </View>
    </View>
  );


};

export default CartProductItem;

