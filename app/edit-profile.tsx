import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );
  const [name, setName] = useState("Jack Frost");
  const [email, setEmail] = useState("jackfrost@gmail.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [socialHandle, setSocialHandle] = useState("@jackfrost");
  const [location, setLocation] = useState("New York, USA");
  const [isPrivate, setIsPrivate] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = () => {
    // Add save functionality
    Alert.alert("Profile Updated", "Your changes have been saved successfully!");
  };

  const handleUploadPicture = () => {
    // Add functionality to upload a picture
    Alert.alert("Upload Picture", "This feature is coming soon!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadPicture}
        >
          <FontAwesome name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Editable Fields */}
      <View style={styles.form}>
        {/* Name */}
        <View style={styles.inputGroup}>
          <MaterialIcons name="person" size={20} color="#6D83FF" />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <MaterialIcons name="email" size={20} color="#6D83FF" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <MaterialIcons name="phone" size={20} color="#6D83FF" />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Social Handle */}
        <View style={styles.inputGroup}>
          <FontAwesome name="instagram" size={20} color="#6D83FF" />
          <TextInput
            style={styles.input}
            placeholder="Social Handle"
            value={socialHandle}
            onChangeText={setSocialHandle}
          />
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <MaterialIcons name="location-pin" size={20} color="#6D83FF" />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Privacy Toggle */}
        <View style={styles.privacyToggle}>
          <Text style={styles.privacyText}>Make Profile Private</Text>
          <Switch value={isPrivate} onValueChange={setIsPrivate} />
        </View>
      </View>

      {/* Password Update */}
      <View style={styles.passwordSection}>
        <Text style={styles.sectionHeader}>Change Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Save Changes Button */}
      <LinearGradient
        colors={["#6D83FF", "#88A7FF"]}
        style={styles.saveButton}
      >
        <TouchableOpacity onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D83FF",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  uploadButton: {
    position: "absolute",
    bottom: 0,
    right: 120 / 3,
    backgroundColor: "#6D83FF",
    padding: 10,
    borderRadius: 20,
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  privacyToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  privacyText: {
    fontSize: 16,
  },
  passwordSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  passwordInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  saveButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditProfile;
