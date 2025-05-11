// screens/SignUp.js
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
    const { name, email, password } = values;
    if (!name || !email || !password) {
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
  
    try {
      const userData = { name, email, password };
      await axios.post('https://autoguardalertsystem-default-rtdb.firebaseio.com/users.json', userData);
      console.log('User signed up:', email);
      setError('');
      navigation.navigate('SignIn');
    } catch (error) {
      setError('Failed to save user data');
      console.log('SignUp error:', error);
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