import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';


export default function SignInScreen({ navigation }) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(false);

  const handleConnection = () => {

    fetch('http://10.9.1.94:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(data)
          dispatch(login({ prenom: data.user.prenom, nom: data.user.nom, token: data.user.token, idUser: data.user._id, traitements: data.user.traitements }));
          setEmail('');
          setPassword('');
          navigation.navigate('TabNavigator')
          setSignInError(false)
        } else {
          setSignInError(true);
        }
      });
  };


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

          {signInError && <Text style={styles.error}>Utilisateur introuvable ou mot de passe erroné</Text>}

        </View>
        <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8} onPress={() => handleConnection()}>
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
  titre: {
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
  error: {
    marginTop: 1,
    color: 'red',
    marginBottom: '30',
  },
});
