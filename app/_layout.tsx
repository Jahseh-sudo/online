import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false, // Hides headers for all screens by default
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
