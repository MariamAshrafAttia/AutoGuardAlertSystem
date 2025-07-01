import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import AlertButton from '../components/AlertButton';

const Dashboard = ({ navigation, route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('Dashboard - Received userId:', userId);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/alerts.json');
        console.log('Fetched alerts data:', response.data);
        if (response.data && userId) {
          const usersResponse = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json');
          const users = usersResponse.data;
          if (users && userId) {
            const user = Object.values(users).find(u => u.id === userId);
            if (user && user.APGID) {
              const alertsArray = Object.entries(response.data)
                .map(([id, alert]) => ({ id, ...alert }))
                .filter(alert => alert.APGID === user.APGID);
              setAlerts(alertsArray);
              alertsArray.forEach(alert => {
                sendNotificationForAPGID(alert.APGID, alert.severity, alert.id);
              });
            } else {
              setAlerts([]);
            }
          } else {
            setAlerts([]);
          }
        } else {
          console.log('No alerts found in Firebase');
          setAlerts([]);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching alerts:', error);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [userId]);

  const sendNotificationForAPGID = async (apgId, severity, alertId) => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
      return;
    }

    const usersResponse = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json');
    const users = usersResponse.data;
    if (users) {
      const user = Object.values(users).find(u => u.APGID === apgId);
      if (user && user.email) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'New Alert!',
            body: `Severity: ${severity || 'N/A'}`,
            data: { alertId, screen: 'AlertDetails' },
          },
          trigger: null, // Immediate notification
        });
        console.log(`Notification sent to ${user.email} for APGID ${apgId} with severity ${severity}`);
      }
    }
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

  const renderItem = ({ item }) => {
    if (!item || !item.channel || !item.severity || !item.averageTime || !item.APGID) {
      return (
        <View style={[styles.alertItem, isDarkTheme && styles.darkAlertItem]}>
          <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Error: Invalid alert data</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.alertItem, isDarkTheme && styles.darkAlertItem]}
        onPress={() => navigation.navigate('AlertDetails', { alertId: item.id })}
      >
        <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Channel: {item.channel}</Text>
        <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Severity: {item.severity}</Text>
        <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>Average Time: {item.averageTime}</Text>
        <Text style={[styles.alertText, isDarkTheme && styles.darkAlertText]}>APG ID: {item.APGID}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Dashboard</Text>
      <FlatList
        data={alerts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={[styles.text, isDarkTheme && styles.darkText]}>No alerts available.</Text>}
      />
      <View style={styles.navContainer}>
        <AlertButton
          title="Settings"
          onPress={() => navigation.navigate('Settings', { userId })}
          style={[styles.navButton, { backgroundColor: isDarkTheme ? '#1B3C87' : '#4CAF50' }]}
        />
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
  loading: { fontSize: 18, color: '#1B3C87' },
  darkLoading: { color: '#ECEFF1' },
  text: { fontSize: 16, color: '#333' },
  darkText: { color: '#ECEFF1' },
  navContainer: { flexDirection: 'row', justifyContent: 'center', width: '80%', marginTop: 20 },
  navButton: { padding: 10, borderRadius: 5, alignItems: 'center', width: '45%' },
  navButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default Dashboard;