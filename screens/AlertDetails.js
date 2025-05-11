// screens/AlertDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const AlertDetails = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const { alertId } = route.params;
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AlertDetails - Received alertId:', alertId);
    const fetchAlert = async () => {
      if (!alertId) {
        console.log('No alertId provided');
        setLoading(false);
        setAlert({ message: 'Not found', severity: 'N/A' });
        return;
      }
      try {
        // Use nested path based on previous debugging
        const response = await axios.get(`https://autoguardalertsystem-default-rtdb.firebaseio.com/alerts/alerts/${alertId}.json`);
        console.log('Fetched alert data (nested path):', response.data);
        if (response.data) {
          setAlert({
            message: response.data.message || 'Not found',
            severity: response.data.severity || 'N/A',
          });
        } else {
          console.log('No alert data found for alertId:', alertId);
          setAlert({ message: 'Not found', severity: 'N/A' });
        }
      } catch (error) {
        console.log('Error fetching alert:', error.message);
        setAlert({ message: 'Not found', severity: 'N/A' });
      } finally {
        setLoading(false);
      }
    };
    fetchAlert();
  }, [alertId]);

  if (loading) return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;

  if (!alert) return <Text style={[styles.text, isDarkTheme && styles.darkText]}>Alert not found.</Text>;

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Alert Details</Text>
      <Text style={[styles.text, isDarkTheme && styles.darkText]}>Message: {alert.message}</Text>
      <Text style={[styles.text, isDarkTheme && styles.darkText]}>Severity: {alert.severity}</Text>
      <Text style={[styles.text, isDarkTheme && styles.darkText]}>Alert ID: {alertId}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1B3C87', marginBottom: 20 },
  darkHeader: { color: '#ECEFF1' },
  text: { fontSize: 16, color: '#333', marginVertical: 5 },
  darkText: { color: '#ECEFF1' },
  loading: { fontSize: 18, color: '#1B3C87' },
  darkLoading: { color: '#ECEFF1' },
});

export default AlertDetails;