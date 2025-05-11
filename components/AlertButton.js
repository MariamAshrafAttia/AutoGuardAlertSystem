// components/AlertButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const AlertButton = ({ title, onPress, style, severity }) => {
  const { isDarkTheme } = useTheme();
  const buttonColor =
    severity === 'high' ? '#F9602E' :
    severity === 'low' ? '#4CAF50' :
    isDarkTheme ? '#2A4BA0' : '#1B3C87'; // Adjust default color based on theme
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={title}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
});

export default AlertButton;