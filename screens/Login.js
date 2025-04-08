// screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AlertButton from '../components/AlertButton';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock credentials for testing
  const mockEmail = 'mariam@example.com';
  const mockPassword = 'password123';

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    console.log('handleLogin called');
    console.log('Username:', username);
    console.log('Password:', password);
    setError(''); // Clear previous errors
  
    if (!username || !password) {
      setError('Please enter both email and password');
      console.log('Error: Missing email or password');
      return;
    }
    if (!validateEmail(username)) {
      setError('Please enter a valid email address');
      console.log('Error: Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      console.log('Error: Password too short');
      return;
    }
    console.log('Checking credentials...');
    console.log('Expected Email:', mockEmail);
    console.log('Expected Password:', mockPassword);
    if (username === mockEmail && password === mockPassword) {
      console.log('Credentials match! Navigating to MainApp...');
      navigation.navigate('MainApp'); // Navigate to the nested navigator
    } else {
      setError('Invalid email or password');
      console.log('Error: Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Please contact support to reset your password.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IDS Login</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotLink}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <AlertButton
        title="Login"
        onPress={handleLogin}
        style={styles.loginButton}
      />
      <Text style={styles.testCredentials}>
        Test Credentials: {mockEmail} / {mockPassword}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ECEFF1', // Neutral
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: '#1B3C87', // Primary
    marginBottom: 40,
    textAlign: 'center',
  },
  errorText: {
    color: '#F9602E', // Secondary (for errors)
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1B3C87', // Primary
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B3C87',
    borderWidth: 1,
    borderColor: '#1B3C87', // Primary for border
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#4CAF50', // Accent (for link)
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#1B3C87', // Primary
  },
  testCredentials: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: '#1B3C87',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Login;