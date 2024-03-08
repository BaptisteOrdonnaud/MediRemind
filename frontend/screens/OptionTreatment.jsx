import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OPtionTreatmentScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
     <Text>Option de traitement</Text>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('TreatmentTime')}>
        <Text style={styles.textButton}>Durée du traitement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('MedicamentStock')}>
        <Text style={styles.textButton}>Rappel de renouvellement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('TakingInstruction')}>
        <Text style={styles.textButton}>Ajouter des instructions ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('TabNavigator')}>
        <Text style={styles.textButton}>Enregistrer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
  },
  image: {
    marginTop: 30,
    marginBottom: 80,
  },
  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
});