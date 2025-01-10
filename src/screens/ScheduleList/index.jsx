import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const transactionData = [
  {
    id: "1",
    name: "K",
    FullName: "Ketan",
    ucpi: "23XR...56DD",
    amount: "$1000",
    status: "Successful",
    date: "23/12/2023",
  },
  {
    id: "2",
    name: "A",
    FullName: "Arushi",
    ucpi: "yu56...WWWW",
    amount: "$1000",
    status: "Successful",
    date: "23/12/2023",
  },
  {
    id: "3",
    name: "R",
    FullName: "Radhika",
    ucpi: "23XR...56DD",
    amount: "$1000",
    status: "Failed",
    date: "23/12/2023",
  },
  {
    id: "4",
    name: "H",
    FullName: "Harry",
    ucpi: "23XR...56DD",
    amount: "$1000",
    status: "Successful",
    date: "23/12/2023",
  },
];

export default function TransferListScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const filteredData = transactionData.filter((item) =>
    item.ucpi.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#FFBB7D", "#EE7F18"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Transactions</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#8E8E8E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search / Enter UCPI ID"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter" size={24} color="#F77A0C" />
        </TouchableOpacity>
      </View>

      {/* Recent Transactions Section */}
      <Text style={styles.sectionTitle}>Recent Scheduled Transactions</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ScheduleTransaction", {
                id: item.id,
                name: item.name,
                FullName: item.FullName,
                ucpi: item.ucpi,
                status: item.status,
                date: item.date,
                time: item.time,
              })
            }
          >
            <View style={styles.listItem}>
              {/* Avatar */}
              <View
                style={[
                  styles.avatar,
                  { borderColor: getStatusColor(item.status) },
                ]}
              >
                <Text
                  style={[
                    styles.avatarText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.name}
                </Text>
              </View>

              {/* Details */}
              <View style={styles.details}>
                <Text style={styles.ucpi}>{item.ucpi}</Text>
                <Text style={styles.transactionDate}>
                  {item.date} {item.time}
                </Text>
              </View>

              {/* Status and Edit Button */}
              <View style={styles.actionContainer}>
                <Text
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <LinearGradient
          colors={["#FF8B50", "#EE7F18"]}
          style={styles.floatingButtonGradient}
        >
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "Scheduled":
      return "#F7B731"; // Yellow
    case "Successful":
      return "#28A745"; // Green
    case "Failed":
      return "#DC3545"; // Red
    default:
      return "#000";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 35,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  ucpi: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  transactionDate: {
    fontSize: 12,
    color: "#888",
  },
  actionContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F77A0C",
  },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
  },
  floatingButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
