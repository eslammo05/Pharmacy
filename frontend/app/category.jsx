// app/category/index.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const dummyProducts = {
  '1': [
    { id: '101', name: 'Shampoo', price: '$10', description: 'Hair care shampoo', image: 'https://via.placeholder.com/300x200/8fbc8f/ffffff?text=Shampoo' },
    { id: '102', name: 'Toothpaste', price: '$5', description: 'Fresh mint toothpaste', image: 'https://via.placeholder.com/300x200/8fbc8f/ffffff?text=Toothpaste' },
  ],
  '2': [
    { id: '201', name: 'Paracetamol', price: '$3', description: 'Pain reliever', image: 'https://via.placeholder.com/300x200/4682b4/ffffff?text=Paracetamol' },
  ],
  '3': [
    { id: '301', name: 'Baby Lotion', price: '$8', description: 'Soft baby skin lotion', image: 'https://via.placeholder.com/300x200/ffa07a/ffffff?text=Baby+Lotion' },
  ],
};

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();

  const products = dummyProducts[id] || [];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.title}>{name}</Text>

      {products.length > 0 && (
        <Image source={{ uri: products[0].image }} style={styles.banner} />
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/product',
                params: {
                  name: item.name,
                  price: item.price,
                  description: item.description,
                  image: item.image,
                },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  productImage: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productPrice: { fontSize: 16, color: '#007bff' },
});
