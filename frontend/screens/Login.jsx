import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';


export default function LoginScreen({ navigation }) {

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {
        width: windowWidth > 500 ? "70%" : "90%",
        height: windowHeight > 600 ? "60%" : "90",
      }]}>
        <SvgUri
          style={styles.image}
          width="250"
          height="250"
          source={require('../assets/reminder.svg')}
        />
        <Text style={styles.title}>MediRemind</Text>
        <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.textButton}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignUp} activeOpacity={0.8} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textButton}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  image: {
    marginTop: '20%',
    marginBottom: '20%',
  },
  title: {
    fontWeight: '800',
    fontSize: 36,
    color: '#36373E',
    marginBottom: '10%',
  },
  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 12,
    height: '6%',
    width: '80%',
    marginTop: '10%',
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
  buttonSignUp: {
    alignItems: 'center',
    paddingTop: 12,
    height: '6%',
    width: '80%',
    marginTop: '10%',
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },
  textButton: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
