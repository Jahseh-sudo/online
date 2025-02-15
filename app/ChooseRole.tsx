import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const ChooseRoleScreen = () => {
  const router = useRouter();

  // Shared values for scaling animation
  const buyerScale = useSharedValue(1);
  const sellerScale = useSharedValue(1);

  const animatedBuyerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buyerScale.value }],
  }));

  const animatedSellerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sellerScale.value }],
  }));

  const handlePressIn = (role) => {
    if (role === "buyer") buyerScale.value = withTiming(0.95, { duration: 100 });
    if (role === "seller") sellerScale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = (role) => {
    if (role === "buyer") buyerScale.value = withTiming(1, { duration: 100 });
    if (role === "seller") sellerScale.value = withTiming(1, { duration: 100 });
  };

  const handleNavigation = (role) => {
    if (role === "buyer") router.push("../buyerscreen");
    if (role === "seller") router.push("../MainScreen");
  };

  return (
    <LinearGradient
      colors={["#fff", "#fff"]}
      style={styles.container}
    >
      <Text style={styles.title}>Who are you?</Text>

      {/* Buyer Option */}
      <TouchableWithoutFeedback
        onPressIn={() => handlePressIn("buyer")}
        onPressOut={() => handlePressOut("buyer")}
        onPress={() => handleNavigation("buyer")}
      >
        <Animated.View style={[styles.option, styles.buyerOption, animatedBuyerStyle]}>
          <Text style={styles.optionText}>Buyer</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Seller Option */}
      <TouchableWithoutFeedback
        onPressIn={() => handlePressIn("seller")}
        onPressOut={() => handlePressOut("seller")}
        onPress={() => handleNavigation("seller")}
      >
        <Animated.View style={[styles.option, styles.sellerOption, animatedSellerStyle]}>
          <Text style={styles.optionText}>Seller</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 30,
  },
  option: {
    width: width * 0.8,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  buyerOption: {
    backgroundColor: "#34ace0",
  },
  sellerOption: {
    backgroundColor: "#ff793f",
  },
  optionText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ChooseRoleScreen;
