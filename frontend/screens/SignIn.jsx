import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, View, TextInput} from 'react-native';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';


export default function SignInScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const handleConnection = () => {

//     fetch('http://localhost:3000/users/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: email, password: password }),
//     }).then(response => response.json())
//         .then(data => {
//             if (data.result) {
//                 setEmail('');
//                 setPassword('');
//                 // router.push('home')
//                 navigation.navigate('TabNavigator', { screen: 'Home' });
//             }
//         });
// };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <Image style={styles.image} source={require('../assets/TemplateImage.png')}/>
    <View>
      <Text style={styles.titre}>Email</Text>
    <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.inputEmail}
            inputMode='email'
          />
          
      <Text style={styles.titre}>Mot de passe</Text>      
    <TextInput
            placeholder="Mot de passe"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.inputPassword}
          />

    </View>
      <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('TabNavigator')}> 
        <Text style={styles.textButton}>Connexion</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    width: '100%'
  },
  image: {
    marginTop: '9%',
    marginBottom: '9%'
  },
  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 12,
    height: 45,
    width: 286,
    marginTop: '10%',
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },
  titre : {
    marginBottom: 8,
  },
  inputEmail: {
   backgroundColor: '#fff',
   height: 45,
   width: 286,
   borderRadius: 10,
   paddingLeft: 20,
   marginBottom: 25,
  },
  inputPassword: {
    backgroundColor: '#fff',
    height: 45,
    width: 286,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 30,
   },
   textButton: {
    flex: 1,
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
