import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const menuItems = [
    { title: 'Edit Profile', icon: 'person' },
    { title: 'Orders', icon: 'clipboard' },
    { title: 'Addresses', icon: 'location' },
    { title: 'Payment Methods', icon: 'card' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
           source={require('../(tabs)/doctor.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Email</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={24} color="#2A3F54" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.menuItem, { marginTop: 20 }]}
          onPress={() => router.replace('/signIn')}
        >
          <View style={styles.menuIcon}>
            <Ionicons name="power" size={24} color="#D9534F" />
          </View>
          <Text style={[styles.menuText, { color: '#D9534F' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    width: 30,
    marginRight: 15,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});