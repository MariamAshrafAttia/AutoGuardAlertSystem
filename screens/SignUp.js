import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
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

    if (email.toLowerCase().endsWith('@apg.com')) {
      setError('Invalid email format. @apg.com emails are not allowed.');
      return;
    }

    try {
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

      const status = 'pending';
      const userData = { name, email, password, nationalID, APGID, status };

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
    <ScrollView
      contentContainerStyle={[styles.container, isDarkTheme && styles.darkContainer]}
      keyboardShouldPersistTaps="handled"
    >
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
      <View style={styles.buttonContainer}>
        <AlertButton
          title="Go to Sign In"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.navButton}
        />
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    backgroundColor: '#ECEFF1',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center'
  },
  darkContainer: { backgroundColor: '#1B3C87' },
  header: { 
    fontSize: width > 400 ? 30 : 28, 
    fontFamily: 'Montserrat-Bold', 
    color: '#1B3C87', 
    textAlign: 'center', 
    marginBottom: 30 
  },
  darkHeader: { color: '#ECEFF1' },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15
  },
  navButton: { 
    backgroundColor: '#4CAF50',
    width: width > 400 ? '70%' : '90%',
    padding: 14,
    borderRadius: 5,
  },
});

export default SignUp;