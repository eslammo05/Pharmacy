import React, { useState, useRef } from 'react';
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
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const originalCategories = [
  { id: '1', title: 'Allopathy', icon: 'medkit' },
  { id: '2', title: 'Ayurveda', icon: 'leaf' },
  { id: '3', title: 'Baby Care', icon: 'baby' },
  { id: '0', title: 'All Categories', isAll: true },
];

const originalFeatured = [
  { id: '1', name: 'Panadol', price: '20 EGP', description: 'دواء لتسكين الألم.' },
  { id: '2', name: 'Vitamin C', price: '35 EGP', description: 'مقوي طبيعي للمناعة.' },
];

// صور البانر اللي انت رفعتها
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

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

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % bannerImages.length;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex });
  };

  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + bannerImages.length) % bannerImages.length;
    setCurrentIndex(prevIndex);
    flatListRef.current?.scrollToIndex({ index: prevIndex });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to our pharmacy</Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
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
        {/* Banner Slider */}
        <View style={styles.bannerSlider}>
          <TouchableOpacity onPress={goToPrevSlide} style={styles.arrow}>
            <Ionicons name="chevron-back" size={24} color="#007bff" />
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={bannerImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentIndex(index);
            }}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={item} style={styles.sliderImage} resizeMode="contain" />
            )}
          />

          <TouchableOpacity onPress={goToNextSlide} style={styles.arrow}>
            <Ionicons name="chevron-forward" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* Banner Text */}
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>عرض لفترة محدودة</Text>
          <Text style={styles.bannerSubtitle}>خصومات حتى 50%</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>تسوق الآن</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
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

        {/* Featured Products */}
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
  bannerSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  sliderImage: {
    width: width,
    height: 200,
  },
  arrow: {
    paddingHorizontal: 5,
  },
  bannerText: {
    backgroundColor: '#eaf7ff',
    margin: 10,
    borderRadius: 12,
    padding: 20,
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
