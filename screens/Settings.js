// screens/Settings.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions } from 'react-native';
import AlertButton from '../components/AlertButton';

const Settings = ({ navigation }) => {
  const [isCANEnabled, setIsCANEnabled] = useState(true);
  const [isWiFiEnabled, setIsWiFiEnabled] = useState(true);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable CAN Monitoring</Text>
        <Switch
          onValueChange={setIsCANEnabled}
          value={isCANEnabled}
          trackColor={{ false: '#888', true: '#4CAF50' }}
          thumbColor={isCANEnabled ? '#ECEFF1' : '#ECEFF1'}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable Wi-Fi Monitoring</Text>
        <Switch
          onValueChange={setIsWiFiEnabled}
          value={isWiFiEnabled}
          trackColor={{ false: '#888', true: '#4CAF50' }}
          thumbColor={isWiFiEnabled ? '#ECEFF1' : '#ECEFF1'}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable Bluetooth Monitoring</Text>
        <Switch
          onValueChange={setIsBluetoothEnabled}
          value={isBluetoothEnabled}
          trackColor={{ false: '#888', true: '#4CAF50' }}
          thumbColor={isBluetoothEnabled ? '#ECEFF1' : '#ECEFF1'}
        />
      </View>
      <AlertButton
        title="Back to Dashboard"
        onPress={() => navigation.goBack()}
        style={styles.navButton}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: width > 400 ? 26 : 24, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: width > 400 ? 25 : 20, textAlign: 'center' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: width > 400 ? 20 : 15, width: width > 400 ? '70%' : '80%' },
  label: { fontSize: width > 400 ? 18 : 16, fontFamily: 'Roboto-Regular', color: '#1B3C87' },
  navButton: {},
});

export default Settings;