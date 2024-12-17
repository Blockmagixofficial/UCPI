import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import india from "../../assets/flag.png";
import usa from "../../assets/united-states.png";

const LoginScreen = ({ navigation }) => {
  const [tab, setTab] = useState('phone');
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');

  const countryData = [
    {
      label: 'India (+91)',
      value: '+91',
      flag: india,
    },
    {
      label: 'USA (+1)',
      value: '+1',
      flag: usa,
    },
  ];

  const handleRequestOtp = () => {
    if (phoneNumber.length >= 10) {
      navigation.navigate('otp', { phoneNumber, selectedCountry });
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Account</Text>
      <Text style={styles.subtitle}>Hello, welcome back to our account</Text>
      <Surface style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'phone' && styles.activeTab]}
          onPress={() => setTab('phone')}
        >
          <Text style={[styles.tabText, tab === 'phone' && styles.activeTabText]}>
            Phone Number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'email' && styles.activeTab]}
          onPress={() => setTab('email')}
        >
          <Text style={[styles.tabText, tab === 'email' && styles.activeTabText]}>
            Email
          </Text>
        </TouchableOpacity>
      </Surface>

      {tab === 'phone' ? (
        <View style={styles.form}>
          <View style={styles.phoneRow}>
            <Image
              source={countryData.find((c) => c.value === selectedCountry)?.flag}
              style={styles.roundedFlag}
              resizeMode="cover"
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCountry}
                onValueChange={(value) => setSelectedCountry(value)}
                style={styles.picker}
                mode="dropdown"
              >
                {countryData.map((country) => (
                  <Picker.Item
                    key={country.value}
                    label={country.label}
                    value={country.value}
                  />
                ))}
              </Picker>
            </View>
            <TextInput
              placeholder="Phone Number"
              style={styles.phoneInput}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <Button
            mode="contained"
            onPress={handleRequestOtp}
            contentStyle={styles.buttonContent}
            style={styles.button}
          >
            Request OTP
          </Button>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/mail.png')}
              style={styles.icon}
            />
            <TextInput
              placeholder="Email ID"
              mode="flat"
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/icons/lock.png')}
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              mode="flat"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <Button
            mode="contained"
            onPress={() => {}}
            contentStyle={styles.buttonContent}
            style={[styles.button, { marginTop: 16 }]}
          >
            Login
          </Button>
        </View>
      )}

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
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Not Registered yet?{' '}
        <Text style={styles.footerLink} onPress={() => navigation?.navigate('Signup')}>
          Create an Account
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
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  roundedFlag: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  pickerContainer: {
    marginTop: 10,
    width: 30,
    justifyContent: 'center',
    marginRight: 12,
  },
  picker: {
    width: '10%',
    color: '#333',
    fontSize: 14,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    height: 50,
    // borderBottomColor:'transparent'
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
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  tabText: {
    color: '#aaa',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  form: {},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    height: 50,

  },
  button: {
    borderRadius: 24,
    backgroundColor: '#1F41BB',
  },
  buttonContent: {
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
    fontWeight: 'bold',
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
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#6b6b6b',
  },
  footerLink: {
    color: '#1F41BB',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
