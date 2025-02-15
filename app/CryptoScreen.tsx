import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CryptoScreen() {
  const router = useRouter();

  const handleBackToSupport = () => {
    router.push("../support");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support via Crypto</Text>
      <Text style={styles.subText}>
        Thank you for supporting us! You can send your crypto donations to the
        following address:
      </Text>
      <View style={styles.cryptoBox}>
        <Text style={styles.cryptoLabel}>Bitcoin Address:</Text>
        <Text style={styles.cryptoAddress}>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</Text>

        <Text style={styles.cryptoLabel}>Ethereum Address:</Text>
        <Text style={styles.cryptoAddress}>
          0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBackToSupport}>
        <Text style={styles.buttonText}>Back to Support</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: "#F5F5F5",
    textAlign: "center",
    marginBottom: 20,
  },
  cryptoBox: {
    backgroundColor: "#2C2C2E",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  cryptoLabel: {
    fontSize: 16,
    color: "#FFA500",
    marginBottom: 5,
  },
  cryptoAddress: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
