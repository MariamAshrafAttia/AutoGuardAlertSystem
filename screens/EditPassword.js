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
      // First get the user data
      const userResponse = await axios.get(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`);
      const user = userResponse.data;
      
      if (!user) {
        setError('User not found');
        return;
      }

      // Verify current password
      if (user.password !== currentPassword) {
        setError('Current password is incorrect');
        return;
      }

      // Update password
      await axios.patch(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`, { 
        password: newPassword 
      });
      
      console.log('Password updated successfully for userId:', userId);
      setError('');
      navigation.navigate('SignIn');
      
    } catch (error) {
      console.log('EditPassword error:', error);
      if (error.response) {
        setError(`Error: ${error.response.data.error || 'Failed to update password'}`);
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Edit Password</Text>
      <Form
        fields={[
          { 
            name: 'currentPassword', 
            label: 'Current Password', 
            placeholder: 'Enter current password', 
            secure: true, 
            error: error.includes('current') 
          },
          { 
            name: 'newPassword', 
            label: 'New Password', 
            placeholder: 'Enter new password', 
            secure: true, 
            error: error.includes('new') 
          },
          { 
            name: 'confirmPassword', 
            label: 'Confirm Password', 
            placeholder: 'Confirm new password', 
            secure: true, 
            error: error.includes('match') 
          },
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
  navButton: { 
    backgroundColor: '#4CAF50', 
    alignSelf: 'center', 
    marginTop: width > 400 ? 20 : 10,
    width: width > 400 ? '70%' : '80%',
    padding: 12
  },
});

export default EditPassword;