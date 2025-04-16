// screens/Logs.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import AlertButton from '../components/AlertButton';

const Logs = ({ navigation }) => {
  const logs = [
    { id: '1', message: '10:00 AM - CAN bus intrusion', severity: 'high' },
    { id: '2', message: '09:45 AM - Unauthorized Wi-Fi access attempt', severity: 'low' },
    { id: '3', message: '09:30 AM - GPS signal spoofing detected', severity: 'medium' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attack Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.detail}>{item.message}</Text>
            <Text style={[
              styles.severity,
              item.severity === 'high' ? { color: '#F9602E' } : 
              item.severity === 'low' ? { color: '#4CAF50' } : { color: '#1B3C87' }
            ]}>
              (Severity: {item.severity})
            </Text>
          </View>
        )}
      />
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
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1' },
  header: { fontSize: width > 400 ? 26 : 24, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: width > 400 ? 25 : 20, textAlign: 'center' },
  logItem: { padding: width > 400 ? 15 : 10, borderBottomWidth: 1, borderBottomColor: '#1B3C87', width: width > 400 ? '80%' : '90%', alignSelf: 'center' },
  detail: { fontSize: width > 400 ? 18 : 16, fontFamily: 'Roboto-Regular', color: '#1B3C87', marginBottom: 5 },
  severity: { fontSize: width > 400 ? 16 : 14, fontFamily: 'Roboto-Regular' },
  navButton: {},
});

export default Logs;