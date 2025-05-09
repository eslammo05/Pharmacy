import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { auth, db } from '../firebase/config';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const dummyProducts = {
  '1': [
    { id: '101', name: 'Shampoo', price: '$10', description: 'Hair care shampoo', image: 'data:image/jpeg;base64,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' },
    { id: '102', name: 'Toothpaste', price: '$5', description: 'Fresh mint toothpaste', image: 'data:image/jpeg;base64,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' },
  ],
  '2': [
    { id: '201', name: 'Paracetamol', price: '$3', description: 'Pain reliever', image: 'https://c8.alamy.com/comp/EBY4RR/pack-of-tesco-paracetamol-500mg-tablets-isolated-on-white-background-EBY4RR.jpg' },
  ],
  '3': [
    { id: '301', name: 'Baby Lotion', price: '$8', description: 'Soft baby skin lotion', image: 'https://th.bing.com/th/id/OIP.JxK1J8XNbjGQ_dL9HvA8PgHaHa?w=206&h=206&c=7&r=0&o=5&cb=iwc1&dpr=1.3&pid=1.7' },
  ],
};

const categoryImages = {
  '1': 'https://media.istockphoto.com/id/1141698953/photo/spa-products-for-home-skin-care.jpg',
  '2': 'https://t3.ftcdn.net/jpg/01/23/50/42/240_F_123504209_4NkjQues2cPzrLsrxq7ULUhxAwuGBtd6.jpg',
  '3': 'data:image/jpeg;base64,...',
};

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState(dummyProducts[id] || []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  // Check if user is admin
  const checkAdminStatus = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newId = Date.now().toString();
    const updatedProducts = [...products, { ...newProduct, id: newId }];
    setProducts(updatedProducts);
    dummyProducts[id] = updatedProducts;
    setModalVisible(false);
    setNewProduct({ name: '', price: '', description: '', image: '' });
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedProducts = products.filter(item => item.id !== productId);
            setProducts(updatedProducts);
            dummyProducts[id] = updatedProducts;
          },
        },
      ]
    );
  };

  const categoryBanner = categoryImages[id];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.title}>{name}</Text>

      {isAdmin && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      )}

      {categoryBanner && (
        <Image source={{ uri: categoryBanner }} style={styles.banner} />
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
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
                <Text style={styles.productDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
            
            {isAdmin && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteProduct(item.id)}
              >
                <Ionicons name="trash" size={20} color="#ff4444" />
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Add Product Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Product</Text>
            
            <TextInput
              placeholder="Product Name"
              style={styles.input}
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({...newProduct, name: text})}
            />
            
            <TextInput
              placeholder="Price"
              style={styles.input}
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({...newProduct, price: text})}
              keyboardType="numeric"
            />
            
            <TextInput
              placeholder="Description"
              style={styles.input}
              value={newProduct.description}
              onChangeText={(text) => setNewProduct({...newProduct, description: text})}
              multiline
            />
            
            <TextInput
              placeholder="Image URL"
              style={styles.input}
              value={newProduct.image}
              onChangeText={(text) => setNewProduct({...newProduct, image: text})}
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#999"
              />
              <Button
                title="Add Product"
                onPress={handleAddProduct}
                color="#007bff"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});