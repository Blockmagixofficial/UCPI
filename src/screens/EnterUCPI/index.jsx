import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Keypad from '../../components/keypad';

const UCPIEnter = () => {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = Array(4)
    .fill()
    .map(() => useRef(null));

    const handlePressNumber = (key) => {
        if (key === 'Cancel') {
          // Find the last filled index and clear it
          const lastFilledIndex = pin.findIndex((digit) => digit === '') - 1
          if (lastFilledIndex >= 0) {
            const newPin = [...pin]
            newPin[lastFilledIndex] = ''
            setPin(newPin)
            inputRefs[lastFilledIndex].current.focus()
          } else if (pin[3] !== '') {
            // If all digits are filled, delete the last digit
            const newPin = [...pin]
            newPin[3] = ''
            setPin(newPin)
            inputRefs[3].current.focus()
          }
        } else if (/^\d+$/.test(key)) {
          // Handle numeric input
          const currentIndex = pin.findIndex((digit) => digit === '')
          if (currentIndex !== -1) {
            const newPin = [...pin] 
            newPin[currentIndex] = key
            setPin(newPin)
            if (currentIndex < 3) {
              inputRefs[currentIndex + 1].current.focus()
            }
          }
        }
      }
      

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (index < 3) {
        inputRefs[index + 1].current.focus();
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
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Transfer To <Text style={styles.highlight}>Joe Biden</Text>
        </Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recipientContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>Joe Biden</Text>
          <Text style={styles.recipientID}>23XR...56DD******</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.EnterAmount}>Enter 4-DIGIT UCPI PIN</Text>
      </View>
      {/* <Text style={styles.title}></Text> */}
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
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
    },
    backButton: {
      padding: 10,
    },
    arrow: {
      fontSize: 22,
      fontWeight: '400',
      fontFamily: 'Inter',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Inter',
      textAlign: 'center',
      flex: 1,
    },
    highlight: {
      color: '#FF6F50',
      fontWeight: '700',
      fontFamily: 'Inter',
    },
    closeButton: {
      padding: 10,
    },
    closeText: {
      fontSize: 22,
      fontWeight: '400',
      fontFamily: 'Inter',
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
      fontFamily: 'Inter',
      color: '#FF6F50',
    },
    recipientDetails: {
      flex: 1,
    },
    recipientName: {
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Inter',
    },
    recipientID: {
      fontSize: 13,
      color: '#A3A3A3',
      fontFamily: 'Inter',
    },
    eyeIcon: {
      fontSize: 20,
      color: '#FF6F50',
      fontFamily: 'Inter',
    },
    EnterAmount: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '400',
      fontFamily: 'Inter',
      color: 'black',
      marginTop: 50,
    },
    title: {
      fontSize: 16,
      fontWeight: '1200',
      fontFamily: 'Inter',
      marginBottom: 20,
    },
    pinContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly', // Evenly distribute space between the inputs
      width: '100%', // Ensure it takes the full width of the screen
      marginTop: 20,
      marginBottom: 20,
    },
    input: {
      width: 50, // Width of the underline
      height: 60, // Adjusted height for spacing
      borderBottomWidth: 2, // Only a bottom border
      borderColor: '#CCC', // Light gray color for the underline
      textAlign: 'center',
      fontSize: 24, // Larger font size for visibility
      fontWeight: '600',
      fontFamily: 'Inter',
      color: 'black',
      marginTop: 20,
      borderColor: 'black',  // Ensure text is visible
    },
    footerText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
      fontFamily: 'Inter',
      marginBottom: 60,
    },
  });
  
export default UCPIEnter;
