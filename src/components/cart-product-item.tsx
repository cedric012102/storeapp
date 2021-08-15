import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import QuantitySelector from './quantity-selector';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles/cart-product-item-stye';
import firebase from 'firebase';

const CartProductItem = ({cartItem}) => {
  const {product, ...cartProduct} = cartItem;

  const ref = firebase.firestore().collection('CartProduct');

  function deleteProduct(item) {
    ref

      .doc(item.id)
      .delete()
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <TouchableOpacity onPress={() => deleteProduct()}>
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
    </TouchableOpacity>
  );
};

export default CartProductItem;
