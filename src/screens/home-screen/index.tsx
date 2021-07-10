import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ProductItem from '../../components/product-item';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models'; //<- this is actual data
import styles from '../styles/home-screen-index-styles';
// import products from '../../assets/data/products'; //<- this is dummydata

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = useState<Product[]>([]); //. this is how you usestate product from models. will be an array.
  useEffect(() => {
    //double parenthese in useeffect
    DataStore.query(Product).then(setProducts); //put what you want to query in parentheses. this querys all products. put .then and put setter in parentheses.
  }, []);
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

//when wanting data, import { DataStore } from 'aws-amplify'; and for example, Products from models.
//useeffect to query product and usestate to save in state.
