import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";
import * as IntentLauncher from "expo-intent-launcher";

const ProfileScreen = ({ navigation }) => {
  const ucpi = "UCPI1234567890";
  const fullName = "Naveen Sharma";
  const phoneNumber = "+91 98765 43210";

  const shareQRCode = async () => {
    const message = `Share my UCPI ID:\n\nName: ${fullName}\nUCPI ID: ${ucpi}\nPhone: ${phoneNumber}\n\nShared via Payment App.`;

    try {
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="pencil" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{fullName[0]}</Text>
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.phone}>{phoneNumber}</Text>
      </View>

      {/* UCPI ID and QR Code Section */}
      <View style={styles.qrContainer}>
        <Text style={styles.ucpiLabel}>Your UCPI ID</Text>
        <View style={styles.qrCard}>
          <QRCode value={ucpi} size={120} />
          <Text style={styles.ucpiValue}>{ucpi}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={shareQRCode}>
          <Text style={styles.shareButtonText}>Share QR Code on WhatsApp</Text>
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
    backgroundColor: "#EE7F18",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,

    paddingVertical: 30,
  
    height: 100,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFE8D1",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#EE7F18",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  ucpiLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  qrCard: {
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  ucpiValue: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  shareButton: {
    backgroundColor: "#EE7F18",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
  },
  shareButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default ProfileScreen;
