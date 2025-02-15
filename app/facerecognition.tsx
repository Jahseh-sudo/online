import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as FaceDetector from 'expo-face-detector';

export default function FacialVerificationScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [faces, setFaces] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFaceDetected = ({ faces }) => {
    setFaces(faces);
    if (faces.length > 0 && !isVerified) {
      setIsVerified(true);
    }
  };

  const handleVerification = async () => {
    if (faces.length === 0) {
      Alert.alert('No Face Detected', 'Please make sure your face is visible to the camera.');
      return;
    }

    setLoading(true);
    // Simulate server verification (e.g., sending data to backend for actual verification)
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Face Verified', 'Your face has been verified successfully!');
      router.push('../ninEntry');
    }, 2000);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facial Verification</Text>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFaceDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
        }}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.overlay}>
          <Text style={styles.instructions}>
            {isVerified
              ? 'Face detected! Proceed to NIN entry.'
              : 'Please align your face with the camera.'}
          </Text>
        </View>
      </Camera>

      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity onPress={handleVerification} style={styles.button} disabled={!isCameraReady}>
            <Text style={styles.buttonText}>{isVerified ? 'Proceed to NIN Entry' : 'Verify Face'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  instructions: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
