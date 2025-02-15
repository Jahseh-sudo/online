import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

const UserProfile = ({ name = "Jack Frost", email = "jackfrost@gmail.com" }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const themeStyles = darkMode
    ? {
        container: { backgroundColor: "#121212" },
        text: { color: "#ffffff" },
        menu: { backgroundColor: "#1e1e1e" },
        menuBorder: { borderBottomColor: "#333" },
      }
    : {
        container: { backgroundColor: "#F5F5F5" },
        text: { color: "#333333" },
        menu: { backgroundColor: "#ffffff" },
        menuBorder: { borderBottomColor: "#eee" },
      };

  // Function to pick an image
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, themeStyles.container]}>
      {/* Theme Toggle */}
      <View style={styles.themeToggle}>
        <Text style={[styles.themeText, themeStyles.text]}>
          {darkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: profileImage || "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            <Feather name="camera" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.name, themeStyles.text]}>{name}</Text>
        <Text style={[styles.email, themeStyles.text]}>{email}</Text>
      </View>

      {/* Menu Options */}
      <View style={[styles.menu, themeStyles.menu]}>
        <TouchableOpacity
          style={[styles.menuItem, themeStyles.menuBorder]}
          onPress={() => router.push("../edit-profile")}
        >
          <FontAwesome name="edit" size={20} color="#FF6D6D" />
          <Text style={[styles.menuText, themeStyles.text]}>Edit Profile</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, themeStyles.menuBorder]}
          onPress={() => router.push("../analytics")}
        >
          <MaterialIcons name="bar-chart" size={20} color="#6D83FF" />
          <Text style={[styles.menuText, themeStyles.text]}>My Stats</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, themeStyles.menuBorder]}
          onPress={() => router.push("../SettingsScreen")}
        >
          <MaterialIcons name="settings" size={20} color="#FDCB6E" />
          <Text style={[styles.menuText, themeStyles.text]}>Settings</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, themeStyles.menuBorder]}
          onPress={() => router.push("../invite-friend")}
        >
          <MaterialIcons name="person-add" size={20} color="#55EFC4" />
          <Text style={[styles.menuText, themeStyles.text]}>Invite a Friend</Text>
          <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <LinearGradient colors={["#FF6D6D", "#FF8E53"]} style={styles.logoutButton}>
        <TouchableOpacity onPress={() => router.push("../SignUpScreen")}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  themeText: {
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FF6D6D",
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  menu: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UserProfile;
