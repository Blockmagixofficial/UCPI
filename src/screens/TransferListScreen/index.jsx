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
import LinearGradient from "react-native-linear-gradient";

const transferData = [
  { id: "1", name: "P", ucpi: "23XR...56DD", amount: "$1000", status: "Successful", date: "23/12/2023" },
  { id: "2", name: "M", ucpi: "yu56...WWWW", amount: "$1000", status: "Successful", date: "23/12/2023" },
  { id: "3", name: "R", ucpi: "23XR...56DD", amount: "$1000", status: "Failed", date: "23/12/2023" },
  { id: "4", name: "H", ucpi: "23XR...56DD", amount: "$1000", status: "Successful", date: "23/12/2023" },
];

export function TransferListScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const filteredData = transferData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#FFBB7D", "#EE7F18"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer To</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={20} color="#8E8E8E" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search / Enter UCPI ID"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity>
          <MaterialCommunityIcons name="qrcode-scan" size={20} color="#F77A0C" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TransferTo", {
                id: item.id,
                name: item.name,
                ucpi: item.ucpi,
                amount: item.amount,
                status: item.status,
                date: item.date,
              })
            }
          >
            <View style={styles.listItem}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.ucpi}>{item.ucpi}</Text>
                <Text style={styles.transaction}>
                  {item.amount} -{" "}
                  <Text
                    style={{
                      color: item.status === "Successful" ? "green" : "red",
                    }}
                  >
                    {item.status}
                  </Text>
                </Text>
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />


      {/* Floating Button */}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 35,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5, // Slight shadow for header
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  iconButton: { padding: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 0.7,
    borderColor: "#e0e0e0",
    backgroundColor: "#fdfdfd",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FF8B50",
    borderWidth: 2,
    elevation: 2,
  },
  avatarText: { color: "#FF8B50", fontWeight: "bold", fontSize: 18 },
  details: { flex: 1, marginLeft: 20 },
  ucpi: { fontWeight: "bold", fontSize: 15, marginBottom: 5 },
  transaction: { color: "#8E8E8E", fontSize: 14 },
  date: { color: "#8E8E8E", fontSize: 12 },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    elevation: 8,
  },
  floatingButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32.5,
  },
});

