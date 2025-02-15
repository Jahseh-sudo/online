import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;

export default function ShoppingScreen() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetching products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://campus-trade-l3d4.vercel.app'); // Change to your backend URL
        if (!response.ok) throw new Error('Failed to fetch products');
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        Alert.alert('Error', 'Failed to load products');
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    Toast.show({
      type: 'success',
      text1: 'Product added to cart!',
      text2: `${product.name} has been added.`,
    });
    console.log('Adding to cart:', product);
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    console.log('Removing from cart:', productId);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    router.push('../checkout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>YOUR <Text style={styles.highlight}>CART</Text></Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading products...</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>₦{item.price}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: ₦{cart.reduce((total, item) => total + parseFloat(item.price), 0)}
            </Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={styles.heading}>ADD PRODUCTS</Text>
      <View style={styles.grid}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => addToCart(product)}
          >
            <Image source={{ uri: product.image_url }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>₦{product.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B1F1F',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlight: {
    color: '#FF7F11',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  productCard: {
    backgroundColor: '#FF7F11',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    width: screenWidth / 2 - 20, // Adjust width for responsiveness
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Added shadow effect
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#fff',
  },
  cartItem: {
    backgroundColor: '#B0B0B0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#000',
  },
  removeButton: {
    backgroundColor: '#841111',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#841111',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3, // Added shadow effect for button
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
