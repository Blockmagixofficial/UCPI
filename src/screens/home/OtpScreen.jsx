import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native'

const { height } = Dimensions.get('window')

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = React.useRef([]) // Array of refs for each input box

  const handleOtpChange = (value, index) => {
    const otpArray = [...otp]
    otpArray[index] = value
    setOtp(otpArray)

    if (value && index < otp.length - 1) {
      // Automatically move to the next input
      inputRefs.current[index + 1].focus()
    }

    if (!value && index > 0) {
      // Automatically move to the previous input if backspace is pressed
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerifyOtp = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (otp.join('') === '1234') {
        Alert.alert('Success', 'OTP Verified Successfully')
      } else {
        setError('Invalid or Incorrect OTP. Try Again')
      }
    }, 2000)
  }

  const handleResendOtp = () => {
    setOtp(['', '', '', ''])
    setError('')
    inputRefs.current[0].focus() // Focus back to the first input
    Alert.alert('OTP Resent', 'A new OTP has been sent to your number.')
  }

  return (
    <View style={styles.container}>
      {/* Back Arrow and Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>OTP Verification</Text>
      </View>

      {/* Illustration */}
      <Image
        source={require('../../../assets/image.png')} // Replace with your image path
        style={styles.image}
      />

      {/* Instructions */}
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.description}>
        A 4 digit code has been sent to +91 9995380399
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Store the ref
            style={[
              styles.otpInput,
              error ? styles.otpInputError : null,
            ]}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Verify Button */}
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerifyOtp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify</Text>
        )}
      </TouchableOpacity>

      {/* Resend OTP */}
      <TouchableOpacity onPress={handleResendOtp}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center', // Centers content vertically
    height, // Ensures full screen height
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F41BB',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1, // Center the text while keeping the back button aligned
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#F6F6F6',
  },
  otpInputError: {
    borderColor: '#FF0000',
    backgroundColor: '#FFEDED',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  verifyButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#1F41BB', // Updated color
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendText: {
    fontSize: 14,
    color: '#1F41BB', // Updated color
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default OtpScreen
