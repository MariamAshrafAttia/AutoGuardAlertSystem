import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Form = ({ fields, onSubmit, error, buttonTitle }) => {
  const [values, setValues] = useState({});
  const [secureStates, setSecureStates] = useState({});

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
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  formContainer: { 
    width: '100%',
    marginBottom: 10
  },
  inputContainer: { 
    marginBottom: 20, 
    width: '100%' 
  },
  label: { 
    fontSize: 16, 
    fontFamily: 'Roboto-Regular', 
    color: '#1B3C87', 
    marginBottom: 8 
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5,
    width: '100%'
  },
  input: { 
    flex: 1, 
    padding: 12, 
    fontSize: 16, 
    fontFamily: 'Roboto-Regular', 
    color: '#333',
    minHeight: 50
  },
  errorInput: { borderColor: '#FF4444' },
  eyeIcon: { padding: 10 },
  errorText: { 
    color: '#FF4444', 
    fontSize: 14, 
    fontFamily: 'Roboto-Regular', 
    marginBottom: 15,
    textAlign: 'center'
  },
  button: { 
    backgroundColor: '#1B3C87', 
    paddingVertical: 14,
    borderRadius: 5, 
    marginTop: 10,
    width: '100%'
  },
  buttonText: { 
    color: '#ECEFF1', 
    fontSize: 16, 
    fontFamily: 'Roboto-Bold', 
    textAlign: 'center' 
  },
});

export default Form;