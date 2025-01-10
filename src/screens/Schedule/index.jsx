import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ScheduleTransaction = ({ navigation, route }) => {
  const { ucpi, FullName, name } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [amount, setAmount] = useState("");

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    const updatedDate = new Date(selectedDate);
    updatedDate.setHours(time.getHours());
    updatedDate.setMinutes(time.getMinutes());
    setSelectedDate(updatedDate);
    setTimePickerVisibility(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Transfer To <Text style={styles.highlight}>{FullName}</Text>
        </Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="close" size={24} color="#FF6F50" />
        </TouchableOpacity>
      </View>

      {/* Recipient Details */}
      <View style={styles.recipientContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name}</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>{FullName}</Text>
        </View>
      </View>

      {/* UCPI ID Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Recipients UCPI ID</Text>
        <Text style={styles.detailValue}>{ucpi}</Text>
      </View>

      {/* Date Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date</Text>
        <Text style={styles.detailSubLabel}>
          Date when the transaction needs to be initiated
        </Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={styles.inputText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
      </View>

      {/* Time Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Time</Text>
        <Text style={styles.detailSubLabel}>
          Time when the transaction needs to be initiated
        </Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setTimePickerVisibility(true)}
        >
          <Text style={styles.inputText}>{formatTime(selectedDate)}</Text>
        </TouchableOpacity>
      </View>

      {/* Amount Section */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amount</Text>
        <Text style={styles.detailSubLabel}>
          Enter the specified amount that needs to be transferred
        </Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          placeholder="$0.00"
          value={amount}
          onChangeText={setAmount} // Update amount dynamically
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.repeatButton}
          onPress={() =>
            navigation.navigate("UCPIPinScreen", {
              FullName,
              ucpi,
              amount,
              name,
              selectedDate: formatDate(selectedDate),
              selectedTime: formatTime(selectedDate),
            })
          }
        >
          <Text style={styles.repeatButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  highlight: {
    color: "#FF6F50",
    fontWeight: "700",
  },
  closeButton: {
    padding: 10,
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
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
    justifyContent: "center",
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  detailRow: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6F50",
  },
  detailSubLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "#A3A3A3",
    marginBottom: 5,
  },
  inputField: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    borderBottomWidth: 1,
    borderColor: "#CCC",
    paddingVertical: 5,
  },
  inputText: {
    fontSize: 14,
    color: "#333",
  },
  buttonsContainer: {
    marginTop: 30,
  },
  repeatButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  repeatButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ScheduleTransaction;
