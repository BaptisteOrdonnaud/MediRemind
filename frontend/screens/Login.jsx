import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';
export default function LoginScreen({ navigation }) {

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {
      width : windowWidth > 500 ? "70%" : "90%",
      height : windowHeight > 600 ? "60%" : "90",
    }]}>
      <Image style={styles.image} source={require('../assets/TemplateImage.png')}/>
      <Text style={styles.title}>MediRemind</Text>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('SignIn')}>
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
    marginTop: 30,
    marginBottom: 80,
  },
  title: {
    fontWeight: '800',
    fontSize: 36,
    color: '#36373E',
    marginBottom: 20,
  },
  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 11.5,
    height: 45,
    width: 286,
    marginTop: 30,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
  buttonSignUp: {
    alignItems: 'center',
    paddingTop: 11.5,
    height: 45,
    width: 286,
    marginTop: 30,
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },
  textButton: {
    flex: 1,
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
