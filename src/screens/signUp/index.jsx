import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    age: false,
    password: false,
  });

  const handleRegister = () => {
    const newErrors = {
      name: !form.name,
      email: !form.email,
      age: !form.age,
      password: !form.password,
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).includes(true)) {
      console.log('Form Submitted:', form);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Create an account to experience seamless cross-border payments
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Name"
          mode="flat"
          error={errors.name}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          left={
            <TextInput.Icon
              name={() => (
                <Image source={require('../../assets/icons/user.png')} style={styles.icon} />
              )}
            />
          }
          style={styles.input}
        />
        <TextInput
          label="Email"
          mode="flat"
          error={errors.email}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          left={
            <TextInput.Icon
              name={() => (
                <Image source={require('../../assets/icons/mail.png')} style={styles.icon} />
              )}
            />
          }
          style={styles.input}
        />
        <TextInput
          label="Age"
          mode="flat"
          error={errors.age}
          value={form.age}
          onChangeText={(text) => setForm({ ...form, age: text })}
          keyboardType="numeric"
          left={
            <TextInput.Icon
              name={() => (
                <Image source={require('../../assets/icons/time.png')} style={styles.icon} />
              )}
            />
          }
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="flat"
          error={errors.password}
          value={form.password}
          secureTextEntry
          onChangeText={(text) => setForm({ ...form, password: text })}
          left={
            <TextInput.Icon
              name={() => (
                <Image source={require('../../assets/icons/lock.png')} style={styles.icon} />
              )}
            />
          }
          style={styles.input}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleRegister}
        contentStyle={styles.registerButtonContent}
        style={styles.registerButton}
      >
        Register
      </Button>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Register with Google</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.footerLink} onPress={() => navigation?.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b6b6b',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  registerButton: {
    borderRadius: 14,
    marginTop: 16,
    backgroundColor: '#f29d71',
  },
  registerButtonContent: {
    paddingVertical: 8,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 28,
  },
  googleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
    color: '#6b6b6b',
  },
  footerLink: {
    color: '#f29d71',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
