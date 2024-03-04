import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home.jsx';
import LoginScreen from './screens/Login.jsx';
import SignInScreen from './screens/SignIn.jsx';
import SignUpScreen from './screens/SignUp.jsx';
import SignUpBisScreen from './screens/SignUpBis.jsx'
import TreatmentScreen from './screens/Treatment.jsx';
import ListScreen from './screens/List.jsx';
import MapScreen from './screens/Map.jsx';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Traitement') {
          iconName = 'heart';
        } else if (route.name === 'Liste') {
          iconName = 'list'
        } else if (route.name === 'Map') {
          iconName = 'map'
        }


        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#7368bf',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Traitement" component={TreatmentScreen} />
      <Tab.Screen name="Liste" component={ListScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Tab.Screen name="SignIn" component={SignInScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="SignUpBis" component={SignUpBisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

