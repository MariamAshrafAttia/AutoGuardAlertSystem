// screens/AlertDetails.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width > 400 ? 30 : 20,
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: width > 400 ? 26 : 24,
    fontFamily: 'Montserrat-Bold',
    color: '#1B3C87',
    marginBottom: width > 400 ? 25 : 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: width > 400 ? 18 : 16,
    fontFamily: 'Roboto-Regular',
    color: '#1B3C87',
    marginBottom: width > 400 ? 15 : 10,
    width: width > 400 ? '70%' : '80%',
    textAlign: 'center',
  },
  navButton: {},
});

export default AlertDetails;