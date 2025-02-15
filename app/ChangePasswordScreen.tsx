import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleChangePassword = () => {
    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    // Simulate password change (API call can be implemented here)
    Alert.alert('Success', 'Your password has been changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter current password"
        placeholderTextColor="#aaa"
        value={currentPassword}
        onChangeText={(value) => handleInputChange(setCurrentPassword, value)}
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter new password"
        placeholderTextColor="#aaa"
        value={newPassword}
        onChangeText={(value) => handleInputChange(setNewPassword, value)}
      />

      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm new password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={(value) => handleInputChange(setConfirmPassword, value)}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
        accessibilityLabel="Update your password"
        accessibilityHint="Saves your new password"
      >
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C1C1E',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
