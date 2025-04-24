import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function CartPage() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <View>
        <Text>Here is the Cart page content.</Text>
      </View>
    </Tabs>
  );
}
