import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import Onboarding from "./src/screens/home/Onboarding";
import LoginScreen from "./src/screens/login";
import RegisterScreen from "./src/screens/signUp";
import DashboardScreen from "./src/screens/Dashboard";
import UCPIEnter from "./src/screens/EnterUCPI";
import OtpScreen from "./src/screens/home/OtpScreen";
import { TransferListScreen } from "./src/screens/TransferListScreen";
import TransferScreen from "./src/screens/Transferto";
import UCPIEnterPin from "./src/screens/EnterUCPI";
import PaySuccess from "./src/screens/PaySuccess";
import { RequestListScreen } from "./src/screens/RequestList";
import RequestScreen from "./src/screens/RequestTo";
import RequestSuccess from "./src/screens/RequestSuccess";
import CheckBalance from "./src/screens/CheckBalance";
import BalanceSuccess from "./src/screens/BalanceSuccess";
import ScheduleListScreen from "./src/screens/ScheduleList";
import ScheduleTransaction from "./src/screens/Schedule";
import UCPIPinScreen from "./src/screens/RecurringTransaction/UCPIPin";
import OTPEnter from "./src/screens/OTP";
import QRCodeScannerScreen from "./src/screens/ScanQrCodeScreen";
import PayScheduled from "./src/screens/PayScheduled";
import ProfileScreen from "./src/screens/ProfileScreen";
import {useAuth0, Auth0Provider} from 'react-native-auth0';
// Navigation Setup
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customButton}>{children}</View>
  </TouchableOpacity>
);

// Bottom Tab Navigator for Main App
function BottomTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Transfers") {
            iconName = "list";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF7F42",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
        }}
      >
        {(props) => <DashboardScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>

      <Tab.Screen
        name="QRCode"
        component={QRCodeScannerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="qrcode" size={30} color={color} />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

<Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: "Profile",
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account-circle" size={size} color={color} />
    ),
  }}
/>

    </Tab.Navigator>
  );
}

// Root Stack Navigator
function RootStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs">
        {(props) => <BottomTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="TransferListScreen">
        {(props) => <TransferListScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="TransferTo">
        {(props) => <TransferScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="UCPIpin">
        {(props) => <UCPIEnterPin {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="PaymentSuccess">
        {(props) => <PaySuccess {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>


      {/* ------RequestRoutes------------? */}

      <Stack.Screen name="RequestListScreen">
        {(props) => <RequestListScreen  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="RequestTo">
        {(props) => <RequestScreen  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="RequestSuccess">
        {(props) => <RequestSuccess {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      {/* ------BalanceRoutes------------? */}


      <Stack.Screen name="BalanceScreen">
        {(props) => <CheckBalance  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>


      <Stack.Screen name="BalanceSuccess">
        {(props) => <BalanceSuccess  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>


      {/* ------ScheduleRoutes------------? */}

      <Stack.Screen name="ScheduleScreen">
        {(props) => <ScheduleListScreen  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="ScheduleTransaction">
        {(props) => <ScheduleTransaction  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="UCPIPinScreen">
        {(props) => <UCPIPinScreen  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>


      <Stack.Screen name="OtpScreen">
        {(props) => <OTPEnter  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>


      <Stack.Screen name="PayScheduled">
        {(props) => <PayScheduled {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      {/* <Stack.Screen name="ScheduleTransactionScreen">
        {(props) => <ScheduleTransactionScreen  {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen> */}



    </Stack.Navigator>
  );
}

// Root Navigation
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Auth0Provider domain={"dev-7qhfwc75b7ce1ohr.us.auth0.com"} clientId={"yUtlnop5xegOUSXYNdf7H9Rj4bRizn9l"} authorizationEndpoint="https://dev-7qhfwc75b7ce1ohr.us.auth0.com/authorize">
    <NavigationContainer>
      {isLoggedIn ? (
        <RootStack setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
    </Auth0Provider>
  );
}

// Stack Navigator for Authentication Flow
function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={RegisterScreen} />
      <Stack.Screen name="Otp">
        {(props) => <OtpScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopWidth: 0,
  },
  customButtonContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#FF7F42",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#FF5733",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
