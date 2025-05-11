// screens/Dashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const Dashboard = ({ navigation, route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};
  const [alerts, setAlerts] = useState({});
  const [loading, setLoading] = useState(true);

  console.log('Dashboard - Received userId:', userId);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/alerts.json');
        console.log('Fetched alerts data:', response.data);
        if (response.data && response.data.alerts) {
          setAlerts(response.data.alerts);
        } else if (response.data) {
          setAlerts(response.data);
        } else {
          console.log('No alerts found in Firebase');
          setAlerts({});
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching alerts:', error);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    if (!loading && Object.keys(alerts).length > 0 && Platform.OS !== 'web') {
      scheduleNotifications(Object.entries(alerts));
    }
  }, [alerts, loading]);

  const scheduleNotifications = async (alertEntries) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Notification permissions denied!');
      return;
    }

    alertEntries.forEach(([alertId, alert], index) => {
      console.log('Scheduling notification for alertId:', alertId, 'Alert:', alert);
      const delay = (index + 1) * 3000;
      setTimeout(async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'New Alert!',
            body: `Message: ${alert.message || 'N/A'}\nSeverity: ${alert.severity || 'N/A'}`,
            data: { alertId, screen: 'AlertDetails' },
            sound: 'default',
          },
          trigger: null,
        });
      }, delay);
    });
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { alertId, screen } = response.notification.request.content.data;
      console.log('Notification tapped with alertId:', alertId, 'Screen:', screen);
      if (screen === 'AlertDetails' && alertId) {
        navigation.navigate('AlertDetails', { alertId });
      }
    });
    return () => subscription.remove();
  }, [navigation]);

  const handleDelete = async (alertId) => {
    try {
      console.log('Attempting to delete alert with ID:', alertId);
      const response = await axios.delete(`https://autoguardalertsystem-default-rtdb.firebaseio.com/alerts/alerts/${alertId}.json`);
      console.log('Delete response:', response);
      if (response.status === 200) {
        setAlerts(prevAlerts => {
          const newAlerts = { ...prevAlerts };
          delete newAlerts[alertId];
          return newAlerts;
        });
        Alert.alert('Success', 'Alert deleted');
      } else {
        Alert.alert('Error', 'Delete request failed with status: ' + response.status);
      }
    } catch (error) {
      console.log('Error deleting alert:', error.message);
      Alert.alert('Error', 'Failed to delete alert: ' + error.message);
    }
  };

  const renderItem = ({ item, index }) => {
    console.log('Rendering item:', item, 'Index:', index, 'Alert keys:', Object.keys(alerts));
    if (!item || typeof item !== 'object' || !item.message || !item.severity) {
      return (
        <View style={[styles.alertItem, isDarkTheme && styles.darkAlertItem]}>
          <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Error: Invalid alert data - {JSON.stringify(item)}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.alertItem, isDarkTheme && styles.darkAlertItem]}>
        <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Message: {item.message}</Text>
        <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Severity: {item.severity}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Delete" onPress={() => handleDelete(Object.keys(alerts)[index])} color="#FF4444" />
        </View>
      </View>
    );
  };

  if (loading) return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Dashboard</Text>
      <FlatList
        data={Object.values(alerts)}
        renderItem={renderItem}
        keyExtractor={(item, index) => Object.keys(alerts)[index] || `item-${index}`}
        ListEmptyComponent={<Text style={[styles.text, isDarkTheme && styles.darkText]}>No alerts available.</Text>}
      />
      <View style={styles.navContainer}>
        <TouchableOpacity style={[styles.navButton, { backgroundColor: isDarkTheme ? '#4CAF50' : '#1B3C87' }]} onPress={() => navigation.navigate('Logs')}>
          <Text style={styles.navButtonText}>View Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, { backgroundColor: isDarkTheme ? '#1B3C87' : '#4CAF50' }]} onPress={() => navigation.navigate('Settings', { userId })}>
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1B3C87', marginBottom: 20 },
  darkHeader: { color: '#ECEFF1' },
  alertItem: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 5, width: '80%' },
  darkAlertItem: { borderColor: '#ECEFF1' },
  alertText: { fontSize: 16, color: '#333' },
  darkAlertText: { color: '#ECEFF1' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  loading: { fontSize: 18, color: '#1B3C87' },
  darkLoading: { color: '#ECEFF1' },
  text: { fontSize: 16, color: '#333' },
  darkText: { color: '#ECEFF1' },
  navContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginTop: 20 },
  navButton: { padding: 10, borderRadius: 5, alignItems: 'center', width: '45%' },
  navButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default Dashboard;