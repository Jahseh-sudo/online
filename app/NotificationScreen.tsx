import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Configure how notifications are handled (foreground behavior)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationScreen() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  // Request permissions and set up notification listeners
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Listener for when a notification is received while the app is in the foreground
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // Listener for when a user interacts with a notification (e.g., taps it)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
    });

    // Cleanup listeners when the component is unmounted
    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Register for push notifications and get Expo push token
  async function registerForPushNotificationsAsync(): Promise<string | null> {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for notifications!');
        return null;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  // Trigger a test notification
  async function sendTestNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello from CampusTrade!',
        body: 'This is a test notification to check push notifications.',
        data: { screen: 'Home' }, // Example: Add custom data for navigation or actions
      },
      trigger: { seconds: 2 }, // Delay notification by 2 seconds
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusTrade Push Notifications</Text>

      <Button title="Send Test Notification" onPress={sendTestNotification} />

      <View style={styles.tokenContainer}>
        <Text style={styles.subtitle}>Expo Push Token:</Text>
        <Text style={styles.token}>{expoPushToken || 'Fetching...'}</Text>
      </View>

      {notification && (
        <View style={styles.notification}>
          <Text style={styles.subtitle}>Last Notification:</Text>
          <Text>{notification?.request?.content?.title}</Text>
          <Text>{notification?.request?.content?.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  tokenContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  token: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
  },
  notification: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
});
