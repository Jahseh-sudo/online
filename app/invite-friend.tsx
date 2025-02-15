import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
  Image,
} from "react-native";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const InviteAFriend = () => {
  const referralCode = "INVITE123";

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Join me on this amazing app! Use my referral code ${referralCode} to get started: https://example.com/invite`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type
        } else {
          // Shared successfully
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert("Error", "Could not share the invitation.");
    }
  };

  const handleCopyCode = () => {
    Alert.alert("Copied to Clipboard", `Referral code "${referralCode}" has been copied.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Invite a Friend</Text>
      </View>

      {/* Illustration */}
      <Image
        source={{ uri: "https://via.placeholder.com/300x150" }}
        style={styles.illustration}
      />

      {/* Referral Code */}
      <View style={styles.referralContainer}>
        <Text style={styles.referralText}>Your Referral Code</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <TouchableOpacity onPress={handleCopyCode}>
            <Feather name="copy" size={20} color="#6D83FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Share Options */}
      <View style={styles.shareOptions}>
        <Text style={styles.shareText}>Share with Friends</Text>
        <View style={styles.shareButtons}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <FontAwesome name="whatsapp" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <FontAwesome name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <FontAwesome name="twitter" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <MaterialIcons name="email" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Invite via SMS or Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter friend's email or phone"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.inviteButton} onPress={handleShare}>
          <Text style={styles.inviteButtonText}>Send Invite</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <LinearGradient colors={["#6D83FF", "#88A7FF"]} style={styles.footer}>
        <Text style={styles.footerText}>
          Share the joy and earn rewards when your friends join!
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  illustration: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  referralContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  referralText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: "row",
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
  referralCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D83FF",
    marginRight: 10,
  },
  shareOptions: {
    marginBottom: 20,
  },
  shareText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  shareButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    backgroundColor: "#6D83FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginRight: 10,
  },
  inviteButton: {
    backgroundColor: "#6D83FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inviteButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});

export default InviteAFriend;
