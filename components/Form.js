// components/Form.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For the eye icon

const Form = ({ fields, onSubmit, error, buttonTitle }) => {
  const [values, setValues] = useState({});
  const [secureStates, setSecureStates] = useState({}); // Track visibility for each secure field

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const toggleSecure = (name) => {
    setSecureStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <View style={styles.formContainer}>
      {fields.map(field => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, field.error && styles.errorInput]}
              placeholder={field.placeholder}
              secureTextEntry={field.secure ? !(secureStates[field.name] || false) : false}
              onChangeText={text => handleChange(field.name, text)}
              value={values[field.name] || ''}
            />
            {field.secure && (
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => toggleSecure(field.name)}
              >
                <Icon
                  name={secureStates[field.name] ? 'eye' : 'eye-slash'}
                  size={20}
                  color="#1B3C87"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  formContainer: { width: width > 400 ? '70%' : '80%', alignItems: 'center' },
  inputContainer: { marginBottom: width > 400 ? 20 : 15, width: '100%' },
  label: { fontSize: width > 400 ? 18 : 16, fontFamily: 'Roboto-Regular', color: '#1B3C87', marginBottom: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  input: { flex: 1, padding: 10, fontSize: width > 400 ? 16 : 14, fontFamily: 'Roboto-Regular', color: '#333' },
  errorInput: { borderColor: '#FF4444' },
  eyeIcon: { padding: 10 },
  errorText: { color: '#FF4444', fontSize: width > 400 ? 16 : 14, fontFamily: 'Roboto-Regular', marginBottom: 10 },
  button: { backgroundColor: '#1B3C87', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#ECEFF1', fontSize: width > 400 ? 18 : 16, fontFamily: 'Roboto-Bold', textAlign: 'center' },
});

export default Form;