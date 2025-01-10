import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QRCodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned!", `Data: ${data}`, [
      {
        text: "OK",
        onPress: () => setScanned(false), // Reset scanning
      },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        {/* Overlay */}
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Scan Any QR Code</Text>
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
              Position the QR code inside the frame to scan.
            </Text>
          </View>
        </View>
      </BarCodeScanner>

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
    marginBottom:150
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
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
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
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
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
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
    backgroundColor: "linear-gradient(to right, #FF5733, #FF8C00)",
    padding: 15,
    borderRadius: 50,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
