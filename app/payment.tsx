import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { PaystackWebView } from 'react-native-paystack-webview';

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan, price) => {
    setSelectedPlan({
      plan,
      amount: parseFloat(price) * 100, // Convert to kobo for Paystack
      email: 'user@example.com', // Replace with actual user's email
    });
  };

  const onSuccess = (res) => {
    console.log('Payment successful:', res);
    alert('Payment successful! Your plan has been activated.');
    setSelectedPlan(null); // Reset selected plan after successful payment
  };

  const onCancel = () => {
    alert('Payment was canceled.');
    setSelectedPlan(null); // Reset selected plan after canceled payment
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* BASIC Plan */}
      <View style={[styles.planCard, styles.basicCard]}>
        <Text style={styles.planTitle}>BASIC (FREE)</Text>
        <Text style={styles.price}>N0.00</Text>
        <Text style={styles.planFeature}>- Limited listings (5-10)</Text>
        <Text style={styles.planFeature}>- Standard visibility</Text>
        <Text style={styles.planFeature}>- Limited customer support</Text>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => alert('You have selected the BASIC plan.')}
        >
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>

      {/* STANDARD Plan */}
      <View style={[styles.planCard, styles.standardCard]}>
        <Text style={styles.planTitle}>STANDARD</Text>
        <Text style={styles.price}>
          N2,500.00 <Text style={styles.period}>Per month</Text>
        </Text>
        <Text style={styles.planFeature}>- Unlimited listings</Text>
        <Text style={styles.planFeature}>
          - Enhanced visibility (featured listings)
        </Text>
        <Text style={styles.planFeature}>- Priority customer support</Text>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => handleSubscribe('STANDARD', '2500.00')}
        >
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* PREMIUM Plan */}
      <View style={[styles.planCard, styles.premiumCard]}>
        <Text style={styles.planTitle}>PREMIUM</Text>
        <Text style={styles.price}>
          N5,000.00 <Text style={styles.period}>Per month</Text>
        </Text>
        <Text style={styles.planFeature}>- All Standard features</Text>
        <Text style={styles.planFeature}>
          - Additional storage for product images
        </Text>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => handleSubscribe('PREMIUM', '5000.00')}
        >
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* Paystack WebView */}
      {selectedPlan && (
        <PaystackWebView
          paystackKey="your_paystack_public_key" // Replace with your Paystack public key
          amount={selectedPlan.amount}
          billingEmail={selectedPlan.email}
          activityIndicatorColor="green"
          onSuccess={onSuccess}
          onCancel={onCancel}
          autoStart={true}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  planCard: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  basicCard: {
    backgroundColor: '#d9d9d9',
  },
  standardCard: {
    backgroundColor: '#ffe599',
  },
  premiumCard: {
    backgroundColor: '#ff9999',
  },
  planTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#555',
    marginVertical: 10,
  },
  period: {
    fontSize: 14,
    color: '#888',
  },
  planFeature: {
    fontSize: 14,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#007aff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
