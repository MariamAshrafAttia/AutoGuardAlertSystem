import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Form from '../components/Form';
import AlertButton from '../components/AlertButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    const { email, password } = values;
    console.log('Signing in with:', { email, password }); // Debug log
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
      const storedData = await AsyncStorage.getItem(email);
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.password === password) {
          setError('');
          console.log('Sign-in successful for:', email); // Debug log
          navigation.navigate('MainApp');
          return;
        }
      }
      setError('Invalid email or password');
    } catch (error) {
      setError('Failed to verify credentials');
      console.log('Sign-in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
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
  header: { fontSize: width > 400 ? 30 : 28, fontFamily: 'Montserrat-Bold', color: '#1B3C87', textAlign: 'center', marginBottom: width > 400 ? 30 : 20 },
  navButton: { backgroundColor: '#4CAF50', alignSelf: 'center', marginTop: width > 400 ? 20 : 10 },
});

export default SignIn;