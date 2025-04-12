Link for expo Go 
https://snack.expo.dev/@mariamashrafattia/autoguardalertsystemnav

1. Project Idea
•	Concept: AutoGuard Alert System is a mobile app for monitoring and alerting users about security threats in connected vehicles, such as CAN bus intrusions, unauthorized Wi-Fi access, and GPS spoofing.
•	Features: 
o	Real-time threat alerts with a user-friendly interface.
o	Alert details, event logs, and customizable monitoring settings (CAN, Wi-Fi, Bluetooth).
o	Secure login system for user authentication.
•	Purpose: 
o	Provide real-time security alerts.
o	Enable alert investigation and historical log analysis.
o	Allow configuration of monitoring preferences.
•	Target Audience: Vehicle owners, fleet managers, and cybersecurity researchers.
2. Prototype (Screens and Interactions)
•	Screens: 
o	Login: Email/password input, "Forgot Password?" link, and login button. Validates credentials and navigates to Dashboard on success.
 
o	Dashboard: Displays current alerts (FlatList), with buttons for Logs and Settings. Alerts link to AlertDetails.
 
o	AlertDetails: Shows selected alert’s message and severity, with a button to return to Dashboard.
 
o	Logs: Lists past security events (FlatList), with a back button to Dashboard.
 
o	Settings: Toggle switches for monitoring (CAN, Wi-Fi, Bluetooth), with a back button to Dashboard.
 
•	Navigation: Uses @react-navigation/stack. Flow: Login → Dashboard → AlertDetails/Logs/Settings → Back to Dashboard.
•	Screenshots: Confirm UI elements (headers, buttons, lists) and navigation setup in App.js.
3. Project Colors
•	Primary: #1B3C87 (deep blue) – headers, buttons, labels.
•	Secondary: #F9602E (orange-red) – error messages, high-severity alerts.
•	Neutral: #ECEFF1 (light gray) – background.
•	Accent: #4CAF50 (green) – low-severity alerts, "Forgot Password?" link.
•	Usage: Consistent across screens (e.g., Login errors in #F9602E, Dashboard alerts in #F9602E/#4CAF50).
4. Project Fonts
•	Title: Montserrat-Bold – headers (e.g., "IDS Login").
•	Header: Montserrat-Regular – subheaders (e.g., "Current Alerts").
•	Regular: Roboto-Regular – body text, labels.
•	Bold: Roboto-Bold – button text, emphasized text.
•	Storage: Fonts in assets/fonts/ (Montserrat-Bold.ttf, etc.).
•	Loading: Handled in App.js with expo-font, displaying a loading message until fonts load.
5. Custom Buttons
•	Component: AlertButton in components/AlertButton.js.
•	Features: 
o	Props: title, onPress, style, severity.
o	Dynamic colors: #F9602E (high severity), #4CAF50 (low severity), #1B3C87 (default).
o	Consistent styling: White text, Roboto-Bold, rounded corners.
•	Usage: Login ("Login"), Dashboard (alerts, navigation), and back buttons in other screens.
•	Storage: In components/ folder.
6. Initial Screens (JSX with States)
•	Login (screens/Login.js): 
o	States: username, password, error.
o	Validates mock credentials, navigates to Dashboard.
•	Dashboard (screens/Dashboard.js): 
o	State: alerts (mock array).
o	Lists alerts, navigates to AlertDetails/Logs/Settings.
•	AlertDetails (screens/AlertDetails.js): 
o	No state; uses route.params for alert data.
o	Shows alert details, returns to Dashboard.
•	Logs (screens/Logs.js): 
o	No state; uses hardcoded logs.
o	Displays logs, returns to Dashboard.
•	Settings (screens/Settings.js): 
o	States: isCANEnabled, isWiFiEnabled, isBluetoothEnabled.
o	Toggles monitoring settings, returns to Dashboard.
•	Storage: All screens in screens/ folder.
•	Navigation: Defined in App.js with Stack.Navigator, starting at Login.
Project State Summary
•	A vehicle security app with 5 screens, basic navigation, and a consistent design.
•	Uses a defined color scheme (#1B3C87, #F9602E, #ECEFF1, #4CAF50) and fonts (Montserrat, Roboto).
•	Features a custom AlertButton for dynamic interactions.
•	Screens are fully implemented with states for Login, Dashboard, and Settings, stored in appropriate folders.

