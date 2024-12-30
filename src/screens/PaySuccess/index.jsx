import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import success from '../../assets/success.png'

const PaySuccess = () => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.paymentText}>Payment Successful</Text>
        <Text style={styles.dateText}>23 DECEMBER 2024 at 03:00PM</Text>
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Image source={success} style={styles.iconImage} />
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.recipientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.recipientName}>Joe Biden</Text>
            <Text style={styles.recipientID}>23XR...56DD******</Text>
          </View>
          <Text style={styles.amountText}>$123.78</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.receiptText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FF7F42',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent:'center',
    height: 200
  },
  paymentText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    marginTop: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: -65,
    zIndex: 10,
  },
  iconImage: {
    width: 150, // Adjust based on your image size
    height: 150, // Adjust based on your image size
    resizeMode: 'contain', // Ensures the image scales correctly
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FF6F50',
  },
  details: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#333',
  },
  recipientID: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#A3A3A3',
    marginTop: 3,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#333',
  },
  receiptText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FF6F50',
    textAlign: 'center',
    marginTop: 15,
  },
})

export default PaySuccess
