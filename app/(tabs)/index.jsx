import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categoriesData = [
  { id: '1', title: 'Allopathy', icon: 'medkit' },
  { id: '2', title: 'Ayurveda', icon: 'leaf' },
  { id: '3', title: 'Baby Care', icon: 'baby' },
  { id: '0', title: 'All Categories', isAll: true },
];

const featuredData = [
  { id: '1', name: 'Panadol', price: '20 EGP' },
  { id: '2', name: 'Vitamin C', price: '35 EGP' },
];

function CategoryItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
      <View
        style={[
          styles.categoryImagePlaceholder,
          item.isAll && {
            backgroundColor: '#007bff',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {item.isAll ? (
          <Text style={{ fontSize: 28, color: '#fff' }}>☰</Text>
        ) : (
          <Ionicons name={item.icon} size={24} color="#007bff" />
        )}
      </View>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );
}

function FeaturedItem({ item }) {
  return (
    <TouchableOpacity style={styles.featuredItem}>
      <View style={styles.featuredImagePlaceholder} />
      <Text style={styles.featuredName}>{item.name}</Text>
      <Text style={styles.featuredPrice}>{item.price}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pharmacy</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ccc"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Text style={{ color: '#fff' }}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/cart')}>
          <Text style={{ color: '#fff' }}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.banner}>
          <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
            <Text style={styles.bannerTitle}>Offer Ends Today</Text>
            <Text style={styles.bannerSubtitle}>Save up to 50% on Homeo</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImagePlaceholder} />
        </View>

        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>Categories</Text>
        </View>
        <FlatList
          data={categoriesData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              onPress={() => {
                router.push({
                  pathname: '/Categories',
                  params: item.isAll ? {} : { id: item.id, title: item.title },
                });
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>Featured Medicines</Text>
        </View>
        <FlatList
          data={featuredData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FeaturedItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const bannerHeight = 180;

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
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 35,
    fontSize: 14,
    color: '#000',
  },
  headerIcon: {
    marginLeft: 10,
  },
  banner: {
    backgroundColor: '#eaf7ff',
    flexDirection: 'row',
    borderRadius: 12,
    margin: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  bannerTitle: {
    color: '#007bff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#444',
    marginVertical: 5,
  },
  bannerButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerImagePlaceholder: {
    width: 100,
    height: bannerHeight,
    backgroundColor: '#cce6ff',
    alignSelf: 'flex-end',
  },
  sectionHeaderContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryItem: {
    width: 80,
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e6f3ff',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  featuredItem: {
    width: 100,
    marginRight: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  featuredImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#cce6ff',
    marginBottom: 8,
    borderRadius: 8,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  featuredPrice: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});
