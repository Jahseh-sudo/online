import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const PaymentOptions = ({ navigation }) => {
  const paymentMethods = [
    {
      id: "1",
      name: "Google Pay",
      icon: require("../assets/images/googlepay.png"),
    },
    {
      id: "2",
      name: "MasterCard/Visa",
      icon: require("../assets/images/creditcard.png"),
    },
    {
      id: "3",
      name: "PayPal",
      icon: require("../assets/images/paypal.png"),
    },
    {
      id: "4",
      name: "Crypto",
      icon: require("../assets/images/crypto.png"),
    },
  ];

  // Animation: Shared value for scaling
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const handlePaymentSelection = (method) => {
    navigation.navigate("PaymentConfirmation", { method });
  };

  return (
    <LinearGradient
      colors={["#f5f7fa", "#c3cfe2"]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#333"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Select Payment Method</Text>
      </View>

      {/* Payment Options */}
      <ScrollView
        contentContainerStyle={styles.paymentContainer}
        showsVerticalScrollIndicator={false}
      >
        {paymentMethods.map((method) => (
          <TouchableWithoutFeedback
            key={method.id}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => handlePaymentSelection(method.name)}
          >
            <Animated.View style={[styles.paymentOption, animatedStyle]}>
              <Image source={method.icon} style={styles.paymentIcon} />
              <Text style={styles.paymentText}>{method.name}</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#888"
                style={styles.paymentArrow}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  paymentContainer: {
    padding: 20,
    alignItems: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    width: "90%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  paymentArrow: {
    marginLeft: 10,
  },
});

export default PaymentOptions;