import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import success from "../../assets/success.png";

const BalanceSuccess = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setCurrentDate(date);
    setCurrentTime(time);
  }, []);
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.paymentText}>
          Account Balance fetched successfully
        </Text>
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
            <Text style={styles.avatarText}>N</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.recipientName}>Naveen</Text>
            <Text style={styles.recipientID}>23XR...56DD******</Text>
          </View>
        </View>

      </View>

      {/* Available Amount Section */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountTitle}>Available Amount</Text>
        <Text style={styles.amountText}>$123.78</Text>
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

    color: "black",
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
  receiptText: {
    fontSize: 14,
    fontWeight: "600",

    color: "#FF6F50",
    textAlign: "center",
    marginTop: 15,
  },
  amountContainer: {
    flex: 1,
    marginTop: 15,

    alignItems: "center",
  },
  amountTitle: {
    fontSize: 18,
    fontWeight: "600",

    color: "#333",
    marginBottom: 5,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "900",
    color: "black",
  },
});

export default BalanceSuccess;
