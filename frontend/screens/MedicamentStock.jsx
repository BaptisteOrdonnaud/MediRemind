import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';

export default function MedicamentStockScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
     <Text>Combien il vous reste de boite</Text>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('ReassortDrugs')}>
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