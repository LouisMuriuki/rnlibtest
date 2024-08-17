import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import React, {useEffect, useState} from 'react';

const FingerprintScreen = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        setFingerprint(true);
      }
    })();
  }, []);

  const handle = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });
      if (biometricAuth.success) {
        Alert.alert('Success', 'Authenticated successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.start}>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        {isBiometricSupported && fingerprint ? (
          <TouchableOpacity onPress={handle}>
            <Text style={styles.button}>Go to home</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text>fingerprint not supported/ allocated</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FingerprintScreen;

const styles = StyleSheet.create({
  start: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: 200,
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 5,
    textShadowColor: 'black',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
    margin: 10,
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'sans-serif',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 30,
    writingDirection: 'ltr',
  },
});
