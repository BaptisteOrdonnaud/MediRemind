import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/TemplateImage.png')}/>
      <Text>MediReminder</Text>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}>
        <Text style={styles.textButton}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSignUp} activeOpacity={0.8}>
        <Text style={styles.textButton}>Inscription</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EFFF',
    alignItems: 'center',
  },
  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
  buttonSignUp: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});