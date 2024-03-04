import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function SignUpScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Inscription</Text>
      <TouchableOpacity style={styles.buttonSignUp} activeOpacity={0.8} onPress={() => navigation.navigate('SignUpBis')}>
        <Text style={styles.textButton}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignUp: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },
});
