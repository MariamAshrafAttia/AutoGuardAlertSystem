// screens/EditPassword.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Form from '../components/Form';
import AlertButton from '../components/AlertButton';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const EditPassword = ({ navigation, route }) => {
  const { isDarkTheme } = useTheme();
  const [error, setError] = useState('');
  const { userId } = route.params;

  const handleSubmit = async (values) => {
    const { currentPassword, newPassword } = values;
    console.log('Attempting to update password with:', { currentPassword, newPassword, userId });
    if (!currentPassword || !newPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      // Fetch current user data to verify password
      const response = await axios.get(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`);
      const userData = response.data;
      console.log('Fetched user data:', userData);
      if (userData.password !== currentPassword) {
        setError('Current password is incorrect');
        return;
      }

      // Update password
      const updateResponse = await axios.put(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`, {
        ...userData,
        password: newPassword,
      });
      console.log('Update response:', updateResponse.data);

      // Check if the update was successful
      if (updateResponse.status === 200) {
        setError('');
        Alert.alert('Success', 'Password updated successfully. You will be logged out.');
        // Reset navigation stack and navigate to SignIn
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      } else {
        setError('Failed to update password');
      }
    } catch (error) {
      setError('Failed to update password');
      console.log('Password update error:', error.message);
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Edit Password</Text>
      <Form
        fields={[
          { name: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password', secure: true, error: error.includes('current') },
          { name: 'newPassword', label: 'New Password', placeholder: 'Enter new password', secure: true, error: error.includes('new') },
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