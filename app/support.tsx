import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";

export default function SupportPage() {
  const handlePaystackSupport = () => {
    Linking.openURL("https://wa.me/+2348086615774"); // Replace with your Paystack link
  };

  const handlePaypalSupport = () => {
    Linking.openURL("https://wa.me/+2348086615774"); // Replace with your PayPal link
  };

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: "https://via.placeholder.com/150/967575/341111?text=CampusTrade",
      }}
    >
      <Text style={styles.header}>Support & Gifting</Text>
      <Text style={styles.subText}>We appreciate your support!</Text>

      <TouchableOpacity style={styles.button} onPress={handlePaystackSupport}>
        <Text style={styles.buttonText}>Support via Paystack</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePaypalSupport}>
        <Text style={styles.buttonText}>Support via PayPal</Text>
      </TouchableOpacity>

      <Link href="../CryptoScreen" style={styles.link}>
        <Text style={styles.linkText}>Support via Crypto</Text>
      </Link>

      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Back to Home</Text>
      </Link>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#F5F5F5",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: "#FFA500",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
