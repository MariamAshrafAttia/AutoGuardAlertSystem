import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

const FormInput = ({ value, onChangeText, placeholder, secureTextEntry, error }) => {
  const { width } = Dimensions.get('window');
  return (
    <TextInput
      style={[styles.input, { width: width > 400 ? '70%' : '80%' }, error && styles.errorInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B3C87',
    borderWidth: 1,
    borderColor: '#1B3C87',
  },
  errorInput: {
    borderColor: '#F9602E',
  },
});

export default FormInput;