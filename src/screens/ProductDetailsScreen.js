import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductDetails } from '../api/api';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(productId);

        // Validate and set the product
        setProduct({
          name: data?.name || 'Unknown Product',
          image: data?.image || 'https://via.placeholder.com/200', // Placeholder image
          description: data?.description || 'No description available.',
          price: data?.price !== undefined ? data.price.toString() : '0.00',
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
        Alert.alert('Error', 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const existingItem = cart.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, productId, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Success', 'Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Alert.alert('Error', 'Failed to add product to cart.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Product details are not available.</Text>
        <Button title="Back to Products" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
      <Button title="Back to Products" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProductDetailsScreen;