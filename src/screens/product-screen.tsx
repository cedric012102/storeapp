import React, {useState, useEffect} from 'react';
import {Text, ScrollView, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import Firestore from '@react-native-firebase/firestore';
import styles from './styles/product-screen-style';
import QuantitySelector from '../components/quantity-selector';
import Button from '../components/button';
import Auth from '@react-native-firebase/auth';

const ProductScreen = (index) => {
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
      <Image source={{uri: image}} style={styles.image} />

      {/*option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {/* {products.map(option => ( */}
        <Picker.Item key={index} label="Select Size" value="sizes" />
        <Picker.Item key={index} label="Size 8" value="8" />
        <Picker.Item key={index} label="Size 8.5" value="8.5" />
        <Picker.Item key={index} label="Size 9" value="9" />
        <Picker.Item key={index} label="Size 9.5" value="9.5" />
        <Picker.Item key={index} label="Size 10" value="10" />
        <Picker.Item key={index} label="Size 10.5" value="10.5" />
        <Picker.Item key={index} label="Size 11" value="11" />
        <Picker.Item key={index} label="Size 11.5" value="11.5" />
        <Picker.Item key={index} label="Size 12" value="12" />
        <Picker.Item key={index} label="Size 11.5" value="11.5" />
        <Picker.Item key={index} label="Size 12" value="12" />
        <Picker.Item key={index} label="Size 12.5" value="12.5" />
        <Picker.Item key={index} label="Size 13" value="13" />
        {/* ))} */}
      </Picker>

      <Text style={styles.price}>
        from ${price}
        {oldPrice && <Text style={styles.oldPrice}>${oldPrice}</Text>}
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
    } catch (e) {
      console.log(e);
    }
  }
};

export default ProductScreen;
