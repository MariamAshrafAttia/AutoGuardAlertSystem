import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Form from '../components/Form';
import AlertButton from '../components/AlertButton';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const SignIn = ({ navigation }) => {
  const { isDarkTheme } = useTheme();
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    const { email, password } = values;
    console.log('Signing in with:', { email, password });
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      const response = await axios.get(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json`);
      console.log('Firebase response in SignIn:', response.data);
      if (response.data) {
        const userEntry = Object.entries(response.data).find(([id, user]) => user.email === email && user.password === password);
        if (userEntry) {
          const userId = userEntry[0];
          const user = userEntry[1];
          console.log('Found user ID:', userId, 'Status:', user.status);
          if (user.status === 'pending') {
            setError(`Hello ${user.name}, you are pending now. Please contact with vendor.`);
            return;
          } else if (user.status === 'accepted') {
            navigation.navigate('MainApp', { screen: 'Dashboard', params: { userId } });
            return;
          } else if (user.status === 'admin') {
            navigation.navigate('MainApp', { screen: 'AdminPanel', params: { userId } });
            return;
          }
        }
      }
      setError('Invalid email or password');
    } catch (error) {
      setError('Failed to verify credentials');
      console.log('Sign-in error:', error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, isDarkTheme && styles.darkContainer]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Sign In</Text>
      <Form
        fields={[
          { name: 'email', label: 'Email', placeholder: 'Enter your email', secure: false, error: error.includes('email') },
          { name: 'password', label: 'Password', placeholder: 'Enter password', secure: true, error: error.includes('password') },
        ]}
        onSubmit={handleSubmit}
        error={error}
        buttonTitle="Sign In"
      />
      <View style={styles.buttonContainer}>
        <AlertButton
          title="Go to Sign Up"
          onPress={() => navigation.navigate('SignUp')}
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

export default SignIn;