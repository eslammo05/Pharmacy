import React, { useState } from 'react';
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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const originalCategories = [
  { id: '1', title: 'Allopathy', icon: 'medkit' },
  { id: '2', title: 'Ayurveda', icon: 'leaf' },
  { id: '3', title: 'Baby Care', icon: 'baby' },
  { id: '0', title: 'All Categories', isAll: true },
];

const originalFeatured = [
  { id: '1', name: 'Panadol', price: '20 EGP', description: 'دواء لتسكين الألم.' , image :'https://www.bing.com/th/id/OIP.9qAXo8GMIP76CQsI9KUraQHaIp?w=162&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'},
  { id: '2', name: 'Vitamin C', price: '35 EGP', description: 'مقوي طبيعي للمناعة.' },
];

const bannerImages = [
  require('../(tabs)/image0.png'),
  require('../(tabs)/image1.png'),
  require('../(tabs)/image2.png'),
  require('../(tabs)/image3.png'),
];

export default function HomeScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(originalCategories);
  const [filteredProducts, setFilteredProducts] = useState(originalFeatured);
  const [isSearching, setIsSearching] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const matchedCategories = originalCategories.filter(cat =>
      cat.title.toLowerCase().includes(query)
    );
    const matchedProducts = originalFeatured.filter(prod =>
      prod.name.toLowerCase().includes(query)
    );

    setFilteredCategories(matchedCategories);
    setFilteredProducts(matchedProducts);
    setIsSearching(true);
  };

  const handleReset = () => {
    setFilteredCategories(originalCategories);
    setFilteredProducts(originalFeatured);
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to our pharmacy</Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#ccc"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
        {isSearching && (
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <View style={styles.banner}>
          <Image
            source={bannerImages[currentBannerIndex]}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerTextOverlay}>
            <Text style={styles.bannerTitle}>عرض لفترة محدودة</Text>
            <Text style={styles.bannerSubtitle}>خصومات حتى 50%</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>تسوق الآن</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerArrows}>
            <TouchableOpacity onPress={handlePrevBanner}>
              <Ionicons name="arrow-back-circle" size={32} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextBanner}>
              <Ionicons name="arrow-forward-circle" size={32} color="#007bff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionHeader}>الفئات</Text>
        <FlatList
          data={filteredCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                router.push({
                  pathname: '/Categories',
                  params: item.isAll ? {} : { id: item.id, title: item.title },
                })
              }
            >
              <View style={styles.categoryIcon}>
                {item.isAll ? (
                  <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
                ) : (
                  <Ionicons name={item.icon} size={24} color="#007bff" />
                )}
              </View>
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        <Text style={styles.sectionHeader}>منتجات مميزة</Text>
        <FlatList
          data={filteredProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.featuredItem}
              onPress={() =>
                router.push({
                  pathname: '/product',
                  params: {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                  },
                })
              }
            >
              <View style={styles.featuredImagePlaceholder} />
              <Text style={styles.featuredName}>{item.name}</Text>
              <Text style={styles.featuredPrice}>{item.price}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 14,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#007bff',
    height: 45,
    width: 45,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#007bff',
    height: 45,
    width: 45,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#eaf7ff',
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  bannerTextOverlay: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  bannerArrows: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    flexDirection: 'row',
    gap: 10,
  },
  bannerTitle: {
    color: '#007bff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#333',
    marginTop: 5,
  },
  bannerButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#e6f3ff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  featuredItem: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  featuredImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#cce6ff',
    borderRadius: 8,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 5,
  },
  featuredPrice: {
    fontSize: 12,
    color: '#333',
  },
});
