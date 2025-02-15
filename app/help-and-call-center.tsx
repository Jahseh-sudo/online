// app/help-and-call-center.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HelpAndCallCenterScreen = () => {

  // Function to handle call
  const handleCallCenter = () => {
    Linking.openURL('tel:08086615774');
  };

  // Function to open FAQ page (if you have one)
  const handleFAQ = () => {
    // Navigate to FAQ screen (you can implement the FAQ screen separately)
    console.log("Navigating to FAQ Screen...");
  };

  // Function to send an email
  const handleEmailSupport = () => {
    Linking.openURL('mailto:campustrade52@gmail.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help & Call Center</Text>

      {/* FAQ Button */}
      <TouchableOpacity style={styles.card} onPress={handleFAQ}>
        <MaterialIcons name="help-outline" size={24} color="black" />
        <Text style={styles.cardText}>FAQs</Text>
      </TouchableOpacity>

      {/* Call Center Button */}
      <TouchableOpacity style={styles.card} onPress={handleCallCenter}>
        <MaterialIcons name="call" size={24} color="black" />
        <Text style={styles.cardText}>Call Center</Text>
      </TouchableOpacity>

      {/* Email Support Button */}
      <TouchableOpacity style={styles.card} onPress={handleEmailSupport}>
        <MaterialIcons name="email" size={24} color="black" />
        <Text style={styles.cardText}>Email Support</Text>
      </TouchableOpacity>

      <Text style={styles.note}>Our support team is available 24/7 for assistance!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1C1C1E',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    maxWidth: 300,
    justifyContent: 'flex-start',
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
});

export default HelpAndCallCenterScreen;
