import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'; // Import the Video component from Expo
import { useRouter } from 'expo-router'; // Import the router for navigation

export default function Index() {
  const router = useRouter(); // Initialize the router to handle navigation

  // Function to navigate to the signup screen
  const handleGetStarted = () => {
    router.push('../SignUpScreen'); // Use a relative path to navigate
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={require('../assets/videos/welcome-animation.mp4')} // Video source
        style={styles.backgroundVideo} // Styles the background video
        shouldPlay // Automatically plays the video
        isLooping // Loops the video
        resizeMode="cover" // Ensures video covers the whole screen
        onError={(error) => console.error("Video playback error:", error)} // Handles video errors
      />
      
      {/* Overlay with the 'Get Started' button */}
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted} // On press, navigate to signup screen
          accessibilityLabel="Get Started Button"
          accessibilityHint="Navigates to the signup screen"
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fallback background color in case video doesn't load
  },
  backgroundVideo: {
    position: 'absolute', // Ensures the video stays in the background
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Align the button at the bottom
    alignItems: 'center', // Center the button horizontally
    paddingBottom: 80, // Space for the button
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text contrast
  },
  button: {
    backgroundColor: '#7ed957', // Green button color
    padding: 15,
    borderRadius: 8, // Rounded corners for the button
    width: '70%', // Button takes up 70% of the width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3, // Shadow effect for Android
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 18, // Text size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center the text
  },
});
