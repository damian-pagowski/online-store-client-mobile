import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import TopBar from './components/TopBar';


const Stack = createStackNavigator();

const RootNavigator = () => {
    const [searchHandler, setSearchHandler] = React.useState(() => () => {});
  
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Products"
          component={(props) => (
            <>
              <TopBar onSearch={searchHandler} navigation={props.navigation} />
              <ProductListScreen {...props} ref={(ref) => setSearchHandler(() => ref?.handleSearch)} />
            </>
          )}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    );
  };

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    fontSize: 16,
    color: '#fff',
  },
});