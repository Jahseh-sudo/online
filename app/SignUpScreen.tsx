import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!name || !email || !password) {
      setError('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  // Memoize the validation result
  const isFormValid = useMemo(() => validateInputs(), [name, email, password]);

  const handleSignUp = () => {
    if (isFormValid) {
      router.push('../MainScreen');
    }
  };

  return (
    <LinearGradient
      colors={['#341111', '#967575']}
      style={styles.container}
    >
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.subtitle}>
        Already Registered?{' '}
        <Text
          style={styles.linkText}
          onPress={() => router.push('../LoginScreen')}
        >
          Log in here.
        </Text>
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Jiara Martins"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="hello@reallygreatsite.com"
        keyboardType="email-address"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry={!showPassword}
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordToggle}
        >
          <Text style={styles.toggleText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, { opacity: isFormValid ? 1 : 0.6 }]}
        onPress={handleSignUp}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
  passwordContainer: {
    width: '80%',
    position: 'relative',
  },
  showPasswordToggle: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  toggleText: {
    color: 'white',
    fontSize: 14,
  },
  errorText: {
    color: '#FFD700',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#228B22',
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
