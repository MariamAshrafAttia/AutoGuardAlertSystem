import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AlertDetails from './screens/AlertDetails';
import Logs from './screens/Logs';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

// Nested Navigator for the main app screens (Dashboard, AlertDetails, Logs, Settings)
const MainAppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Group for Dashboard-related screens */}
      <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#1B3C87' }, headerTintColor: '#FFFFFF' }}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'IDS Dashboard' }}
        />
        <Stack.Screen
          name="AlertDetails"
          component={AlertDetails}
          options={{ title: 'Alert Details' }}
        />
      </Stack.Group>

      {/* Group for utility screens (Logs, Settings) */}
      <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#FFFFFF' }}>
        <Stack.Screen
          name="Logs"
          component={Logs}
          options={{ title: 'Attack Logs' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(null);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        setFontError(error.message);
      }
    }
    loadFonts();
  }, []);

  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Font Loading Error: {fontError}</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen (outside the nested navigator) */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Hide header for Login screen
        />
        {/* Nested Navigator for the main app */}
        <Stack.Screen
          name="MainApp"
          component={MainAppNavigator}
          options={{ headerShown: false }} // Hide header for the nested navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}