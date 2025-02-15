import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Again!</Text>
      <Text style={styles.subtitle}>Welcome back you've been missed!</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Enter email" />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Ionicons name="eye-off" size={20} color="#999" style={styles.icon} />
        </View>
        <TouchableOpacity>
          <Text style={styles.recoveryText}>Recovery Password</Text>
        </TouchableOpacity>
      </View>

      {/* Navigate to the MainScreen */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.push("../MainScreen")}
      >
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Ionicons name="logo-google" size={32} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="logo-apple" size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="logo-facebook" size={32} color="#3b5998" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("../SignUpScreen")}>
        <Text style={styles.signUpText}>
          Not a member? <Text style={styles.signUpLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  recoveryText: {
    textAlign: "right",
    color: "#007bff",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "#555",
  },
  signUpLink: {
    color: "#FF5722",
    fontWeight: "bold",
  },
});

export default LoginScreen;
