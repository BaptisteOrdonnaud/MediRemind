import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home.jsx';
import LoginScreen from './screens/Login.jsx';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
 return (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName = '';

      if (route.name === 'home') {
        iconName = 'location-arrow';
      } else if (route.name === 'traitement') {
        iconName = 'map-pin';
      }

      return <FontAwesome name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#ec6e5b',
    tabBarInactiveTintColor: '#335561',
    headerShown: false,
  })}>
    <Tab.Screen name="Home" component={HomeScreen} />

     <Tab.Screen name="Places" component={PlacesScreen} />
  </Tab.Navigator>
);
}

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="TabNavigator" component={TabNavigator} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

