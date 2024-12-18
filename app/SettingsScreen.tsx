import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => router.push('../LoginScreen') }
      ]
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>GENERAL SETTINGS</Text>
        
        <SettingItem label="Change Password" icon="lock-outline" onPress={() => router.push('../ChangePasswordScreen')} />
        <SettingItem label="Account" icon="account-circle" onPress={() => router.push('../account')} />
        <SettingItem label="Payments and Subscription" icon="payment" onPress={() => router.push('../payment')} />
        <SettingItem label="Appearance" icon="visibility" onPress={() => router.push('../AppearanceScreen')} />
        <SettingItem label="Notifications" icon="notifications" onPress={() => router.push('../NotificationScreen')} />
        <SettingItem label="Help and Call Center" icon="support-agent" onPress={() => router.push('../help-and-call-center')} />
        <SettingItem label="About" icon="info-outline" onPress={() => router.push('../about')} />
        <SettingItem label="Log Out" icon="logout" isDestructive onPress={handleLogout} />
        <SettingItem label="Support and Gifting" icon="redeem" onPress={() => router.push('../support')} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={require('../assets/images/campus-trade-logo.png')}
          style={styles.footerLogo}
        />
        <Text style={styles.footerText}>CAMPUS TRADE</Text>
      </View>
    </View>
  );
}

function SettingItem({ label, icon, isDestructive, onPress }) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={24}
        color={isDestructive ? '#FF3B30' : '#333'}
      />
      <Text style={[styles.settingLabel, isDestructive && { color: '#ffffff' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#967575',
  },
  darkContainer: {
    backgroundColor: '#967575',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
});
