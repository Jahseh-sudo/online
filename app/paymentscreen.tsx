import React, { useState } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      Alert.alert("Error", "Please fill out all fields before proceeding.");
      return;
    }
    // Add payment processing logic here (e.g., API call to payment gateway)
    Alert.alert("Payment Successful", "Your subscription plan has been activated!");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Subscription Plan
          </Text>
          <Text variant="bodyLarge" style={styles.planDetails}>
            Premium Plan - $9.99/month
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.form}>
        <TextInput
          label="Card Number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          keyboardType="numeric"
          maxLength={16}
          style={styles.input}
        />
        <View style={styles.row}>
          <TextInput
            label="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(text)}
            keyboardType="numeric"
            maxLength={5}
            style={[styles.input, styles.halfInput]}
          />
          <TextInput
            label="CVV"
            value={cvv}
            onChangeText={(text) => setCvv(text)}
            keyboardType="numeric"
            maxLength={3}
            style={[styles.input, styles.halfInput]}
          />
        </View>
        <TextInput
          label="Name on Card"
          value={cardHolderName}
          onChangeText={(text) => setCardHolderName(text)}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handlePayment}
          style={styles.payButton}
          contentStyle={styles.payButtonContent}
        >
          Pay $9.99
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  planDetails: {
    textAlign: "center",
    marginBottom: 8,
    color: "#555",
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  payButton: {
    marginTop: 20,
    borderRadius: 8,
  },
  payButtonContent: {
    paddingVertical: 10,
  },
});

export default PaymentScreen;
