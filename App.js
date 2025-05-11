import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions, LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import Dashboard from './screens/Dashboard';
import AlertDetails from './screens/AlertDetails';
import Logs from './screens/Logs';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import EditPassword from './screens/EditPassword';
import { ThemeProvider, useTheme } from './ThemeContext';

// Ignore specific warnings
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);

// Set up global notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

const MainAppNavigator = ({ route }) => {
  const { isDarkTheme } = useTheme();
  const { userId } = route.params || {};

  console.log('MainAppNavigator - Received userId:', userId);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current }) => ({ cardStyle: { opacity: current.progress } }),
        headerStyle: { backgroundColor: isDarkTheme ? '#1B3C87' : '#4CAF50' },
        headerTintColor: isDarkTheme ? '#ECEFF1' : '#FFFFFF',
        headerBackTitleVisible: false,
      }}
      initialRouteName="Dashboard"
    >
      <Stack.Group>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'IDS Dashboard' }}
          initialParams={{ userId }}
        />
        <Stack.Screen
          name="AlertDetails"
          component={AlertDetails}
          options={{ title: 'Alert Details' }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="Logs"
          component={Logs}
          options={{ title: 'Attack Logs' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
          initialParams={{ userId }}
        />
        <Stack.Screen
          name="EditPassword"
          component={EditPassword}
          options={{ title: 'Edit Password' }}
          initialParams={{ userId }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(null);
  const navigationRef = useRef();

  // Request notification permissions and set up tap handler
  useEffect(() => {
    async function setupNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log('Notification permissions denied');
          return;
        }
      }

      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        const { alertId, screen } = response.notification.request.content.data;
        if (screen === 'AlertDetails' && navigationRef.current && alertId) {
          navigationRef.current.navigate('MainApp', {
            screen: 'AlertDetails',
            params: { alertId },
          });
        }
      });

      return () => subscription.remove();
    }

    setupNotifications();
  }, []);

  // Font loading
  useEffect(() => {
    async function loadFonts() {
      try {
        console.log('Loading fonts...');
        await Font.loadAsync({
          'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        console.log('Fonts loaded successfully');
        setFontsLoaded(true);
      } catch (error) {
        console.log('Font loading error details:', error);
        setFontError(error.message || 'Unknown font loading error');
      }
    }
    loadFonts();
  }, []);

  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEFF1' }}>
        <Text style={{ color: '#1B3C87' }}>Font Loading Error: {fontError}</Text>
        <Text style={{ color: '#1B3C87' }}>Ensure assets/fonts/ contains all .ttf files and restart Metro.</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECEFF1' }}>
        <Text style={{ color: '#1B3C87' }}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen
            name="MainApp"
            component={MainAppNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}