import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

export default function FeatureNotice() {
  const router = useRouter();
  const [popupAnimation] = useState(new Animated.Value(0)); // Animation state

  // Trigger the pop-up animation
  React.useEffect(() => {
    Animated.timing(popupAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [popupAnimation]);

  const handleSellerRedirect = () => {
    router.push("../MainScreen"); // Replace with your Seller screen route
  };

  const translateY = popupAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Moves from off-screen (300px) to its position (0px)
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.popup,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.header}>Feature is only available for sellers</Text>
        <TouchableOpacity style={styles.button} onPress={handleSellerRedirect}>
          <Text style={styles.buttonText}>Want to be a seller?</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
