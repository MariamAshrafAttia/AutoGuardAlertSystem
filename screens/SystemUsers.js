import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const SystemUsers = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json');
        console.log('Fetched users data:', response.data);
        if (response.data) {
          const usersArray = Object.entries(response.data).map(([id, user]) => ({
            id,
            name: user.name,
            email: user.email,
            nationalID: user.nationalID,
            APGID: user.APGID,
            status: user.status,
          })).filter(user => user.status !== 'admin'); // Filter out admin users
          setUsers(usersArray);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching users:', error.message);
        setError('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.userItem, isDarkTheme && styles.darkUserItem]}>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>Name: {item.name}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>Email: {item.email}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>National ID: {item.nationalID}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>APG ID: {item.APGID}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;
  }

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>System Users</Text>
      {error ? <Text style={[styles.error, isDarkTheme && styles.darkError]}>{error}</Text> : null}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={[styles.text, isDarkTheme && styles.darkText]}>No users found.</Text>}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, padding: width > 400 ? 30 : 20, backgroundColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { fontSize: width > 400 ? 30 : 28, fontFamily: 'Montserrat-Bold', color: '#1B3C87', textAlign: 'center', marginBottom: width > 400 ? 30 : 20 },
  darkHeader: { color: '#ECEFF1' },
  userItem: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 10, width: width > 400 ? '70%' : '80%' },
  darkUserItem: { borderColor: '#ECEFF1' },
  userText: { fontSize: 16, color: '#333', marginBottom: 5 },
  darkUserText: { color: '#ECEFF1' },
  loading: { fontSize: 18, color: '#1B3C87' },
  darkLoading: { color: '#ECEFF1' },
  error: { fontSize: 16, color: '#F44336', marginBottom: 10 },
  darkError: { color: '#FFCDD2' },
  text: { fontSize: 16, color: '#333' },
  darkText: { color: '#ECEFF1' },
});

export default SystemUsers;