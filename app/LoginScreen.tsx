import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError(''); // Clear previous error
    setLoading(true);

    // Mock API login call
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        router.push('../MainScreen'); // Redirect to MainScreen on success
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <LinearGradient
      colors={['#341111', '#967575']} // Gradient colors for background
      style={styles.container}
    >
      <Text style={styles.title}>Login to Your Account</Text>
      <Text style={styles.subtitle}>
        Don't have an account?{' '}
        <Text
          style={styles.linkText}
          onPress={() => router.push('../SignUpScreen')} // Navigate to SignUp screen
        >
          Sign up here.
        </Text>
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="hello@reallygreatsite.com"
        keyboardType="email-address"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        accessible={true}
        accessibilityLabel="Email Input"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="******"
        secureTextEntry={true}
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        accessible={true}
        accessibilityLabel="Password Input"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#FFD700',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#228B22', // Darker green for a more professional look
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
