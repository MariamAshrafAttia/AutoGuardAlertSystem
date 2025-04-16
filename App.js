import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Dashboard from './screens/Dashboard';
import AlertDetails from './screens/AlertDetails';
import Logs from './screens/Logs';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current }) => ({ cardStyle: { opacity: current.progress } }),
      }}
    >
      <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#1B3C87' }, headerTintColor: '#FFFFFF', headerBackTitleVisible: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'IDS Dashboard' }} />
        <Stack.Screen name="AlertDetails" component={AlertDetails} options={{ title: 'Alert Details' }} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#FFFFFF', headerBackTitleVisible: false }}>
        <Stack.Screen name="Logs" component={Logs} options={{ title: 'Attack Logs' }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
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
        console.log('Loading fonts...'); // Debug log
        await Font.loadAsync({
          'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        console.log('Fonts loaded successfully'); // Debug log
        setFontsLoaded(true);
      } catch (error) {
        console.log('Font loading error details:', error); // Detailed error log
        setFontError(error.message);
      }
    }
    loadFonts();
  }, []);

  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Font Loading Error: {fontError}</Text>
        <Text>Check assets/fonts/ for missing files or typos.</Text>
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
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainAppNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}