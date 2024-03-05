import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
// import { useDispatch } from 'react-redux';


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexTelephone = /^(?:0|\+33|0033)[1-9](?:(?:(?:[0-9]{2}){4})|(?:([0-9]{2})){4})$/;
const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/;



export default function SignUpScreen({ navigation }) {
  // const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [telephone, setTelephone] = useState('');
  const [telephoneError, setTelephoneError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [confirmationPasswordError, setConfirmationPasswordError] = useState('');




  const handleSubmit = () => {
    let hasError = false;

    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError('Le email est invalide');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!telephone || !regexTelephone.test(telephone)) {
      setTelephoneError('Le numéro de téléphone est invalide');
      hasError = true;
    } else {
      setTelephoneError('');
    }

    if (!password || !regexPassword.test(password)) {
      setPasswordError('Mot de passe invalide, le mot de passe doit avoir minimum 6 caractères et 1 chiffre');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!confirmationPassword || password !== confirmationPassword) {
      setConfirmationPasswordError('Les mots de passe ne correspondent pas');
      hasError = true;
    } else {
      setConfirmationPasswordError('');
    }

    if (!hasError) {
      navigation.navigate('AddDrugs-part1');
    }
  };






  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Création de compte</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.titre}>Email</Text>
          <TextInput
            placeholder="Email"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
            textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
            autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
          />
          {emailError && <Text style={styles.error}>Le email est invalide</Text>}

          <Text style={styles.titre}>Téléphone</Text>
          <TextInput placeholder="Téléphone" keyboardType='numeric' onChangeText={(value) => setTelephone(value)} value={telephone} style={styles.input} />
          {telephoneError && <Text style={styles.error}>Le numéro de téléphone est invalide</Text>}

          <Text style={styles.titre}>Mot de passe</Text>
          <TextInput placeholder="Mode de passe" secureTextEntry={true} autoCapitalize="none" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} textContentType='password' />
          {passwordError && <Text style={styles.error}>Mot de passe invalide, le mot de passe doit avoir minimum 6 characters et 1 chiffre</Text>}

          <Text style={styles.titre}>Confirmation de mot de passe</Text>
          <TextInput placeholder="Confirmation de mot de passe" secureTextEntry={true} autoCapitalize="none" onChangeText={(value) => setConfirmationPassword(value)} value={confirmationPassword} style={styles.input} />
          {confirmationPasswordError && <Text style={styles.error}>Les mots de passe ne correspondent pas</Text>}

          <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonSignUp} activeOpacity={0.8}>
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSignUp: {
    alignItems: 'center',
    paddingTop: 12,
    height: 45,
    width: 286,
    marginTop: '10%',
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },

  input: {
    backgroundColor: '#fff',
    height: 45,
    width: 286,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 3,
  },
  title: {
    fontWeight: '800',
    fontSize: 30,
    color: '#36373E',
    marginBottom: '10%',
    textAlign: 'center'
  },
  textButton: {
    flex: 1,
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,

  },
  titre: {
    marginBottom: 8,
  },
  error: {
    marginTop: 1,
    color: 'red',
    marginBottom: '30',
  },


});
