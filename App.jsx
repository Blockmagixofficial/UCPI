import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";

// Screens
import Onboarding from "./src/screens/home/Onboarding";
import LoginScreen from "./src/screens/login";
import RegisterScreen from "./src/screens/signUp";
import DashboardScreen from "./src/screens/Dashboard";
import UCPIEnter from "./src/screens/EnterUCPI";
import PaySuccess from "./src/screens/PaySuccess";
import QRCodeScannerScreen from "./src/screens/ScanQrCodeScreen";

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
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "TransferList") {
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
        component={DashboardScreen}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="."
        component={QRCodeScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="qrcode" size={30} color="#fff" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="TransferList"
        component={UCPIEnter}
        options={{
          title: "Transfers",
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator for Authentication Flow
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Root Navigation
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage user authentication state

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomTabs />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
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
