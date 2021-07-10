//import liraries
import React, {useState, useEffect} from 'react';
import {Text, ScrollView, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native'; //get details
import {DataStore, Auth} from 'aws-amplify'; // to display what was clicked on on the home screen. add auth to pass user
import {Product, CartProduct} from '../models'; //<- this is actual data //imported cartproduct

import styles from './styles/product-screen-style';
import QuantitySelector from '../components/quantity-selector';
import Button from '../components/button';
import ImageCarousel from '../components/image-carousel';

// create a component
const ProductScreen = index => {
  const [product, setProduct] = useState<Product | undefined>(undefined); // | means or. //can use undefined.

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  ); //need to put string and undefined because of useeffect with product. when selecting product.
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!route.params?.id) {
      //if statement if route.params.id doesnt exist.
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct); //parameters are whats inside the parentheses. 2nd parameter will be route.params.id. this querys a specific product.
  }, [route.params?.id]); //[] means use only once whne the component mounts. //put route.params?.id in brackets because it is depended on due to if statement.

  useEffect(() => {
    if (product?.options) {
      //? is if it has something, optional.
      setSelectedOption(product.options[0]);
    }
  }, [product]); //depends on product, called everytime product changes

  const onAddToCart = async () => {
    //just create function as async
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      //if statement if nothing comes back.
      return;
    }

    const newCartProduct = new CartProduct({
      //create another const within button function to hold product info
      userSub: userData.attributes.sub, // this came from console.log(userData) to know what to put
      quantity, //dont need to do anything to quantity because we have it in state
      option: selectedOption, //pass word in usestate because thats the value in our state
      productId: product.id, //make sure fields match data in admin ui.
    });

    await DataStore.save(newCartProduct); //call const function here
    navigation.navigate('ShoppingCart'); //added await to save info and navigation
  };

  if (!product) {
    //if statement using usestate word in case there's no product
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      <ImageCarousel images={product.images} />

      {/*option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>

      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>

      <Text style={styles.description}>{product.description}</Text>

      {/*quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button text={'Add To Cart'} onPress={onAddToCart} />
      <Button
        text={'Buy Now!'}
        onPress={() => {
          console.warn('Buy Now!');
        }}
      />
    </ScrollView>
  );
};

//make this component available to the app
export default ProductScreen;
//console.warn is an alert to let us know a pressable function works.
//use data that's in an object
