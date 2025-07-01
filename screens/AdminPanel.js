import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AlertButton from '../components/AlertButton';
import { useTheme } from '../ThemeContext';

const AdminPanel = ({ navigation, route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <Text style={[styles.header, isDarkTheme && styles.darkHeader]}>Admin Panel</Text>
      <AlertButton
        title="Requests Review"
        onPress={() => navigation.navigate('RequestsReview', { userId })}
        style={styles.navButton}
      />
      <AlertButton
        title="Logs"
        onPress={() => navigation.navigate('Logs', { userId })}
        style={styles.navButton}
      />
      <AlertButton
        title="System Users"
        onPress={() => navigation.navigate('SystemUsers', { userId })}
        style={styles.navButton}
      />
      <AlertButton
        title="Back to Sign In"
        onPress={() => navigation.navigate('SignIn')}
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
    width: width > 400 ? '70%' : '80%' 
  },
});

export default AdminPanel;