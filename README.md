For project demo
https://drive.google.com/file/d/1kB4S-8Uh3YztUxJZIUQFK9qxRl-QC0LJ/view?usp=sharing

Below is the updated README.md content for your AutoGuard Alert System project, formatted as plain text that you can copy and paste directly into your GitHub repository's README file. It reflects the latest updates and follows the structure you provided.

AutoGuard Alert System

**Project Idea**
Concept: AutoGuard Alert System is a mobile app designed to monitor and alert users about security threats in connected vehicles, focusing on issues like CAN bus intrusions, unauthorized Wi-Fi access, and GPS spoofing.
**Features:**
Real-time threat alerts with a user-friendly interface.
Detailed alert information, historical event logs, and customizable settings (theme, user profile management).
Secure user authentication with email/password, including signup, sign-in, and password editing capabilities.
Push notifications for immediate alert awareness.
Light/dark theme toggle for improved user experience.
**Purpose:**
Deliver real-time security alerts to users.
Facilitate investigation of alerts and analysis of historical logs.
Provide user-configurable settings for a personalized experience.
Target Audience: Vehicle owners, fleet managers, and cybersecurity researchers interested in vehicle security.
Prototype (Screens and Interactions)
**Screens:**
*SignIn*: Email/password input fields with a toggleable password visibility eye icon, "Sign Up" link, and a login button. Validates credentials against Firebase Realtime Database and navigates to Dashboard on success.
*SignUp*: Name, email, and password input fields with a toggleable password visibility eye icon, and a signup button. Creates a new user in Firebase and navigates to SignIn.
*Dashboard*: Displays current alerts in a FlatList, with buttons to navigate to Logs and Settings. Alerts link to AlertDetails when tapped or triggered via notifications. Includes a delete button for each alert.
*AlertDetails*: Shows the selected alert’s message, severity, and ID, with a back button to return to Dashboard. Fetches data from Firebase using the alertId.
*Logs*: Placeholder screen for listing past security events, with a back button to Dashboard (currently static, awaiting log data implementation).
*Settings*: Displays user profile info (name, email) and a theme toggle switch for light/dark mode. Includes a button to navigate to EditPassword, with a back button to Dashboard.
*EditPassword*: Allows users to update their password with current and new password fields (toggleable visibility via eye icon). Validates and updates the password in Firebase, then logs the user out by navigating to SignIn.
Navigation: Uses @react-navigation/stack for navigation. Flow: SignIn → SignUp (optional) → Dashboard → AlertDetails/Logs/Settings → EditPassword → SignIn (after password update). Notifications can navigate to AlertDetails from anywhere.
Screenshots: UI elements include headers (Montserrat-Bold), buttons (AlertButton with dynamic colors), lists (FlatList for alerts), and inputs (with eye icons for passwords). Navigation setup is defined in App.js with a Stack.Navigator.
**Project Colors**
Primary: #1B3C87 (deep blue) – Headers, buttons, labels, and default AlertButton color.
Secondary: #F9602E (orange-red) – Error messages, high-severity alerts, and AlertButton for high-severity alerts.
Neutral: #ECEFF1 (light gray) – Background for light theme.
Dark Mode Background: #1B3C87 (deep blue) – Background for dark theme.
Accent: #4CAF50 (green) – Low-severity alerts, navigation buttons, and "Sign Up" link.
Usage: Consistently applied across screens:
SignIn/SignUp errors in #F9602E.
Dashboard alerts in #F9602E (high severity) or #4CAF50 (low severity).
Background switches between #ECEFF1 (light) and #1B3C87 (dark) based on theme.
Text colors adapt to theme: #1B3C87 (light mode) or #ECEFF1 (dark mode).
**Project Fonts**
Title: Montserrat-Bold – Headers (e.g., "IDS Dashboard").
Header: Montserrat-Regular – Subheaders (e.g., "Current Alerts").
Regular: Roboto-Regular – Body text, labels, and input fields.
Bold: Roboto-Bold – Button text, emphasized text (e.g., AlertButton text).
Storage: Fonts are stored in assets/fonts/ (e.g., Montserrat-Bold.ttf, Montserrat-Regular.ttf, Roboto-Regular.ttf, Roboto-Bold.ttf).
Loading: Managed in App.js using expo-font. Displays a "Loading Fonts..." message until fonts are loaded, or an error message if loading fails.
**Custom Buttons**
Component: AlertButton in components/AlertButton.js.
Features:
Props: title, onPress, style.
Dynamic Colors: Uses #1B3C87 for default buttons (e.g., login/signup), #4CAF50 for navigation buttons (e.g., "Back" in Settings).
Consistent Styling: White text (#FFFFFF), Roboto-Bold font, rounded corners (borderRadius: 5).
**Usage:**
SignIn/SignUp: "Login" and "Sign Up" buttons.
Dashboard: Navigation buttons for "View Logs" and "Settings".
AlertDetails/Logs/Settings/EditPassword: "Back" buttons.
Storage: Located in the components/ folder.
Initial Screens (JSX with States)
SignIn (screens/SignIn.js):
States: error (string for validation errors).
Functionality: Validates email/password against Firebase (users node), navigates to Dashboard with userId on success.
UI: Email/password inputs with toggleable visibility (eye icon), error messages in #F9602E, and a "Sign Up" link.
SignUp (screens/SignUp.js):
States: error (string for validation errors).
Functionality: Creates a new user in Firebase (users node) and navigates to SignIn.
UI: Name/email/password inputs with toggleable visibility, error messages in #F9602E.
Dashboard (screens/Dashboard.js):
States: alerts (object of alerts fetched from Firebase), loading (boolean for fetch status).
Functionality: Fetches alerts from Firebase (alerts node), displays them in a FlatList, schedules notifications, and allows deletion. Navigates to AlertDetails/Logs/Settings.
UI: Alert list with message/severity, delete buttons (#FF4444), and navigation buttons.
AlertDetails (screens/AlertDetails.js):
States: alert (object with alert data), loading (boolean for fetch status).
Functionality: Fetches alert data from Firebase using alertId (via route params), displays message, severity, and ID.
UI: Simple text display with theme-based styling.
Logs (screens/Logs.js):
States: None (currently static).
Functionality: Placeholder for displaying past events, with a back button to Dashboard.
UI: Static title and back button.
Settings (screens/Settings.js):
States: userData (object with user info), loading (boolean for fetch status).
Functionality: Fetches user info from Firebase (users/${userId}), displays name/email, and provides a theme toggle. Navigates to EditPassword.
UI: Text fields, theme toggle switch, and navigation buttons.
EditPassword (screens/EditPassword.js):
States: error (string for validation errors).
Functionality: Validates current password, updates new password in Firebase, and logs the user out by navigating to SignIn.
UI: Password inputs with toggleable visibility, error messages, and a back button.
Storage: All screens are stored in the screens/ folder.
Navigation: Defined in App.js using Stack.Navigator, starting at SignIn. Includes nested navigation for the main app (Dashboard → AlertDetails/Logs/Settings/EditPassword).


**Project State Summary**

*A vehicle security app with 7 screens (SignIn, SignUp, Dashboard, AlertDetails, Logs, Settings, EditPassword), advanced navigation, and a consistent design.
Uses a defined color scheme (#1B3C87, #F9602E, #ECEFF1, #4CAF50) and fonts (Montserrat, Roboto), with light/dark theme support.
Features a custom AlertButton for dynamic interactions and a reusable Form component with password visibility toggling.
Integrates Firebase Realtime Database for user authentication and alert storage, with push notifications via expo-notifications.
Screens are fully implemented with states for SignIn, SignUp, Dashboard, AlertDetails, Settings, and EditPassword, stored in appropriate folders.
Additional features include theme toggling, secure password updates with logout, and notification-driven navigation.*

