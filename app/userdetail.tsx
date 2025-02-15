import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { useRouter } from "expo-router";

export default function UserDetailsScreen() {
  const router = useRouter();

  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Gender options
  const genders = ["Male", "Female", "Other"];

  // Country options
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Nigeria",
    "India",
    "Germany",
    "France",
    "China",
    "Japan",
  ];

  const handleSave = () => {
    // Validation
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !phoneNumber ||
      !gender ||
      !address ||
      !state ||
      !country
    ) {
      Alert.alert("Error", "Please fill in all the required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    // Save user data
    Alert.alert("Success", "User details saved successfully.");
    console.log({
      firstName,
      lastName,
      username,
      email,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      gender,
      address,
      state,
      country,
      phoneNumber,
    });

    // Navigate to the main screen
    router.push("../MainScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Set Up Your Profile</Text>

      {/* First Name */}
      <TextInput
        style={styles.input}
        placeholder="First Name *"
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Last Name */}
      <TextInput
        style={styles.input}
        placeholder="Last Name *"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username *"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email Address *"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Phone Number */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number *"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Gender */}
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Gender *</Text>
        {genders.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.genderOption,
              gender === item && styles.genderOptionSelected,
            ]}
            onPress={() => setGender(item)}
          >
            <Text
              style={[
                styles.genderText,
                gender === item && styles.genderTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date of Birth */}
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {dateOfBirth
            ? dateOfBirth.toLocaleDateString()
            : "Select Date of Birth *"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDateOfBirth(selectedDate);
          }}
        />
      )}

      {/* Country */}
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem) => setCountry(selectedItem)}
        defaultButtonText="Select Country *"
        buttonStyle={styles.dropdown}
        buttonTextStyle={styles.dropdownText}
      />

      {/* Address */}
      <TextInput
        style={styles.input}
        placeholder="Address *"
        value={address}
        onChangeText={setAddress}
      />

      {/* State */}
      <TextInput
        style={styles.input}
        placeholder="State/Province *"
        value={state}
        onChangeText={setState}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  genderOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  genderOptionSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
  },
  genderText: {
    fontSize: 16,
    color: "#333",
  },
  genderTextSelected: {
    color: "#ffffff",
  },
  dateInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dateText: {
    color: "#555",
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: "left",
    color: "#555",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
