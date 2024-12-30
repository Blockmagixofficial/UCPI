import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Onboarding from './src/screens/home/Onboarding';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/signUp';
import { TransferListScreen } from './src/screens/TransferListScreen';
import AddBankAccountScreen from './src/screens/AddBankAccount';
import DashboardScreen from './src/screens/Dashboard';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customButton}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Onboarding') {
              iconName = 'home';
            } else if (route.name === 'Login') {
              iconName = 'sign-in';
            } else if (route.name === 'Signup') {
              iconName = 'user-plus';
            } else if (route.name === 'TransferList') {
              iconName = 'list';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF5733',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: styles.tabBar,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Onboarding"
          component={DashboardScreen}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />
        <Tab.Screen
          name="."
          component={AddBankAccountScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="qrcode" size={30} color="#fff" />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
 
          }}
        />
        <Tab.Screen
          name="Signup"
          component={RegisterScreen}
          options={{
            title: 'Signup',
          }}
        />
        <Tab.Screen
          name="TransferList"
          component={TransferListScreen}
          options={{
            title: 'Transfers',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopWidth: 0,
  },
  customButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#FF5733',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
