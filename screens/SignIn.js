import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Form from '../components/Form';
import AlertButton from '../components/AlertButton';

const SignIn = ({ navigation }) => {
  const [error, setError] = useState('');

  const handleSubmit = (values) => {
    const { email, password } = values;
    console.log('Submitting:', { email, password }); // Add for debugging
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
    setError('');
    console.log('Navigating to MainApp'); // Add for debugging
    navigation.navigate('MainApp');
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