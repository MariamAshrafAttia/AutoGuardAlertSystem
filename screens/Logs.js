import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TextInput } from 'react-native';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const Logs = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};
  const [logs, setLogs] = useState([]);
  const [APGID, setAPGID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false); // Track if a search has been attempted

  useEffect(() => {
    if (APGID && APGID.trim().length >= 2) {
      const fetchLogs = async () => {
        setLoading(true);
        setError('');
        setSearched(true);
        try {
          const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/logs.json', {
            headers: { 'Content-Type': 'application/json' },
          });
          console.log('Full response:', response);
          console.log('Raw response data:', response.data);
          if (response.data) {
            const logsArray = Object.entries(response.data)
              .filter(([_, log]) => {
                const logAPGID = log.APGID ? log.APGID.trim() : '';
                console.log('Comparing APGID:', APGID.trim(), 'with log APGID:', logAPGID);
                return logAPGID === APGID.trim();
              })
              .map(([id, log]) => ({ id, ...log }));
            setLogs(logsArray);
          } else {
            setLogs([]);
            console.log('No data returned from Firebase');
          }
          setLoading(false);
        } catch (error) {
          console.log('Detailed error:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response',
            status: error.response ? error.response.status : 'No status',
            request: error.request ? 'Request made' : 'No request',
          });
          setError('Failed to load logs: ' + (error.response ? error.response.data.error || error.message : error.message));
          setLoading(false);
        }
      };
      fetchLogs();
    } else if (APGID && APGID.trim().length < 2) {
      setError('APG ID must be at least 2 characters');
      setSearched(true);
      setLogs([]);
    } else {
      setLogs([]);
      setSearched(false);
      setError('');
    }
  }, [APGID]);

  const renderItem = ({ item }) => (
    <View style={[styles.logItem, isDarkTheme && styles.darkLogItem]}>
      <Text style={[styles.logText, isDarkTheme && styles.darkLogText]}>Timestamp: {item.timestamp}</Text>
      <Text style={[styles.logText, isDarkTheme && styles.darkLogText]}>ECU ID: {item.ECUID}</Text>
      <Text style={[styles.logText, isDarkTheme && styles.darkLogText]}>DLC: {item.DLC}</Text>
      <Text style={[styles.logText, isDarkTheme && styles.darkLogText]}>Data Field: {item.dataField}</Text>
      <Text style={[styles.logText, isDarkTheme && styles.darkLogText]}>APG ID: {item.APGID}</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Logs</Text>
      <TextInput
        style={[styles.input, isDarkTheme && styles.darkInput]}
        placeholder="Enter APG ID"
        placeholderTextColor={isDarkTheme ? '#B0BEC5' : '#78909C'}
        value={APGID}
        onChangeText={(text) => setAPGID(text)}
        onSubmitEditing={() => {
          if (APGID.trim().length < 2) {
            setError('APG ID must be at least 2 characters');
            setSearched(true);
            setLogs([]);
          } else {
            setSearched(true);
          }
        }}
      />
      {error ? <Text style={[styles.error, isDarkTheme && styles.darkError]}>{error}</Text> : null}
      {loading ? (
        <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>
      ) : searched && logs.length === 0 ? (
        <Text style={[styles.text, isDarkTheme && styles.darkText]}>No logs found for this APG ID.</Text>
      ) : (
        <FlatList
          data={logs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={searched && logs.length === 0 ? <Text style={[styles.text, isDarkTheme && styles.darkText]}>No logs found for this APG ID.</Text> : null}
        />
      )}
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { fontSize: width > 400 ? 30 : 28, fontFamily: 'Montserrat-Bold', color: '#1B3C87', textAlign: 'center', marginBottom: width > 400 ? 30 : 20 },
  darkHeader: { color: '#ECEFF1' },
  input: { 
    width: width > 400 ? '70%' : '80%', 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginBottom: 20, 
    fontSize: 16, 
    color: '#333' 
  },
  darkInput: { borderColor: '#ECEFF1', color: '#ECEFF1' },
  logItem: { 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginVertical: 10, 
    width: width > 400 ? '70%' : '80%' 
  },
  darkLogItem: { borderColor: '#ECEFF1' },
  logText: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 5 
  },
  darkLogText: { color: '#ECEFF1' },
  loading: { fontSize: 18, color: '#1B3C87' },
  darkLoading: { color: '#ECEFF1' },
  error: { fontSize: 16, color: '#F44336', marginBottom: 10 },
  darkError: { color: '#FFCDD2' },
  text: { fontSize: 16, color: '#333' },
  darkText: { color: '#ECEFF1' },
});

export default Logs;