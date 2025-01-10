import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Keypad from '../../components/keypad';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const OTPEnter = ({ navigation, route }) => {
  const { FullName, ucpi, name, selectedDate, selectedTime , amount} =
    route.params;
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = Array(4)
    .fill()
    .map(() => useRef(null));

  const correctOTP = '1234'; // Default correct OTP

  const handlePressNumber = (key) => {
    if (key === 'Cancel') {
      const lastFilledIndex = pin.findIndex((digit) => digit === '') - 1;
      if (lastFilledIndex >= 0) {
        const newPin = [...pin];
        newPin[lastFilledIndex] = '';
        setPin(newPin);
        inputRefs[lastFilledIndex].current.focus();
      } else if (pin[3] !== '') {
        const newPin = [...pin];
        newPin[3] = '';
        setPin(newPin);
        inputRefs[3].current.focus();
      }
    } else if (/^\d+$/.test(key)) {
      const currentIndex = pin.findIndex((digit) => digit === '');
      if (currentIndex !== -1) {
        const newPin = [...pin];
        newPin[currentIndex] = key;
        setPin(newPin);
        if (currentIndex < 3) {
          inputRefs[currentIndex + 1].current.focus();
        } else {
          // Check OTP after the last digit is entered
          if (newPin.join('') === correctOTP) {
            navigation.navigate("PayScheduled", {
              FullName,
              ucpi,
              amount,
              name,
              selectedDate,
              selectedTime,
            });
          }
        }
      }
    }
  };

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }

      // Check OTP after the last digit is entered
      if (index === 3 && newPin.join('') === correctOTP) {
        // navigation.navigate('ScheduleTransactionScreen');
        navigation.navigate('PaymentSuccess');
      }
    }
  };

  const handleBackspace = (text, index) => {
    if (text === '') {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);

      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Transfer To <Text style={styles.highlight}>{FullName}</Text>
        </Text>


        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="close" size={24} color="#FF6F50" />
        </TouchableOpacity>
      </View>
      <View style={styles.recipientContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name}</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>{FullName}</Text>
          <Text style={styles.recipientID}>{ucpi}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.EnterAmount}>Enter OTP</Text>
      </View>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            editable={false}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace('', index);
              }
            }}
            ref={inputRefs[index]}
          />
        ))}
      </View>
      <Text style={styles.footerText}>
        Transferring money from your UCAC Bank Account to Joe Biden
      </Text>
      <Keypad onPress={handlePressNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20
  },
  backButton: {
    padding: 10,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '400',

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',

    textAlign: 'center',
    flex: 1,
  },
  highlight: {
    color: '#FF6F50',
    fontWeight: '700',

  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 22,
    fontWeight: '400',

  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE8D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',

    color: '#FF6F50',
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '500',

  },
  recipientID: {
    fontSize: 13,
    color: '#A3A3A3',

  },
  eyeIcon: {
    fontSize: 20,
    color: '#FF6F50',

  },
  EnterAmount: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    marginTop: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 60,
    borderBottomWidth: 2,
    borderColor: '#CCC',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',

    color: 'black',
    marginTop: 20,
    borderColor: 'black',
  },
  footerText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,

    marginBottom: 60,
  },
});

export default OTPEnter;
