import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import cancel from "../assets/cancel.png";

const Keypad = ({ onPress }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'Cancel'];

  return (
    <View style={styles.keypadContainer}>
      {keys.map((key) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.keypadButton,
            key === 'Cancel' && styles.cancelButton,
          ]}
          onPress={() => onPress(key)}
        >
          {key === 'Cancel' ? (
            <Image
              source={cancel}
              style={styles.cancelImage}
            />
          ) : (
            <Text style={styles.keypadButtonText}>
              {key}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keypadButton: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6F50',
  },
  cancelImage: {
    width: 24,
    height: 24,
    // transform: [{ rotate: '360deg' }],
  },
  keypadButtonText: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
});

export default Keypad;
