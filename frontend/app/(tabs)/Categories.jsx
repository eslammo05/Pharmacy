import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const originalCategories = [
  { id: '1', name: 'Personal Care', image: 'https://via.placeholder.com/150/8fbc8f/ffffff?text=Care' },
  { id: '2', name: 'Medicines', image: 'https://via.placeholder.com/150/4682b4/ffffff?text=Medicine' },
  { id: '3', name: 'Baby Products', image: 'https://via.placeholder.com/150/ffa07a/ffffff?text=Baby' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(originalCategories);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const matched = originalCategories.filter(cat =>
      cat.name.toLowerCase().includes(query)
    );
    setFilteredCategories(matched);
    setIsSearching(true);
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilteredCategories(originalCategories);
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.searchHeaderTitle}>Browse Categories</Text>
          {/* Cart Icon */}
          <TouchableOpacity style={styles.cartIcon} onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
          {isSearching && (
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: '/category', params: { id: item.id, name: item.name } })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  searchHeader: {
    backgroundColor: '#007bff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchHeaderTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cartIcon: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
    fontSize: 16,
    color: '#000',
    elevation: 2,
  },
  searchButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: 'white',
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 65,
    backgroundColor: '#ccc',
    height: 25,
    width: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
