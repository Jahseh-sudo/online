import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ProductListScreen() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://your-backend-url/api/products'); // Replace with your backend URL
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const response = await fetch(`https://your-backend-url/api/products/${productId}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              Alert.alert('Success', 'Product deleted successfully!');
              fetchProducts(); // Refresh the product list
            } else {
              throw new Error('Failed to delete product');
            }
          } catch (error) {
            Alert.alert('Error', 'Failed to delete product.');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.contactInfo}>Contact: {item.contactInfo}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(item.whatsappLink)}
          style={styles.whatsappButton}>
          <Text style={styles.whatsappText}>Chat on WhatsApp</Text>
        </TouchableOpacity>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => router.push(`../EditProduct/${item.id}`)} // Navigate to Edit Screen
            style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteProduct(item.id)}
            style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Product List</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E1A1A',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: '#777',
  },
  productPrice: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: 'bold',
    marginTop: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  contactInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  whatsappButton: {
    marginTop: 10,
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 5,
  },
  whatsappText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
