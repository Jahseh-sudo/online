import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

// Example of user data from backend or persistent storage
const fetchUserData = async () => ({
  name: 'Mark Emmanuel',
  email: 'markemmanuel@example.com',
  subscription: 'Standard', // Options: Basic, Standard, Premium
  profilePicture: null, // Placeholder for profile picture
});

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUser(data);
      setEditedUser(data);
    };
    loadUserData();
  }, []);

  const handleEditToggle = () => {
    if (user.subscription === 'Basic') {
      Alert.alert(
        'Upgrade Required',
        'Only Standard or Premium users can edit their profiles.'
      );
      return;
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (editedUser.name.trim().length < 2) {
      Alert.alert('Invalid Name', 'Name should be at least 2 characters long.');
      return;
    }

    setUser(editedUser);
    setIsEditing(false);

    // Save updated user info to backend or local storage here
    Alert.alert('Profile Updated', 'Your profile has been successfully updated.');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedUser({ ...editedUser, profilePicture: result.assets[0].uri });
    }
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Account</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            editedUser.profilePicture
              ? { uri: editedUser.profilePicture }
              : require('../assets/images/profile-placeholder.png')
          }
          style={styles.profilePicture}
        />
        {isEditing && <Text style={styles.changePictureText}>Change Picture</Text>}
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedUser.name}
          onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        />
      ) : (
        <Text style={styles.text}>{user.name}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedUser.email}
          onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
        />
      ) : (
        <Text style={styles.text}>{user.email}</Text>
      )}

      <Text style={styles.label}>Subscription</Text>
      <Text style={styles.text}>{user.subscription}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
        <Text style={styles.buttonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => router.push('/')}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#967575',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  changePictureText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#341111',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#228B22',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
  },
  linkText: {
    color: '#FFF',
    textDecorationLine: 'underline',
  },
});
