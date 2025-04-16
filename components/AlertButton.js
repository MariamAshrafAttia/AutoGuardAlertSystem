import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AlertButton = ({ title, onPress, style, severity }) => {
  const buttonColor =
    severity === 'high' ? '#F9602E' :
    severity === 'low' ? '#4CAF50' :
    '#1B3C87';
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      onPress={onPress}
      activeOpacity={0.7} // Visual feedback on press
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