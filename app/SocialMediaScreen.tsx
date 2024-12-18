import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Linking, Text } from 'react-native';

export default function SocialMediaScreen() {
  const socialLinks = {
    whatsapp: 'https://wa.me/+2348086615774',
    facebook: 'https://www.facebook.com/your-profile',
    twitter: 'https://twitter.com/your-profile',
    youtube: 'https://www.youtube.com/your-channel',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Follow Us</Text>
      <View style={styles.iconsContainer}>
        {/* WhatsApp */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Linking.openURL(socialLinks.whatsapp)}
        >
          <Image
            source={require('../assets/images/whatsapp-logo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Linking.openURL(socialLinks.facebook)}
        >
          <Image
            source={require('../assets/images/facebook-logo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Twitter */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Linking.openURL(socialLinks.twitter)}
        >
          <Image
            source={require('../assets/images/twitter-logo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* YouTube */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Linking.openURL(socialLinks.youtube)}
        >
          <Image
            source={require('../assets/images/youtube-logo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082', // Indigo for contrast
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
