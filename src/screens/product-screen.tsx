// //import liraries
// import React, {useState, useEffect} from 'react';
// import {Text, ScrollView, ActivityIndicator} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import {useRoute, useNavigation} from '@react-navigation/native'; //get details
// // import {DataStore, Auth} from 'aws-amplify'; // to display what was clicked on on the home screen. add auth to pass user
// // import {Product, CartProduct} from '../models'; //<- this is actual data //imported cartproduct

// import styles from './styles/product-screen-style';
// import QuantitySelector from '../components/quantity-selector';
// import Button from '../components/button';
// import ImageCarousel from '../components/image-carousel';
// import Auth from '@react-native-firebase/auth';
// import Firestore from '@react-native-firebase/firestore';

// // create a component
// const ProductScreen = index => {
//   const [product, setProduct] = useState<Product | undefined>(undefined); // | means or. //can use undefined.

//   const [selectedOption, setSelectedOption] = useState<string | undefined>(
//     undefined,
//   ); //need to put string and undefined because of useeffect with product. when selecting product.
//   const [quantity, setQuantity] = useState(1);

//   const navigation = useNavigation();
//   const route = useRoute();

//   useEffect(() => {
//     if (!route.params?.id) {
//       //if statement if route.params.id doesnt exist.
//       return;
//     }
//     DataStore.query(Product, route.params.id).then(setProduct); //parameters are whats inside the parentheses. 2nd parameter will be route.params.id. this querys a specific product.
//   }, [route.params?.id]); //[] means use only once whne the component mounts. //put route.params?.id in brackets because it is depended on due to if statement.

//   useEffect(() => {
//     if (product?.options) {
//       //? is if it has something, optional.
//       setSelectedOption(product.options[0]);
//     }
//   }, [product]); //depends on product, called everytime product changes

//   const onAddToCart = async () => {
//     //just create function as async
//     const userData = await Auth().currentUser.uid;

//     if (!product || !userData) {
//       //if statement if nothing comes back.
//       return;
//     }

  

//     await Firestore().collection('posts').add({
//       product,
//       selectedOption,
//       quantity,
//       userId: Auth().currentUser.uid,
//     });
//     navigation.navigate('ShoppingCart'); //added await to save info and navigation
//   };

//   if (!product) {
//     //if statement using usestate word in case there's no product
//     return <ActivityIndicator />;
//   }

//   return (
//     <ScrollView style={styles.root}>
//       <Text style={styles.title}>{product.title}</Text>

//       <ImageCarousel images={product.images} />

//       {/*option selector */}
//       <Picker
//         selectedValue={selectedOption}
//         onValueChange={itemValue => setSelectedOption(itemValue)}>
//         {product.options.map(option => (
//           <Picker.Item key={index} label={option} value={option} />
//         ))}
//       </Picker>

//       <Text style={styles.price}>
//         from ${product.price.toFixed(2)}
//         {product.oldPrice && (
//           <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
//         )}
//       </Text>

//       <Text style={styles.description}>{product.description}</Text>

//       {/*quantity selector */}
//       <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
//       <Button text={'Add To Cart'} onPress={onAddToCart} />
//       <Button
//         text={'Buy Now!'}
//         onPress={() => {
//           console.warn('Buy Now!');
//         }}
//       />
//     </ScrollView>
//   );
// };

// //make this component available to the app
// export default ProductScreen;
// //console.warn is an alert to let us know a pressable function works.
// //use data that's in an object

import React, { useState, useEffect } from 'react';
import {Text, ScrollView, ActivityIndicator, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import Firestore from '@react-native-firebase/firestore';
import styles from './styles/product-screen-style';
import QuantitySelector from '../components/quantity-selector';
import Button from '../components/button';
import Auth from '@react-native-firebase/auth';
import ImageCarousel from '../components/image-carousel';


const ProductScreen = index => {
  const navigation = useNavigation();
  const route = useRoute();
    const [products, setProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(
      undefined,
    ); 
    const [quantity, setQuantity] = useState(1);
   
    const image = route.params.image;
    const title = route.params.title;
    const price = route.params.price;
    const oldPrice = route.params.oldPrice;
    const description = route.params.description;
    const id = route.params.id;

    useEffect(() => {
      navigation.setOptions({
        title: 'Product Screen',
      });
    }, []);
    useEffect(onSyncProducts, []);

    return (
      <ScrollView style={styles.root}>
      <Text style={styles.title}>{title}</Text>

      {/* <ImageCarousel images={images} /> */}
      <Image source={{ uri: image }} style={styles.image}/>

      {/*option selector */}
       <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {/* {products.map(option => ( */}
          <Picker.Item key={index} label='Select Size' value='sizes' />
          <Picker.Item key={index} label='Size 8' value='8' />
          <Picker.Item key={index} label='Size 8.5' value='8.5' />
          <Picker.Item key={index} label='Size 9' value='9' />
          <Picker.Item key={index} label='Size 9.5' value='9.5' />
          <Picker.Item key={index} label='Size 10' value='10' />
          <Picker.Item key={index} label='Size 10.5' value='10.5' />
          <Picker.Item key={index} label='Size 11' value='11' />
          <Picker.Item key={index} label='Size 11.5' value='11.5' />
          <Picker.Item key={index} label='Size 12' value='12' />
          <Picker.Item key={index} label='Size 11.5' value='11.5' />
          <Picker.Item key={index} label='Size 12' value='12' />
          <Picker.Item key={index} label='Size 12.5' value='12.5' />
          <Picker.Item key={index} label='Size 13' value='13' />
        {/* ))} */}
      </Picker>  

      <Text style={styles.price}>
        from ${price}
        {oldPrice && (
          <Text style={styles.oldPrice}>${oldPrice}</Text>
        )}
      </Text>

      <Text style={styles.description}>{description}</Text>

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
  
    function onSyncProducts() {
      const unsubscribe = Firestore()
        .collection('product')
        .onSnapshot({
          next: collection => {
            const collectionDocuments = collection.docs.map(item => item.data());
            setProducts(collectionDocuments);
          },
        });
  
      return unsubscribe;
    }
    
    async function onAddToCart() {
      try {
        await Firestore().collection('CartProduct').add({
          userId: Auth().currentUser.uid,
          quantity,
          selectedOption,
          id: id,
          title: title,
          price: price,
          image: image,
          oldPrice: oldPrice,
        });
        navigation.navigate('ShoppingCart');
      } catch(e) {
        console.log(e);
      }
    }
  }
  
  export default ProductScreen;