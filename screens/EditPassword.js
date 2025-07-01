import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Form from '../components/Form';
import AlertButton from '../components/AlertButton';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const EditPassword = ({ route, navigation }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json');
      const users = response.data;
      if (users && userId) {
        const user = Object.values(users).find(u => u.id === userId || Object.keys(users).find(key => key === userId && users[key].password === currentPassword));
        if (!user || user.password !== currentPassword) {
          setError('Current password is incorrect');
          return;
        }
        await axios.patch(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`, { password: newPassword });
        console.log('Password updated for userId:', userId);
        setError('');
        // Redirect to SignIn page after successful password update
        navigation.navigate('SignIn');
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.log('EditPassword error details:', error.response ? error.response.data : error.message);
      if (error.response) {
        if (error.response.status === 403) {
          setError('Permission denied. Check Firebase database rules.');
        } else {
          setError(`Failed to update password: ${error.response.data?.error || 'Unknown error'}`);
        }
      } else if (error.request) {
        setError('No response from server. Check your network connection.');
      } else {
        setError(`Failed to update password: ${error.message}`);
      }
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Edit Password</Text>
      <Form
        fields={[
          { name: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password', secure: true, error: error.includes('current') },
          { name: 'newPassword', label: 'New Password', placeholder: 'Enter new password', secure: true, error: error.includes('new') },
          { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm new password', secure: true, error: error.includes('match') },
        ]}
        onSubmit={handleSubmit}
        error={error}
        buttonTitle="Update Password"
      />
      <AlertButton
        title="Back"
        onPress={() => navigation.goBack()}
        style={styles.navButton}
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
  navButton: { backgroundColor: '#4CAF50', alignSelf: 'center', marginTop: width > 400 ? 20 : 10 },
});

export default EditPassword;