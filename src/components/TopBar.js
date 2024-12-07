import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const TopBar = ({ navigation, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(searchQuery.trim());
  };

  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>My Store</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButton}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
    width: 150,
  },
  searchButton: {
    backgroundColor: '#0056b3',
    padding: 5,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TopBar;