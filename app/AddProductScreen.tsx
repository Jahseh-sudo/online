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
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
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
  const [loading, setLoading] = useState(false);

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

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert('Error', 'No image was selected.');
    }
  };

  const handleSubmit = async () => {
    console.log('Selected image:', image);
    // Check if any required field is empty
    if (
      !productName.trim() ||
      !description.trim() ||
      !price.trim() ||
      !contactInfo.trim() ||
      !selectedCategory ||
      !image
    ) {
      Alert.alert('Error', 'All fields are required. Please fill them out.');
      return;
    }

    // Price validation: Ensure price is a positive number
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Error', 'Please enter a valid price greater than 0.');
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(contactInfo)) {
      Alert.alert('Error', 'Please enter a valid phone number (10–15 digits).');
      return;
    }

    // WhatsApp link validation
    if (whatsappLink && !/^https:\/\/wa\.me\/[0-9]+$/.test(whatsappLink)) {
      Alert.alert('Error', 'Please provide a valid WhatsApp link.');
      return;
    }

    // Start the loading indicator
    setLoading(true);

    const formData = new FormData();
    formData.append('productName', productName.trim());
    formData.append('description', description.trim());
    formData.append('price', price.trim());
    formData.append('contactInfo', contactInfo.trim());
    formData.append('whatsappLink', whatsappLink.trim());
    formData.append('category', selectedCategory);
    formData.append('image', {
      uri: image.uri,
      type: 'image/jpeg',  // Ensure the mime type matches the image format
      name: 'productImage.jpg',  // Set a name for the image
    });

    try {
      const response = await fetch('http://192.168.136.21:5000/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        Alert.alert('Error', errorData.message || 'Failed to add product.');
        return;
      }

      const data = await response.json();
      Alert.alert('Success', 'Product added successfully!');
      router.push('../addproduct');
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
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
          placeholder="WhatsApp Link"
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
              style={[styles.categoryItem, selectedCategory === category.label && styles.categorySelected]}
              onPress={() => setSelectedCategory(category.label)}
            >
              <Image source={category.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Product</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  imageAddIconText: { fontSize: 40, color: '#fff' },
  imagePickerText: { color: '#fff' },
  sectionTitle: { color: '#fff', fontSize: 16, marginBottom: 10 },
  categoryContainer: { flexDirection: 'row', marginBottom: 20 },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categorySelected: {
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 5,
  },
  categoryIcon: { width: 40, height: 40, marginBottom: 5 },
  categoryText: { color: '#fff', fontSize: 12 },
  submitButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
