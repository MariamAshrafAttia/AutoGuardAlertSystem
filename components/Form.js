import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FormInput from './FormInput';
import AlertButton from './AlertButton';

const Form = ({ fields, onSubmit, error, buttonTitle }) => {
  const { width } = Dimensions.get('window');
  const [values, setValues] = React.useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));

  const handleChange = (name, text) => setValues({ ...values, [name]: text });

  const handleSubmit = () => onSubmit(values);

  return (
    <View style={[styles.container, { width: width > 400 ? '70%' : '80%' }]}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <FormInput
            value={values[field.name]}
            onChangeText={(text) => handleChange(field.name, text)}
            placeholder={field.placeholder}
            secureTextEntry={field.secure}
            error={field.error}
          />
        </View>
      ))}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <AlertButton title={buttonTitle} onPress={handleSubmit} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    alignSelf: 'center',
  },
  inputContainer: { marginBottom: 10 },
  label: { fontSize: 16, fontFamily: 'Roboto-Regular', color: '#1B3C87', marginBottom: 5 },
  errorText: { color: '#F9602E', fontFamily: 'Roboto-Regular', textAlign: 'center', marginBottom: 10 },
  button: { backgroundColor: '#1B3C87', alignSelf: 'center', width: '100%' },
});

export default Form;