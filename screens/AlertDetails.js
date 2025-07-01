import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const AlertDetails = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const { alertId } = route.params || {};
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/alerts.json');
        if (response.data && alertId) {
          const alertData = Object.entries(response.data).find(([id, _]) => id === alertId);
          if (alertData) {
            setAlert({ id: alertData[0], ...alertData[1] });
          } else {
            setError('Alert not found');
          }
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching alert:', error);
        setError('Failed to load alert');
        setLoading(false);
      }
    };
    fetchAlert();
  }, [alertId]);

  if (loading) return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Alert Details</Text>
      {error ? (
        <Text style={[styles.error, isDarkTheme && styles.darkError]}>{error}</Text>
      ) : alert ? (
        <View style={styles.details}>
          <Text style={[styles.text, isDarkTheme && styles.darkText]}>Channel: {alert.channel}</Text>
          <Text style={[styles.text, isDarkTheme && styles.darkText]}>Severity: {alert.severity}</Text>
          <Text style={[styles.text, isDarkTheme && styles.darkText]}>Average Time: {alert.averageTime}</Text>
          <Text style={[styles.text, isDarkTheme && styles.darkText]}>APG ID: {alert.APGID}</Text>
        </View>
      ) : null}
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { fontSize: width > 400 ? 30 : 28, fontFamily: 'Montserrat-Bold', color: '#1B3C87', textAlign: 'center', marginBottom: width > 400 ? 30 : 20 },
  darkHeader: { color: '#ECEFF1' },
  details: { width: width > 400 ? '70%' : '80%' },
  text: { fontSize: 16, color: '#333', marginBottom: 10 },
  darkText: { color: '#ECEFF1' },
  loading: { fontSize: 18, color: '#1B3C87' },
  darkLoading: { color: '#ECEFF1' },
  error: { fontSize: 16, color: '#F44336', marginBottom: 10 },
  darkError: { color: '#FFCDD2' },
});

export default AlertDetails;