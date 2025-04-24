import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const categories = [
  { id: '1', name: 'Allopathy' },
  { id: '2', name: 'Anruvella' },
  { id: '3', name: 'Hanno' },
  { id: '4', name: 'Baby Care' },
  { id: '5', name: 'Marital' },
  { id: '6', name: 'Headcare' },
  { id: '7', name: 'Eosinemes' },
];

const products = [
  { id: '1', name: 'Product 1', categoryId: '1' },
  { id: '2', name: 'Product 2', categoryId: '2' },
  { id: '3', name: 'Product 3', categoryId: '1' },
];

function ProductItem({ item }) {
  return (
    <View style={styles.productItem}>
      <Text style={styles.productText}>{item.name}</Text>
    </View>
  );
}

export default function CategoriesScreen() {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = () => {
    const results = categories.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(results);
  };

  const filteredProducts = id
    ? products.filter(p => p.categoryId === id)
    : products;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <Text style={{ color: '#fff', fontSize: 20 }}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input + Button + Clear */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search categories..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>

        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setFilteredCategories(categories);
              setSearchQuery('');
            }}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>←</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      {filteredCategories.length > 0 ? (
        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Text style={styles.categoryCardText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.categoryRow}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.notFoundText}>No categories found</Text>
      )}

      {/* Products */}
      <Text style={styles.sectionTitle}>
        Products {title ? `(${title})` : ''}
      </Text>
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.notFoundText}>No products found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A3F54',
    marginVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    height: 45,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  clearButton: {
    height: 45,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  categoryCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A3F54',
  },
  productItem: {
    padding: 16,
    backgroundColor: '#E8F5E9',
    marginBottom: 8,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  productText: {
    fontSize: 16,
    color: '#2A3F54',
    fontWeight: '500',
  },
  notFoundText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});
