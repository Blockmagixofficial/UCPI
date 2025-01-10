import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import success from "../../assets/success.png";

const PaySuccess = ({ route }) => {
  const { ucpi, FullName, amount } = route.params;

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}`;
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const shareReceipt = async () => {
    const message = `Payment Receipt:\n\nRecipient: ${FullName}\nUCPI ID: ${ucpi}\nAmount: $${amount}\n\nDate: ${formattedDate} at ${formattedTime}\n\nShared via Payment App.`;

    try {
      // WhatsApp-specific sharing
      const whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}`;
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: whatsappURL,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "WhatsApp is not installed or something went wrong while sharing."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.paymentText}>Payment Successful</Text>
        <Text style={styles.dateText}>
          {formattedDate} at {formattedTime}
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
            <Text style={styles.avatarText}>{FullName[0]}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.recipientName}>{FullName}</Text>
            <Text style={styles.recipientID}>{ucpi}</Text>
          </View>
          <Text style={styles.amountText}>${amount}</Text>
        </View>
        <TouchableOpacity onPress={shareReceipt}>
          <Text style={styles.receiptText}>Share Receipt on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FF7F42",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  paymentText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    marginTop: 5,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: -65,
    zIndex: 10,
  },
  iconImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE8D1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6F50",
  },
  details: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  recipientID: {
    fontSize: 13,
    fontWeight: "400",
    color: "#A3A3A3",
    marginTop: 3,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  receiptText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6F50",
    textAlign: "center",
    marginTop: 15,
  },
});

export default PaySuccess;
