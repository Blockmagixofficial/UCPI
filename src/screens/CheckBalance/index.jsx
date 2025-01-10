import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import Keypad from "../../components/keypad";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CheckBalance = ({ navigation }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = Array(4)
    .fill()
    .map(() => useRef(null));

  const handlePressNumber = (key) => {
    if (key === "Cancel") {
      // Find the last filled index and clear it
      const lastFilledIndex = pin.findIndex((digit) => digit === "") - 1;
      if (lastFilledIndex >= 0) {
        const newPin = [...pin];
        newPin[lastFilledIndex] = "";
        setPin(newPin);
      } else if (pin[3] !== "") {
        // If all digits are filled, delete the last digit
        const newPin = [...pin];
        newPin[3] = "";
        setPin(newPin);
      }
    } else if (/^\d+$/.test(key)) {
      // Handle numeric input
      const currentIndex = pin.findIndex((digit) => digit === "");
      if (currentIndex !== -1) {
        const newPin = [...pin];
        newPin[currentIndex] = key;
        setPin(newPin);
        if (currentIndex === 3) {
          validatePin(newPin);
        }
      }
    }
  };

  const validatePin = (enteredPin) => {
    if (enteredPin.join("") === "1234") {
      navigation.navigate("BalanceSuccess");
    } else {
      Alert.alert(
        "Invalid PIN",
        "The PIN you entered is incorrect. Please try again."
      );
      setPin(["", "", "", ""]);
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
        <Text style={styles.headerTitle}>Check Balance</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="close" size={24} color="#FF6F50" />
        </TouchableOpacity>
      </View>
      <View style={styles.recipientContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>Naveen</Text>
          <Text style={styles.recipientID}>23XR...56DD******</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.EnterAmount}>Enter 4-DIGIT UCPI PIN</Text>
      </View>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            editable={false} // Prevent the mobile keypad from opening
          />
        ))}
      </View>
      <Text style={styles.footerText}>
        UCPI PIN will keep your account secure
      </Text>

      <View style={{ marginTop: 50 }}>
        <Keypad onPress={handlePressNumber} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  closeButton: {
    padding: 10,
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 10,
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: "600",
    color: "#FF6F50",
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
  },
  recipientID: {
    fontSize: 13,
    color: "#A3A3A3",
  },
  eyeIcon: {
    fontSize: 20,
    color: "#FF6F50",
  },
  EnterAmount: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    color: "black",
    marginTop: 50,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 60,
    borderBottomWidth: 2,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  footerText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default CheckBalance;
