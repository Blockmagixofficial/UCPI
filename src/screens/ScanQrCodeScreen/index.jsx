import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";

export default function QRCodeScannerScreen() {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned!", `Data: ${data}`, [
      {
        text: "OK",
        onPress: () => setScanned(false), // Reset scanning
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <RNCamera
        style={styles.camera}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        captureAudio={false} // Disable audio capture
        flashMode={RNCamera.Constants.FlashMode.auto} // Flash settings
      >
        {/* Overlay */}
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Scan QR Code</Text>
          </View>

          <View style={styles.scanAreaContainer}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanArea}>
              <View style={styles.borderTopLeft} />
              <View style={styles.borderTopRight} />
              <View style={styles.borderBottomLeft} />
              <View style={styles.borderBottomRight} />
            </View>
            <View style={styles.sideOverlay} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.instructionText}>
              Align the QR code within the frame to scan.
            </Text>
          </View>
        </View>
      </RNCamera>

      {/* Scan Again Button */}
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  scanAreaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  borderTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 5,
    backgroundColor: "#fff",
  },
  borderTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 5,
    backgroundColor: "#fff",
  },
  borderBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 5,
    backgroundColor: "#fff",
  },
  borderBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 5,
    backgroundColor: "#fff",
  },
  footer: {
    marginBottom: 50,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
  },
  button: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#FF5733",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
