import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Form from '../components/Form';
import AlertButton from '../components/AlertButton';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const SignUp = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    const { name, email, password, confirmPassword, nationalID, APGID } = values;
    if (!name || !email || !password || !confirmPassword || !nationalID || !APGID) {
      setError('All fields are required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (nationalID.length < 8) {
      setError('National ID must be at least 8 characters');
      return;
    }
    if (APGID.length < 2) {
      setError('APG ID must be at least 2 characters');
      return;
    }

    try {
      // Check if email or APGID already exists
      const usersResponse = await axios.get('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json');
      const users = usersResponse.data;
      if (users) {
        if (Object.values(users).some(user => user.email === email)) {
          setError('Email already in use');
          return;
        }
        if (Object.values(users).some(user => user.APGID === APGID)) {
          setError('APG ID already in use');
          return;
        }
      }

      // Determine status based on email domain
      const status = email.toLowerCase().endsWith('@apg.com') ? 'admin' : 'pending';

      // Prepare user data
      const userData = { name, email, password, nationalID, APGID, status };

      // Post user data to Firebase
      const response = await axios.post('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json', userData);
      console.log('User signed up:', email, 'Firebase userId:', response.data.name, 'Status:', status);
      setError('');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('SignUp error details:', error.response ? error.response.data : error.message);
      if (error.response) {
        if (error.response.status === 403) {
          setError('Permission denied. Check Firebase database rules.');
        } else {
          setError(`Failed to save user data: ${error.response.data?.error || 'Unknown error'}`);
        }
      } else if (error.request) {
        setError('No response from server. Check your network connection.');
      } else {
        setError(`Failed to save user data: ${error.message}`);
      }
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Sign Up</Text>
      <Form
        fields={[
          { name: 'name', label: 'Name', placeholder: 'Enter your name', secure: false, error: error.includes('name') },
          { name: 'email', label: 'Email', placeholder: 'Enter your email', secure: false, error: error.includes('email') },
          { name: 'password', label: 'Password', placeholder: 'Enter password', secure: true, error: error.includes('password') },
          { name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm your password', secure: true, error: error.includes('password') },
          { name: 'nationalID', label: 'National ID', placeholder: 'Enter your national ID', secure: false, error: error.includes('nationalID') },
          { name: 'APGID', label: 'APG ID', placeholder: 'Enter your APG ID', secure: false, error: error.includes('APGID') },
        ]}
        onSubmit={handleSubmit}
        error={error}
        buttonTitle="Sign Up"
      />
      <AlertButton
        title="Go to Sign In"
        onPress={() => navigation.navigate('SignIn')}
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

export default SignUp;