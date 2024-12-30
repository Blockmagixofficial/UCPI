import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-paper";


const transactions = [

  { id: "1", title: "Ashwini", amount: "$123", status: "Paypal", time: "1 hour ago" },
  { id: "2", title: "Ketan", amount: "$123", status: "Paypal", time: "2 hour ago" },
  { id: "3", title: "Shruti", amount: "$123", status: "Paypal", time: "3 hour ago" },
  { id: "4", title: "Shristi", amount: "$123", status: "Paypal", time: "4 hour ago" },

];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Naveen</Text>
        <Text style={styles.timestamp}>1 hour ago</Text>
        <TouchableOpacity style={styles.notificationIcon}>

        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>2</Text>
        </View>
      </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
      <Image
  source={{
    uri: "data:image/png;base64,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"}}
  style={styles.illustration}
/>

      </View>

      {/* Payment Options */}
      <View>
  <Text style={styles.sectionTitle}>Payment Options</Text>
  <View style={styles.paymentOptions}>
    <PaymentOption title="Pay" image={require('../../assets/refund.png')}
 />
    <PaymentOption title="Request" image={require('../../assets/receive.png')} />
    <PaymentOption title="Balance" image={require('../../assets/balance.png')} />
    <PaymentOption title="Schedule" image={require('../../assets/time.png')} />
  </View>
</View>


      {/* Transactions */}
      <View style={styles.transactions}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        <Text style={styles.seeAll}>See All</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
         <Avatar.Text size={40} label={item.title.charAt(0).toUpperCase()} 
           style={{ backgroundColor: "#FF8B50" , color:"white"}}
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
    </View>
  );
}

function PaymentOption({ title, image }) {
    return (
      <TouchableOpacity style={styles.paymentOption}>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timestamp: {
    color: "#8E8E8E",
  },
  notificationIcon: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F77A0C",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
  illustrationContainer: {
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,


  },
  paymentOption: {
    alignItems: "center",
  },
  paymentOptionText: {
    marginTop: 5,
    color: "#8E8E8E",
  },
  transactions: {
    marginTop: 20,
  },
  seeAll: {
    color: "#F77A0C",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionDetails: {
    flex: 1,
    marginHorizontal: 10,
  },
  transactionTitle: {
    fontWeight: "bold",
  },
  transactionTime: {
    color: "#8E8E8E",
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  transactionAmountText: {
    fontWeight: "bold",
  },
  transactionMethod: {
    color: "#8E8E8E",
  },

  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  paymentOption: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  paymentOptionIconContainer: {
    backgroundColor: "#F77A0C",
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentOptionImage: {
    width: 30, // Adjust to fit your image dimensions
    height: 30,
  },
  paymentOptionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#8E8E8E",
    textAlign: "center",
  },
});
