import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const ScheduleTransactionScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Schedule Transaction to <Text style={styles.highlight}>Joe Biden</Text>
        </Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Recipient Details */}
      <View style={styles.recipientContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>Joe Biden</Text>
        </View>
      </View>

      {/* UCPI ID Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Recipients UCPI ID</Text>
        <Text style={styles.detailValue}>23XR56DDhu79HJBK</Text>
      </View>

      {/* Date Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date</Text>
        <Text style={styles.detailSubLabel}>Date when the transaction need to be initiated</Text>
        <TextInput
          style={styles.inputField}
          value="24/08/2025"
          editable={false}
        />
      </View>

      {/* Time Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Time</Text>
        <Text style={styles.detailSubLabel}>Time when the transaction need to be initiated</Text>
        <TextInput
          style={styles.inputField}
          value="04:00 PM"
          editable={false}
        />
      </View>

      {/* Amount Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amount</Text>
        <Text style={styles.detailSubLabel}>Enter a specified amount that needs to be transferred</Text>
        <TextInput
          style={styles.inputField}
          value="$999999.999"
          editable={false}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.scheduledButton}>
          <Text style={styles.scheduledButtonText}>Scheduled Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.repeatButton} 
        onPress={() => navigation.navigate('UCPIPinScreen')}
        >
          <Text style={styles.repeatButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
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
    justifyContent: 'center',
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#333',
  },
  detailRow: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FF6F50',
  },
  detailSubLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#A3A3A3',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingVertical: 5,
  },
  inputField: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingVertical: 5,
  },
  buttonsContainer: {
    marginTop: 30,
  },
  scheduledButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  scheduledButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  repeatButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  repeatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FF6F50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
})

export default ScheduleTransactionScreen;
