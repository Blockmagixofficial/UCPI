import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import success from '../../assets/success.png';

const RequestSuccess = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const { recipientName, recipientID, amount, avatarInitial } = route.params;

  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => setIsLoading(false), 2000);

    // Generate current date and time
    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setCurrentDate(date);
    setCurrentTime(time);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F42" />
        <Text style={styles.loadingText}>Processing Payment...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.paymentText}>Request Successful</Text>
        <Text style={styles.dateText}>
          {currentDate} at {currentTime}
        </Text>
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Image source={success} style={styles.iconImage} />
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.recipientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitial}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.recipientName}>{recipientName}</Text>
            <Text style={styles.recipientID}>{recipientID}</Text>
          </View>
          <Text style={styles.amountText}>${amount}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.receiptText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#555',
  },
  header: {
    backgroundColor: '#FF7F42',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
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
});

export default RequestSuccess;
