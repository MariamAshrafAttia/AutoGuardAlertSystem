// screens/Logs.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import AlertButton from '../components/AlertButton';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const Logs = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/logs.json');
        if (response.data) {
          const logsArray = Object.entries(response.data).map(([id, log]) => ({ id, ...log }));
          setLogs(logsArray);
        } else {
          setLogs([]);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching logs:', error);
        setLogs([]);
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Attack Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.logItem, isDarkTheme && styles.darkLogItem]}>
            <Text style={[styles.detail, isDarkTheme && styles.darkDetail]}>{item.message || 'No message'}</Text>
            <Text style={[
              styles.severity,
              isDarkTheme ? styles.darkSeverity : {},
              item.severity === 'high' ? { color: '#F9602E' } : 
              item.severity === 'low' ? { color: '#4CAF50' } : { color: '#1B3C87' }
            ]}>
              (Severity: {item.severity || 'N/A'})
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.text, isDarkTheme && styles.darkText]}>No logs available.</Text>}
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
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { fontSize: width > 400 ? 26 : 24, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: width > 400 ? 25 : 20, textAlign: 'center' },
  darkHeader: { color: '#ECEFF1' },
  logItem: { padding: width > 400 ? 15 : 10, borderBottomWidth: 1, borderBottomColor: '#1B3C87', width: width > 400 ? '80%' : '90%', alignSelf: 'center' },
  darkLogItem: { borderBottomColor: '#ECEFF1' },
  detail: { fontSize: width > 400 ? 18 : 16, fontFamily: 'Roboto-Regular', color: '#1B3C87', marginBottom: 5 },
  darkDetail: { color: '#ECEFF1' },
  severity: { fontSize: width > 400 ? 16 : 14, fontFamily: 'Roboto-Regular' },
  darkSeverity: {}, // Severity colors are already dynamic, no change needed
  loading: { fontSize: 18, color: '#1B3C87', textAlign: 'center', marginTop: 20 },
  darkLoading: { color: '#ECEFF1' },
  text: { fontSize: 16, color: '#333', textAlign: 'center', marginTop: 20 },
  darkText: { color: '#ECEFF1' },
  navButton: {},
});

export default Logs;