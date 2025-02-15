import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useRouter } from 'expo-router';

const TermsAndConditionsScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (!isChecked) {
      Alert.alert('Error', 'You must agree to the terms and conditions to continue.');
      return;
    }
    router.push('../ChooseRole'); // Navigate to the main screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.content}>
          Welcome to CampusTrade, your trusted marketplace for buying and selling within the campus
          community. By using CampusTrade, you agree to the following terms and guidelines:
          {'\n\n'}
          <Text style={styles.subHeading}>1. User Responsibilities</Text>
          {'\n'}
          a. You must provide accurate and truthful information when registering an account.{'\n'}
          b. Ensure that all products listed for sale are legal and comply with our policies.{'\n'}
          c. Respect other users and maintain a professional demeanor in all transactions.
          {'\n\n'}
          <Text style={styles.subHeading}>2. Prohibited Activities</Text>
          {'\n'}
          a. Selling illegal, counterfeit, or prohibited items.{'\n'}
          b. Engaging in fraudulent activities, including false advertising or scams.{'\n'}
          c. Harassment, abusive language, or spamming other users.
          {'\n\n'}
          <Text style={styles.subHeading}>3. Payment and Fees</Text>
          {'\n'}
          a. CampusTrade facilitates transactions but is not responsible for disputes between users.{'\n'}
          b. We reserve the right to charge fees for premium features and services.{'\n'}
          c. Payments made through our integrated systems must comply with our policies.
          {'\n\n'}
          <Text style={styles.subHeading}>4. Privacy and Data Usage</Text>
          {'\n'}
          a. We value your privacy and will not share your personal data without consent.{'\n'}
          b. Usage data may be collected to improve platform performance and services.{'\n'}
          c. It is your responsibility to safeguard your account credentials.
          {'\n\n'}
          <Text style={styles.subHeading}>5. Limitation of Liability</Text>
          {'\n'}
          a. CampusTrade is not liable for losses resulting from user interactions.{'\n'}
          b. We do not guarantee the quality, safety, or legality of listed products.{'\n'}
          c. You agree to indemnify CampusTrade against claims arising from your use of the platform.
          {'\n\n'}
          By proceeding, you acknowledge that you have read, understood, and agree to these terms
          and conditions. For more details, please visit our website or contact support.
        </Text>
      </ScrollView>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text style={styles.label}>I agree to the Terms and Conditions</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !isChecked && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TermsAndConditionsScreen;
