import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

const mockApiData = [
  { id: '1', title: 'Premium Product 1', image: require('../assets/images/product1.png'), price: '$999' },
  { id: '2', title: 'Premium Product 2', image: require('../assets/images/product2.png'), price: '$1199' },
  { id: '3', title: 'Standard Product 1', image: require('../assets/images/product3.png'), price: '$499' },
];

const categories = [
  { label: 'Electronics', image: require('../assets/images/electronics.png'), screen: '../electronics' },
  { label: 'Phones', image: require('../assets/images/phones.png'), screen: '../phones' },
  { label: 'Crypto', image: require('../assets/images/crypto.png'), screen: '../crypto' },
  { label: 'Snacks', image: require('../assets/images/snacks.png'), screen: '../snacks' },
  { label: 'Food', image: require('../assets/images/food.png'), screen: '../food' },
  { label: 'Beauty', image: require('../assets/images/beauty.png'), screen: '../beauty' },
  { label: 'Clothes', image: require('../assets/images/clothes.png'), screen: '../clothes' },
  { label: 'Services', image: require('../assets/images/services.png'), screen: '../services' },
];

export default function MainScreen() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [animation] = useState(new Animated.Value(2));
  const [profilePicture, setProfilePicture] = useState(require('../assets/images/default-profile.png'));

  const { width } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => setProducts(mockApiData), 1000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  useEffect(() => {
    setProfilePicture(require('../assets/images/updated-profile.png'));
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Banner Image */}
      <Image source={require('../assets/images/promo2.png')} style={styles.bannerImage} />

      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={() => router.push('../account')}
      >
        <Image source={profilePicture} style={styles.profileIcon} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products, categories..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Ionicons name="ios-search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.screen)}
            style={styles.categoryItem}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      />

      {/* Products Section */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Animated.View style={[styles.productCard, animatedStyle]}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </Animated.View>
        )}
        columnWrapperStyle={styles.gridColumn}
        contentContainerStyle={styles.productGrid}
      />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {[ 
          { icon: <MaterialIcons name="home" size={24} color="#000" />, route: '../MainScreen' },
          { icon: <FontAwesome5 name="user" size={24} color="#000" />, route: '../payment' },
          { icon: <Ionicons name="add-circle" size={24} color="#000" />, route: '../addProduct' },
          { icon: <Ionicons name="cart" size={24} color="#000" />, route: '../ProductList' },
          { icon: <Ionicons name="settings" size={24} color="#000" />, route: '../SettingsScreen' },
        ].map(({ icon, route }, index) => (
          <FooterIconButton key={index} icon={icon} onPress={() => router.push(route)} />
        ))}
      </View>
    </View>
  );
}

const FooterIconButton = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.footerIconButton} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  profileIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#000',
  },
  categories: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#000',
  },
  productGrid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  gridColumn: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#ff5252',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  footerIconButton: {
    alignItems: 'center',
  },
});
