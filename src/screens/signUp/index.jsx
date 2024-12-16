import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icon from "../../assets/ic_round-alternate-email.png"
const RegisterScreen = ({ navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Create a account to experience a seamless cross border payments
      </Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Name"
          mode="flat"
          left={<TextInput.Icon name="account" />}
          style={styles.input}
        />
        <TextInput
          label="Email"
          mode="flat"
          left={<TextInput.Icon name="email-outline" />}
          style={styles.input}
        />
        <TextInput
          label="Age"
          mode="flat"
          left={<TextInput.Icon name="calendar" />}
          style={styles.input}
        />
        <TextInput
  label="Password"
  mode="flat"
  secureTextEntry
  left={
    <TextInput.Icon
      name={() => (
        <Image
          source={icon}
          style={{
            width: 30,
            height: 30,
          }}
        />
      )}
    />
  }
  style={styles.input}
/>
      </View>

      {/* Register Button */}
      <Button
        mode="contained"
        onPress={() => {}}
        contentStyle={styles.registerButtonContent}
        style={styles.registerButton}
      >
        Register
      </Button>

      {/* OR Separator */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.footerLink}       onPress={() => navigation?.navigate('Login')}>Login</Text>
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
