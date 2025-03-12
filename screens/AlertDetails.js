// screens/AlertDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlertButton from '../components/AlertButton';

const AlertDetails = ({ route, navigation }) => {
  const { alert } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alert Details</Text>
      <Text style={styles.detail}>Message: {alert.message}</Text>
      <Text style={styles.detail}>Severity: {alert.severity}</Text>
      <AlertButton
        title="Back to Dashboard"
        onPress={() => navigation.goBack()}
        style={styles.navButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ECEFF1' },
  header: { fontSize: 24, fontFamily: 'Montserrat-Bold', color: '#1B3C87', marginBottom: 20 },
  detail: { fontSize: 16, fontFamily: 'Roboto-Regular', color: '#1B3C87', marginBottom: 10 },
  navButton: { backgroundColor: '#1B3C87' },
});

export default AlertDetails;