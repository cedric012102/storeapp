import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ProductItem from '../../components/product-item';
// import {DataStore} from 'aws-amplify';
// import storage from '@react-native-firebase/storage';
// import {Product} from '../../models'; //<- this is actual data
import styles from '../styles/home-screen-index-styles';
// import products from '../../assets/data/products'; //<- this is dummydata
import Firestore from '@react-native-firebase/firestore';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = useState([]); //. this is how you usestate product from models. will be an array.
  useEffect(onSyncProducts, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
};

export default HomeScreen;

//when wanting data, import { DataStore } from 'aws-amplify'; and for example, Products from models.
//useeffect to query product and usestate to save in state.
