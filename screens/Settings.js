import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions } from 'react-native';
import AlertButton from '../components/AlertButton';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const Settings = ({ navigation, route }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [user, setUser] = React.useState({ 
    name: 'Not available', 
    email: 'Not available', 
    nationalID: 'Not available', 
    APGID: 'Not available', 
    status: 'Not available' 
  });
  const { userId } = route.params || {};

  useEffect(() => {
    console.log('Settings screen - Received userId:', userId);
    const fetchUser = async () => {
      if (!userId) {
        console.log('No userId provided, cannot fetch user data');
        return;
      }
      try {
        const response = await axios.get(`https://autoguardalertsystem-default-rtdb.firebaseio.com/users/${userId}.json`);
        console.log('Fetched user data in Settings:', response.data);
        if (response.data) {
          setUser({ 
            name: response.data.name || 'Not available', 
            email: response.data.email || 'Not available',
            nationalID: response.data.nationalID || 'Not available',
            APGID: response.data.APGID || 'Not available',
            status: response.data.status || 'Not available'
          });
        } else {
          console.log('No user data found for userId:', userId);
        }
      } catch (error) {
        console.log('Error fetching user in Settings:', error.message);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={[styles.label, isDarkTheme && styles.darkLabel]}>Toggle Theme</Text>
        <Switch
          onValueChange={toggleTheme}
          value={isDarkTheme}
          trackColor={{ false: '#888', true: '#1B3C87' }}
          thumbColor={isDarkTheme ? '#ECEFF1' : '#ECEFF1'}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={[styles.label, isDarkTheme && styles.darkLabel]}>Name: {user.name}</Text>
        <Text style={[styles.label, isDarkTheme && styles.darkLabel]}>Email: {user.email}</Text>
        <Text style={[styles.label, isDarkTheme && styles.darkLabel]}>National ID: {user.nationalID}</Text>
        <Text style={[styles.label, isDarkTheme && styles.darkLabel]}>APG ID: {user.APGID}</Text>
        <Text style={[styles.label, isDarkTheme && styles.darkLabel]}>Status: {user.status}</Text>
      </View>
      <AlertButton
        title="Edit Password"
        onPress={() => navigation.navigate('EditPassword', { userId })}
        style={styles.navButton}
      />
      <AlertButton
        title="Back to Dashboard"
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
  header: { fontSize: width > 400 ? 26 : 24, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: width > 400 ? 25 : 20, textAlign: 'center' },
  darkHeader: { color: '#ECEFF1' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: width > 400 ? 20 : 15, width: width > 400 ? '70%' : '80%' },
  label: { fontSize: width > 400 ? 18 : 16, fontFamily: 'Roboto-Regular', color: '#1B3C87' },
  darkLabel: { color: '#ECEFF1' },
  userInfo: { marginBottom: width > 400 ? 20 : 15, width: width > 400 ? '70%' : '80%' },
  navButton: { backgroundColor: '#4CAF50', alignSelf: 'center', marginTop: width > 400 ? 10 : 5 },
});

export default Settings;