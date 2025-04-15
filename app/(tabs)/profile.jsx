import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter(); 

  const menuItems = [
    { title: 'My Orders', icon: 'list' },
    { title: 'My Medicine', icon: 'medkit' },
    { title: 'My Details', icon: 'person' },
    { title: 'Address', icon: 'map' },
    { title: 'Payment Methods', icon: 'card' },
    { title: 'Notifications', icon: 'notifications' },
    { title: 'Help', icon: 'help-circle' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={60} color="#666" />
        </View>

        {isLoggedIn ? (
          <>
            <Text style={styles.name}>User</Text>
            <Text style={styles.email}>User1234@gmail.com</Text>
          </>
        ) : (
          <>
            <Text style={styles.welcome}>Welcome to Pharmacy App</Text>
            <View style={styles.authButtons}>
              <TouchableOpacity
                style={styles.authButton}
                onPress={() => router.push('/signIn')}
              >
                <Text style={styles.authButtonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.authButton, styles.signUpButton]}
                onPress={() => router.push('/signUp')}
              >
                <Text style={styles.authButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {isLoggedIn && (
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => console.log(item.title)}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={24} color="#666" />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  avatarContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 60,
    padding: 15,
    marginBottom: 15,
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
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  authButton: {
    backgroundColor: '#2A3F54',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
