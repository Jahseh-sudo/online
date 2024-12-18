import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notificationListener, setNotificationListener] = useState<any>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          const token = await Notifications.getExpoPushTokenAsync();
          setExpoPushToken(token.data);
        } else {
          Alert.alert(
            'Permission Denied',
            'Enable notification permissions to receive alerts.'
          );
        }
      } catch (error) {
        console.error('Failed to get push token:', error);
      }
    };

    requestPermissions();

    return () => {
      // Cleanup listeners on component unmount
      if (notificationListener) {
        Notifications.removeNotificationSubscription(notificationListener);
      }
    };
  }, [notificationListener]);

  const toggleSwitch = async () => {
    if (isEnabled) {
      if (notificationListener) {
        Notifications.removeNotificationSubscription(notificationListener);
        setNotificationListener(null);
      }
    } else {
      const listener = Notifications.addNotificationReceivedListener(handleNotification);
      setNotificationListener(listener);
    }
    setIsEnabled((prev) => !prev);
  };

  const handleNotification = (notification: Notifications.Notification) => {
    Alert.alert('Notification Received', notification.request.content.body || '');
  };

  const sendTestNotification = async () => {
    if (!expoPushToken) {
      Alert.alert('No Push Token', 'Unable to send notification. Check permissions.');
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Notification',
          body: 'This is a test notification.',
        },
        trigger: { seconds: 2 },
      });
      Alert.alert('Notification Scheduled', 'Test notification will appear shortly.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification.');
      console.error('Notification error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>

      <View style={styles.notificationSwitchContainer}>
        <Text style={styles.label}>Enable Notifications:</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity style={styles.testButton} onPress={sendTestNotification}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
      </TouchableOpacity>

      <Text style={styles.tokenLabel}>
        Expo Push Token: {expoPushToken || 'Loading...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  testButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  tokenLabel: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
