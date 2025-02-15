import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const isPasswordValid = password.length >= 8; // Password must have at least 8 characters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello There!</Text>
      <Text style={styles.subtitle}>
        Join Us to Unlock a World of Shopping Delights!
      </Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Enter name" />
        <TextInput style={styles.input} placeholder="Enter email" />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password (min. 8 characters)"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Ionicons name="eye-off" size={20} color="#999" style={styles.icon} />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[
          styles.registerButton,
          { backgroundColor: isPasswordValid ? "#ff5722" : "#ccc" },
        ]}
        onPress={() => router.push("../terms")}
        disabled={!isPasswordValid}
      >
        <Text style={styles.registerText}>Register</Text>
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

      <TouchableOpacity onPress={() => router.push("../LoginScreen")}>
        <Text style={styles.signinText}>
          Already a member? <Text style={styles.signinLink}>Sign in</Text>
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
    marginBottom: 10,
    color: "#000",
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
  registerButton: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  registerText: {
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
  signinText: {
    fontSize: 14,
    color: "#555",
  },
  signinLink: {
    color: "#ff5722",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
