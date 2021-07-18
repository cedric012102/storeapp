import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  title: {},
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  
  image: {
    margin: 10,
    height: 250,
    resizeMode: 'contain',
  },
});

export default styles;

//rnstyles for snippet
