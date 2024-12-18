import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // For navigation

export function Electronics() {
  const router = useRouter(); // Initialize the router for navigation

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200' }} // Placeholder image URL
        style={styles.productImage}
      />
      
      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>ELECTRONICS</Text>
        <Text style={styles.productPrice}>N 80,000</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionText}>
          Latest Tech Gadgets{'\n'}
          {'\n'}- High performance{'\n'}- Reliable and Durable{'\n'}
          {'\n'}Contact info: +234111222333
        </Text>
      </View>

      {/* Order Button and Icon */}
      <View style={styles.orderContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => router.push('/order')} // Navigate to the order screen
        >
          <Text style={styles.orderText}>ORDER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderIcon}>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B1F1F',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
  },
  descriptionContainer: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#00C851',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  orderIcon: {
    backgroundColor: '#00C851',
    padding: 15,
    borderRadius: 10,
  },
});
