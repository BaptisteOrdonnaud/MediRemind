import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';


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
import AddDrugsScreen from './screens/AddDrugs-part1.jsx';
import AddDrugsRestScreen from './screens/AddDrugs-part2.jsx';
import FrequenceScreen from './screens/frequence.jsx'
import DoseHoursScreen from './screens/DoseHours.jsx';
import OPtionTreatmentScreen from './screens/OptionTreatment.jsx';
import TreatmentTimeScreen from './screens/TreatmentTime.jsx';
import MedicamentStockScreen from './screens/MedicamentStock.jsx';
import ReassortDrugsScreen from './screens/ReassortDrugs.jsx';
import TakingInstructionScreen from './screens/TakingInstruction.jsx';



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
          iconName = 'pills';
        } else if (route.name === 'Liste') {
          iconName = 'list'
        } else if (route.name === 'Map') {
          iconName = 'map'
        }


        return <FontAwesomeIcon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#7368bf',
      tabBarInactiveTintColor: '#E1DFFF',
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
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignUpBis" component={SignUpBisScreen} />
        <Stack.Screen name="AddDrugs-part1" component={AddDrugsScreen} />
        <Stack.Screen name="AddDrugs-part2" component={AddDrugsRestScreen} />
        <Stack.Screen name="Frequence" component={FrequenceScreen} />
        <Stack.Screen name="DoseHours" component={DoseHoursScreen} />
        <Stack.Screen name="OptionTreatment" component={OPtionTreatmentScreen} />
        <Stack.Screen name="TreatmentTime" component={TreatmentTimeScreen} />
        <Stack.Screen name="MedicamentStock" component={MedicamentStockScreen} />
        <Stack.Screen name="ReassortDrugs" component={ReassortDrugsScreen} />
        <Stack.Screen name="TakingInstruction" component={TakingInstructionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

