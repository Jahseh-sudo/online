import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function AddProductScreen() {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: 'Electronics', icon: require('../assets/images/electronics.png') },
    { label: 'Food', icon: require('../assets/images/food.png') },
    { label: 'Snacks', icon: require('../assets/images/snacks.png') },
    { label: 'Beauty', icon: require('../assets/images/beauty.png') },
    { label: 'Services', icon: require('../assets/images/services.png') },
    { label: 'Phones', icon: require('../assets/images/phones.png') },
    { label: 'Clothes', icon: require('../assets/images/clothes.png') },
    { label: 'Crypto', icon: require('../assets/images/crypto.png') },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Use the URI of the selected image
    }
  };

  const handleSubmit = async () => {
    if (!productName || !description || !price || !contactInfo || !image || !selectedCategory) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const productData = {
      productName,
      description,
      price,
      contactInfo,
      whatsappLink: whatsappLink || `https://wa.me/${contactInfo}`,
      image,
      category: selectedCategory,
    };

    try {
      const response = await fetch('https://campus-trade-l3d4.vercel.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Product added successfully!');
        router.push('/'); // Redirect to home or another page after submission.
      } else {
        Alert.alert('Error', data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Product</Text>

      {/* Product Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        placeholderTextColor="#aaa"
        value={productName}
        onChangeText={setProductName}
      />

      {/* Description Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Price Input */}
      <TextInput
        style={styles.input}
        placeholder="Price (Naira)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Contact Info Input */}
      <TextInput
        style={styles.input}
        placeholder="Contact Info (Phone)"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={contactInfo}
        onChangeText={setContactInfo}
      />

      {/* WhatsApp Link Input */}
      <TextInput
        style={styles.input}
        placeholder="WhatsApp Link (Optional)"
        placeholderTextColor="#aaa"
        value={whatsappLink}
        onChangeText={setWhatsappLink}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.imageAddIcon}>
            <Text style={styles.imageAddIconText}>+</Text>
          </View>
        )}
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Add Image'}
        </Text>
      </TouchableOpacity>

      {/* Category Selection */}
      <Text style={styles.sectionTitle}>Select Category</Text>
      <ScrollView horizontal style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === category.label && styles.categorySelected,
            ]}
            onPress={() => setSelectedCategory(category.label)}
          >
            <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#4E1A1A' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: { height: 100 },
  imagePickerButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  imageAddIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageAddIconText: {
    fontSize: 40,
    color: '#888',
  },
  imagePickerText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  categoryContainer: { flexDirection: 'row', marginBottom: 15 },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  categorySelected: { borderWidth: 2, borderColor: '#007BFF' },
  categoryIcon: { width: 40, height: 40, resizeMode: 'contain' },
  categoryText: { marginTop: 5, fontSize: 14, color: '#333' },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
