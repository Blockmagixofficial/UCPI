import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const AddBankAccountScreen = () => {
  const [banks, setBanks] = useState([]); // Store bank data
  const [filteredBanks, setFilteredBanks] = useState([]); // Filtered list for search
  const [search, setSearch] = useState(""); // Search term
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bank list
  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await axiosInstance.get("/user/getUserBankList");
        setBanks(response.data);
        setFilteredBanks(response.data); // Initialize filtered list
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch bank data.");
        setLoading(false);
      }
    };

    fetchBankData();
  }, []);

  // Search functionality
  const handleSearch = (text) => {
    setSearch(text);
    const filtered = banks.filter((bank) =>
      bank.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBanks(filtered);
  };

  // Render individual bank item
  const renderBankItem = ({ item }) => (
    <TouchableOpacity style={styles.bankItem}>
      <Image source={{ uri: item.logo }} style={styles.bankLogo} />
      <View>
        <Text style={styles.bankName}>{item.name}</Text>
        <Text style={styles.bankURL}>{item.url}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Bank Account</Text>
      <Text style={styles.subtitle}>
        Start your first transaction by linking a bank account
      </Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />

      {/* Bank List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF8C42" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filteredBanks}
          renderItem={renderBankItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBankAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
  },
  bankURL: {
    fontSize: 14,
    color: "#777",
  },
  button: {
    backgroundColor: "#FF8C42",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    textAlign: "center",
    color: "#FF8C42",
    fontSize: 16,
  },
  error: {
    textAlign: "center",
    color: "red",
  },
});
