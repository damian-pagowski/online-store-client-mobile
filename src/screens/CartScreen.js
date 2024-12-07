import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    alert('Purchase completed!');
    await AsyncStorage.removeItem('cart'); // Clear the cart
    setCartItems([]); // Reset cart state
    navigation.navigate('Products'); // Navigate back to the product list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart:</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => (
          <Text style={styles.cartItem}>
            {/* {JSON.stringify(item)} */}
            {item.name} x{item.quantity} - ${item.price}
          </Text>
        )}
      />
      <Text style={styles.total}>Total: ${calculateTotal()}</Text>
      <View style={styles.buttons}>
        <Button title="Continue Shopping" onPress={() => navigation.navigate('Products')} />
        <Button title="Checkout" onPress={handleCheckout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CartScreen;