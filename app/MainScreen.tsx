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
  { id: '1', title: 'Premium Product 1', image: require('../assets/images/premium1.png'), price: '$999' },
  { id: '2', title: 'Premium Product 2', image: require('../assets/images/premium2.png'), price: '$1199' },
  { id: '3', title: 'Standard Product 1', image: require('../assets/images/standard1.png'), price: '$499' },
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
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockApiData);
    }, 1000);

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
      <Text style={styles.watermark}>CampusTrade</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Ionicons name="ios-filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item, index) => index.toString()}
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

      {/* Social Media Button */}
      <TouchableOpacity
        style={styles.socialMediaButton}
        onPress={() => router.push('../SocialMediaScreen')}
      >
        <Image
          source={require('../assets/images/socialMediaLogo.png')}
          style={styles.socialMediaIcon}
        />
      </TouchableOpacity>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <FooterIconButton
          icon={<MaterialIcons name="home" size={24} color="#fff" />}
          onPress={() => router.push('../MainScreen')}
        />
        <FooterIconButton
          icon={<FontAwesome5 name="user" size={24} color="#fff" />}
          onPress={() => router.push('../payment')}
        />
        <FooterIconButton
          icon={<Ionicons name="add-circle" size={24} color="#fff" />}
          onPress={() => router.push('../addProduct')}
        />
        <FooterIconButton
          icon={<Ionicons name="cart" size={24} color="#fff" />}
          onPress={() => router.push('../cart')}
        />
        <FooterIconButton
          icon={<Ionicons name="settings" size={24} color="#fff" />}
          onPress={() => router.push('../SettingsScreen')}
        />
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
    backgroundColor: '#341111',
    paddingTop: 30,
  },
  watermark: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 3,
    fontSize: 50,
    color: 'rgba(255, 255, 255, 0.1)',
    zIndex: -1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  categories: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  productGrid: {
    paddingHorizontal: 10,
  },
  gridColumn: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: 'green',
  },
  socialMediaButton: {
    position: 'absolute',
    right: 20,
    top: Dimensions.get('window').height / 2,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  socialMediaIcon: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#622222',
  },
  footerIconButton: {
    padding: 10,
    alignItems: 'center',
  },
});
