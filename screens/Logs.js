// screens/Logs.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ECEFF1' },
  header: { fontSize: 24, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: 20 },
  logItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#1B3C87' },
  detail: { fontSize: 16, fontFamily: 'Roboto-Regular', color: '#1B3C87', marginBottom: 5 },
  severity: { fontSize: 14, fontFamily: 'Roboto-Regular' },
  navButton: { backgroundColor: '#1B3C87' },
});

export default Logs;