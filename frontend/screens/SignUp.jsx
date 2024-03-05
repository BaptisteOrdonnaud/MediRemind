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
  const [emailError, setEmailError] = useState(false);

  const [telephone, setTelephone] = useState('');
  const [telephoneError, setTelephoneError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [confirmationPasswordError, setConfirmationPasswordError] = useState(false);




  const handleSubmit = () => {
    let hasError = false;

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      hasError = true;
    }

    // Vérifier le numéro de téléphone
    if (!telephone) {
      setTelephoneError(true);
      hasError = true;
    } else if (!regexTelephone.test(telephone)) {
      setTelephoneError(true);
      hasError = true;
    }

    // Vérifier le mot de passe
    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else if (!regexPassword.test(password)) {
      setPasswordError(true);
      hasError = true;
    }

    // Vérifier la confirmation de mot de passe
    if (!confirmationPassword) {
      setConfirmationPasswordError(true);
      hasError = true;
    } else if (password !== confirmationPassword) {
      setConfirmationPasswordError(true);
      hasError = true;
    }

    // Si une erreur est détectée, arrêter la soumission du formulaire
    if (hasError) {
      return;
    }

    // Si nous arrivons jusqu'ici, cela signifie que toutes les validations sont passées avec succès
    // Vous pouvez maintenant naviguer vers la prochaine étape
    navigation.navigate('AddDrugs-part1');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Création de compte</Text>

        <View style={styles.inputContainer}>
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
          {!email && <Text style={styles.error}>Email manquant</Text>}

          <TextInput placeholder="Téléphone" keyboardType='numeric' onChangeText={(value) => setTelephone(value)} value={telephone} style={styles.input} />
          {telephoneError && <Text style={styles.error}>Le numéro de téléphone est invalide</Text>}
          {!telephone && <Text style={styles.error}>Numéro de téléphone manquant</Text>}

          <TextInput placeholder="Mode de passe" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} textContentType='password' />
          {passwordError && <Text style={styles.error}>Mot de passe invalide, le mot de passe doit avoir minimum 6 characters et 1 chiffre</Text>}
          {!password && <Text style={styles.error}>Mot de passe manquant</Text>}

          <TextInput placeholder="Confirmation de mot de passe" onChangeText={(value) => setConfirmationPassword(value)} value={confirmationPassword} style={styles.input} />
          {confirmationPasswordError && <Text style={styles.error}>Les mots de passe ne correspondent pas</Text>}
          {!confirmationPassword && <Text style={styles.error}>Mot de passe manquant</Text>}

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
