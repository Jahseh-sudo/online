import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

export default function AboutPageScreen() {
  const handleSubscribe = () => {
    // Link to subscription or premium plan page
    Linking.openURL('https://your-subscription-link.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Campus Trade!</Text>

      <Text style={styles.subHeader}>Buy and Sell Products with Ease</Text>
      <Text style={styles.description}>
        Campus Trade is your go-to platform for buying and selling products in your campus community.
        Whether you're looking to sell used items or buy the latest gadgets, clothes, books, and more,
        Campus Trade offers a simple, secure, and user-friendly experience to connect buyers and sellers.
      </Text>

      <Text style={styles.subHeader}>How It Works</Text>
      <Text style={styles.description}>
        It's simple to get started. Create an account, list your products for sale, browse through
        categories, and make purchases all within the app. Our easy-to-use interface ensures you can
        quickly find the products you're looking for or promote your own products to the right audience.
      </Text>

      <Text style={styles.subHeader}>Subscription Plans</Text>
      <Text style={styles.description}>
        We offer subscription plans that give you additional benefits, including:
      </Text>
      <Text style={styles.bulletPoint}>• Premium listing for your products</Text>
      <Text style={styles.bulletPoint}>• Verified user badge for trust and authenticity</Text>
      <Text style={styles.bulletPoint}>• Enhanced product visibility</Text>
      <Text style={styles.description}>
        Our subscription plans ensure you have access to the best features on Campus Trade, whether
        you're a buyer or a seller.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
        <Text style={styles.buttonText}>View Subscription Plans</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Have questions or need support? Reach out to us at{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:support@campustrade.com')}>
          support@campustrade.com
        </Text>
      </Text>

      <Text style={styles.footer}>Follow us on our social media platforms for updates!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4E1A1A',
    textAlign: 'center',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E1A1A',
    marginTop: 20,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 14,
    color: '#4E1A1A',
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#FF5722',
    textDecorationLine: 'underline',
  },
});
