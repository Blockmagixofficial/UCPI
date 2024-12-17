import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import india from "../../assets/flag.png";
import usa from "../../assets/united-states.png";

const LoginScreen = ({ navigation }) => {
  const [tab, setTab] = useState('phone'); // 'phone' or 'email'
  const [selectedCountry, setSelectedCountry] = useState('+91'); // Default country
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
      // Navigate to OTP Screen
      navigation.navigate('otp', { phoneNumber, selectedCountry });
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Login Account</Text>
      <Text style={styles.subtitle}>Hello, welcome back to our account</Text>

      {/* Tabs */}
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

      {/* Phone Number Login */}
      {tab === 'phone' ? (
        <View style={styles.form}>
          {/* Dropdown Row with Flag */}
          <View style={styles.phoneRow}>
  {/* Rounded Flag */}
  <Image
    source={countryData.find((c) => c.value === selectedCountry)?.flag}
    style={styles.roundedFlag}
    resizeMode="cover"
  />

  {/* Picker Dropdown */}
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedCountry}
      onValueChange={(value) => setSelectedCountry(value)}
      style={styles.picker}
      mode="dropdown" // Dropdown expands to fit content
    >
      {countryData.map((country) => (
        <Picker.Item
          key={country.value}
          label={country.label} // Display full label when expanded
          value={country.value}
        />
      ))}
    </Picker>
  </View>

  {/* Phone Number Input */}
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
        /* Email Login */
        /* Email Login */
<View style={styles.form}>
  <TextInput
    label="Email ID"
    mode="flat"
    left={<TextInput.Icon name="at" />}
    style={styles.input}
    keyboardType="email-address"
  />
  <TextInput
    label="Password"
    mode="flat"
    secureTextEntry
    left={<TextInput.Icon name="lock-outline" />}
    style={styles.input}
  />
  <Button
    mode="contained"
    onPress={() => {}}
    contentStyle={styles.buttonContent}
    style={[styles.button, { marginTop: 16 }]} // Add margin to separate the button
  >
    Login
  </Button>
</View>

      )}

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
        Not Registered yet? <Text style={styles.footerLink}  onPress={() => navigation?.navigate('Signup')}> Create an Account</Text>
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
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center vertically
    marginBottom: 16,
  },
  
  roundedFlag: {
    width: 30,             // Set width
    height: 30,            // Set height
    borderRadius: 15,      // Half of width/height for a perfect circle
    overflow: 'hidden',    // Ensures the image stays within the circular shape
    backgroundColor: '#ddd', // Optional: fallback background color
    marginRight: 8,        // Space between flag and picker
  },
  
  
  pickerContainer: {
    marginTop: 10,
    width: 30,          // Compact default width for picker
    justifyContent: 'center',
    marginRight: 12,    // Space between picker and input
  },
  
  picker: {
    width: '10%',      // Allow Picker to take full width inside its container
    color: '#333',
    fontSize: 14,
  },
  
  phoneInput: {
    flex: 1,            // Take remaining space
    backgroundColor: 'transparent',
    fontSize: 16,
    height: 50,
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
  form: {
    // marginBottom: 24,
    // paddingTop:24,
    // paddingBottom:24
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  flagDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  flagIcon: {
    width: 28,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },
  picker: {
    flex: 1,
    color: '#333',
    height: 50,
    marginTop: -4,
  },
  input: {
    // flex: 1,
    backgroundColor: 'transparent',
    // marginBottom: 12, // Add spacing between inputs
  },
  input_mob:{
flex: 1,
backgroundColor: 'transparent',
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
