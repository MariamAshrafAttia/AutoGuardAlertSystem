import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
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
          console.log('Found user ID:', userId);
          navigation.navigate('MainApp', { screen: 'Dashboard', params: { userId } });
          return;
        }
      }
      setError('Invalid email or password');
    } catch (error) {
      setError('Failed to verify credentials');
      console.log('Sign-in error:', error.message);
    }
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
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
      <AlertButton
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUp')}
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

export default SignIn;