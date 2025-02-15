import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();

  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate title
    Animated.timing(titleAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Animate buttons
    Animated.timing(buttonAnimation, {
      toValue: 1,
      delay: 1000,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Image
        source={require("../assets/images/welcome-image.png")} // Replace with your image
        style={styles.image}
      />

      {/* Animated Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleAnimation,
            transform: [
              {
                translateY: titleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        Campus Trade
      </Animated.Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Discover Your Best Products Here
      </Text>
      <Text style={styles.description}>
        Explore the most exciting products tailored to your interests and needs.
      </Text>

      {/* Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonAnimation,
            transform: [
              {
                translateY: buttonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("../SignUpScreen")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("../LoginScreen")}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF5722",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;