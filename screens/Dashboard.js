import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import AlertButton from '../components/AlertButton';

const Dashboard = ({ navigation }) => {
  const [alerts, setAlerts] = useState([
    { id: '1', message: 'Message injection on CAN bus at 10:00 AM', severity: 'high' },
    { id: '2', message: 'Unauthorized Wi-Fi access at 09:45 AM', severity: 'low' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IDS Dashboard</Text>
      <Text style={styles.subHeader}>Current Alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlertButton
            title={item.message}
            severity={item.severity}
            onPress={() => navigation.navigate('AlertDetails', { alert: item })}
          />
        )}
      />
      <AlertButton
        title="View Logs"
        onPress={() => navigation.navigate('Logs')}
        style={styles.navButton}
      />
      <AlertButton
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
        style={styles.navButton}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1' },
  header: { fontSize: width > 400 ? 24 : 22, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: 10 },
  subHeader: { fontSize: width > 400 ? 18 : 16, fontFamily: 'Montserrat-Regular', color: '#1B3C87', marginBottom: 10 },
  navButton: {},
});

export default Dashboard;