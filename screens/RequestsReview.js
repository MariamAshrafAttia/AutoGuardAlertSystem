import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const RequestsReview = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json');
        console.log('Fetched users data:', response.data);
        if (response.data) {
          const users = Object.entries(response.data)
            .filter(([_, user]) => user.status === 'pending')
            .map(([id, user]) => ({ id, ...user }));
          setPendingUsers(users);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching pending users:', error.message);
        setError('Failed to load pending users');
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId, userData) => {
    try {
      await axios.put(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`, {
        ...userData,
        status: 'accepted'
      });
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      console.log(`User ${userId} approved`);
    } catch (error) {
      console.log('Error approving user:', error.message);
      setError('Failed to approve user');
    }
  };

  const handleDeny = async (userId) => {
    try {
      await axios.delete(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`);
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      console.log(`User ${userId} denied and deleted`);
    } catch (error) {
      console.log('Error denying user:', error.message);
      setError('Failed to deny user');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.userItem, isDarkTheme && styles.darkUserItem]}>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>Name: {item.name}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>Email: {item.email}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>National ID: {item.nationalID}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>APG ID: {item.APGID}</Text>
      <Text style={[styles.userText, isDarkTheme && styles.darkUserText]}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => handleApprove(item.id, item)}
        >
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#F44336' }]}
          onPress={() => handleDeny(item.id)}
        >
          <Text style={styles.buttonText}>Deny</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={[styles.loading, isDarkTheme && styles.darkLoading]}>Loading...</Text>;
  }

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Requests Review</Text>
      {error ? <Text style={[styles.error, isDarkTheme && styles.darkError]}>{error}</Text> : null}
      <FlatList
        data={pendingUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={[styles.text, isDarkTheme && styles.darkText]}>No pending users.</Text>}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: width > 400 ? 30 : 20, 
    backgroundColor: '#ECEFF1', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { 
    fontSize: width > 400 ? 30 : 28, 
    fontFamily: 'Montserrat-Bold', 
    color: '#1B3C87', 
    textAlign: 'center', 
    marginBottom: width > 400 ? 30 : 20 
  },
  darkHeader: { color: '#ECEFF1' },
  userItem: { 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginVertical: 10, 
    width: width > 400 ? '70%' : '80%' 
  },
  darkUserItem: { borderColor: '#ECEFF1' },
  userText: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 5 
  },
  darkUserText: { color: '#ECEFF1' },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  actionButton: { 
    padding: 10, 
    borderRadius: 5, 
    width: '45%', 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  loading: { 
    fontSize: 18, 
    color: '#1B3C87' 
  },
  darkLoading: { color: '#ECEFF1' },
  error: { 
    fontSize: 16, 
    color: '#F44336', 
    marginBottom: 10 
  },
  darkError: { color: '#FFCDD2' },
  text: { 
    fontSize: 16, 
    color: '#333' 
  },
  darkText: { color: '#ECEFF1' },
});

export default RequestsReview;