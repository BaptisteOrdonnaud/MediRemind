import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TakingInstructionScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
     <Text>Instruction complaimentaire de prise</Text>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('OptionTreatment')}>
        <Text style={styles.textButton}>Suivant</Text>
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