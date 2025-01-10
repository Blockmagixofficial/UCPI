import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const sliderImages = [
  { id: "1", uri: "https://via.placeholder.com/400x150?text=Slide+1" },
  { id: "2", uri: "https://via.placeholder.com/400x150?text=Slide+2" },
  { id: "3", uri: "https://via.placeholder.com/400x150?text=Slide+3" },
];

const transactions = [
  {
    id: "1",
    title: "Ashwini",
    amount: "$123",
    status: "Paypal",
    time: "1 hour ago",
  },
  {
    id: "2",
    title: "Ketan",
    amount: "$123",
    status: "Paypal",
    time: "2 hours ago",
  },
  {
    id: "3",
    title: "Shruti",
    amount: "$123",
    status: "Paypal",
    time: "3 hours ago",
  },
  {
    id: "4",
    title: "Shristi",
    amount: "$123",
    status: "Paypal",
    time: "4 hours ago",
  },
];

export default function DashboardScreen({ navigation, setIsLoggedIn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollToOffset({
        offset: index * width,
        animated: true,
      });
    }
    setCurrentIndex(index);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Naveen</Text>
          <Text style={styles.timestamp}>Welcome back!</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.notificationButton}
          ></TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="bell" size={24} color="#F77A0C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon
              name="sign-out"
              size={24}
              color="#F77A0C"
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Slider */}
      <View style={styles.sliderContainer}>
        <FlatList
          data={sliderImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          ref={sliderRef}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.sliderImage} />
          )}
        />
        <View style={styles.pagination}>
          {sliderImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive,
              ]}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>
      </View>

      {/* Payment Options */}
      <View
        style={{
          paddingHorizontal: 15,
        }}
      >
        <Text style={styles.sectionTitle}>Payment Options</Text>
        <View style={styles.paymentOptions}>
          <PaymentOption
            title="Pay"
            image={require("../../assets/refund.png")}
            onPress={() => navigation.navigate("TransferListScreen")}
          />
          <PaymentOption
            title="Request"
            image={require("../../assets/receive.png")}
            onPress={() => navigation.navigate("RequestListScreen")}
          />
          <PaymentOption
            title="Balance"
            image={require("../../assets/balance.png")}
            onPress={() => navigation.navigate("BalanceScreen")}
          />
          <PaymentOption
            title="Schedule"
            image={require("../../assets/time.png")}
            onPress={() => navigation.navigate("ScheduleScreen")}
          />
        </View>
      </View>

      {/* Transactions */}
      <View style={styles.transactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Avatar.Text
                size={40}
                label={item.title.charAt(0).toUpperCase()}
                style={styles.avatar}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionTime}>{item.time}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={styles.transactionAmountText}>{item.amount}</Text>
                <Text style={styles.transactionMethod}>{item.status}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

function PaymentOption({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.paymentOption} onPress={onPress}>
      <View style={styles.paymentOptionIconContainer}>
        <Image source={image} style={styles.paymentOptionImage} />
      </View>
      <Text style={styles.paymentOptionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 0,

    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9", // Soft background color
    paddingHorizontal: 15, // Inner padding for left/right
    paddingVertical: 10, // Inner padding for top/bottom
    height: 80, // Fixed height for consistency
    elevation: 3, // Subtle shadow for depth
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    marginTop: 30, // Space from the top
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  timestamp: {
    color: "#666",
    fontSize: 14,
    marginTop: 5,
  },
  notificationButton: {
    marginRight: 15,
  },
  profileButton: {
    marginRight: 10,
    borderColor: "orange",
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
  },
  logoutIcon: {
    marginLeft: 10,
  },
  sliderContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  sliderImage: {
    width: width - 40,
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
    marginHorizontal: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "#F77A0C",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  paymentOption: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  paymentOptionIconContainer: {
    backgroundColor: "#F77A0C",
    borderRadius: 15,
    paddingHorizontal: 15,

    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOptionImage: {
    width: 30,
    height: 30,
  },
  paymentOptionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  transactions: {
    marginTop: 20,
    paddingHorizontal: 15,
    marginBottom:100
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    backgroundColor: "#FF8B50",
  },
  transactionDetails: {
    flex: 1,
    marginHorizontal: 10,
  },
  transactionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  transactionTime: {
    color: "#999",
    fontSize: 12,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  transactionAmountText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  transactionMethod: {
    color: "#999",
    fontSize: 12,
  },
});
