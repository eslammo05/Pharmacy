import React, { useState } from "react";
import { useRouter } from "expo-router";
import Swiper from 'react-native-swiper';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/images/logo pharmacy white.png";

const originalCategories = [
  { id: "1", title: "Allopathy", icon: "medkit" },
  { id: "2", title: "Ayurveda", icon: "leaf" },
  { id: "3", title: "Baby Care", icon: "baby" },
  { id: "0", title: "All Categories", isAll: true },
];

const { width } = Dimensions.get('window');

const originalFeatured = [
  { id: "1", name: "Panadol", price: "20 EGP", description: "Pain relief medication." },
  { id: "2", name: "Vitamin C", price: "35 EGP", description: "Natural immune booster." },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(originalCategories);
  const [filteredProducts, setFilteredProducts] = useState(originalFeatured);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const matchedCategories = originalCategories.filter((cat) =>
      cat.title.toLowerCase().includes(query)
    );
    const matchedProducts = originalFeatured.filter((prod) =>
      prod.name.toLowerCase().includes(query)
    );
    setFilteredCategories(matchedCategories);
    setFilteredProducts(matchedProducts);
    setIsSearching(true);
  };

  const handleReset = () => {
    setFilteredCategories(originalCategories);
    setFilteredProducts(originalFeatured);
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.authButtonText}>Sign In/Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push("/cart")}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
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

      <ScrollView style={styles.content}>
        {/* Offers Slider */}
        <Text style={styles.sliderTitle}> Best Offers</Text>
        <View style={styles.bannerContainer}>
          <Swiper
            autoplay
            autoplayTimeout={5}
            showsButtons
            dotColor="#ccc"
            activeDotColor="#007bff"
            style={styles.swiper}
            loop
          >
            <Image source={require('../../assets/images/first img.png')} style={styles.bannerImage} />
            <Image source={require('../../assets/images/sec img.png')} style={styles.bannerImage} />
            <Image source={require('../../assets/images/third img.png')} style={styles.bannerImage} />
            <Image source={require('../../assets/images/forth img.png')} style={styles.bannerImage} />
            <Image source={require('../../assets/images/fifth img.png')} style={styles.bannerImage} />
          </Swiper>
        </View>

        {/* Categories */}
        <Text style={styles.sectionHeader}>Categories</Text>
        <FlatList
          data={filteredCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                router.push({
                  pathname: "/Categories",
                  params: item.isAll ? {} : { id: item.id, title: item.title },
                })
              }
            >
              <View style={styles.categoryIcon}>
                {item.isAll ? (
                  <Text style={{ fontSize: 24, color: "#fff" }}>☰</Text>
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
        <Text style={styles.sectionHeader}>Featured Products</Text>
        <FlatList
          data={filteredProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.featuredItem}
              onPress={() =>
                router.push({
                  pathname: "/product",
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
    height: 70,
  },
  logo: {
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  authButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  cartButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
    position: "relative",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
    fontSize: 16,
    color: "#000",
  },
  searchButton: {
    position: "absolute",
    right: 15,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    position: "absolute",
    right: 65,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginBottom: 10,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  bannerContainer: {
    width: width,
    height: 500,
    alignSelf: "center",
    marginBottom: 10,
  },
  bannerImage: {
    width: width,
    height: 500 ,
    resizeMode: "cover",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
    marginTop: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#e6f3ff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  featuredItem: {
    width: 120,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 10,
  },
  featuredImagePlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#cce6ff",
    borderRadius: 8,
    marginBottom: 10,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
  },
  featuredPrice: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
});
