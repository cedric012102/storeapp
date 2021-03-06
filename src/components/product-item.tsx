import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import styles from './styles/product-item-style';

interface ProductItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    avgRating: number;
    ratings: number;
    price: number;
    oldPrice?: number;
    description: string;
    images: string;
  };
}

const ProductItem = ({item}: ProductItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ProductDetails', {
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      oldPrice: item.oldPrice,
      description: item.description,
    });
  };
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <View style={styles.ratingsContainer}>
          {[0, 0, 0, 0, 0].map((el, i) => (
            <FontAwesome
              key={`${item.id}-${i}`}
              style={styles.star}
              name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />
          ))}
          <Text>{item.ratings}</Text>
        </View>
        <Text style={styles.price}>
          from ${item.price}.00
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice}.00</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;

//Math.floor function returns the largest integer less than or equal to a given number.
//how to navigate from product to product details
//.toFixed() changes amount of numbers. line46
