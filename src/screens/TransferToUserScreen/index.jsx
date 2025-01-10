import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export function TransferToUserScreen() {
  
  const [amount, setAmount] = useState("");

  const handleKeyPress = (key) => {
    if (key === "clear") {
      setAmount("");
    } else {
      setAmount((prev) => prev + key);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Transfer To <Text style={styles.highlightedText}>Joe Biden</Text>
        </Text>
        <TouchableOpacity>
          <Ionicons name="close-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Joe Biden</Text>
          <Text style={styles.userUCPI}>23XR...56DD******</Text>
        </View>
        <Text style={styles.selectText}>Tap to Select</Text>
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Keypad */}
      <View style={styles.keypad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "00"].map(
          (key, index) => (
            <TouchableOpacity
              key={index}
              style={styles.key}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          )
        )}
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="arrow-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  highlightedText: {
    color: "#F77A0C",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F77A0C",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F77A0C",
  },
  userDetails: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  userUCPI: {
    fontSize: 14,
    color: "#8E8E8E",
  },
  selectText: {
    fontSize: 14,
    color: "#F77A0C",
  },
  spacer: {
    flex: 1,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  key: {
    width: "28%",
    margin: "1%",
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  keyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  sendButton: {
    width: "28%",
    margin: "1%",
    paddingVertical: 15,
    backgroundColor: "#F77A0C",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});
