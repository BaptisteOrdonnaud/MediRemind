import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const regexFecha = /^\d{4}\/\d{2}\/\d{2}$/

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [nom, setNom] = useState('');
  const [nomError, setNomError] = useState('');

  const [prenom, setPrenom] = useState('');
  const [prenomError, setPrenomError] = useState('');

  const [dateDeNaissance, setDateDeNaissance] = useState('');
  const [dateDeNaissanceError, setDateDeNaissanceError] = useState('');


  const handleSubmit = () => {
    let hasError = false;

    if (!nom) {
      setNomError('Le nom est invalide');
      hasError = true;
    } else {
      setNomError('');
    }

    if (!prenom) {
      setPrenomError('Le prenom est invalide');
      hasError = true;
    } else {
      setPrenomError('');
    }

    if (!dateDeNaissance || !regexFecha.test(dateDeNaissance)) {
      setDateDeNaissanceError('Le format est invalide (AAAA/MM/JJ)');
      hasError = true;
    } else {
      setDateDeNaissanceError('');
    }
    if (!hasError) {
      dispatch(login({ prenom: prenom, nom: nom, dateDeNaissance: dateDeNaissance }));
      navigation.navigate('SignUpBis');
    }

  };



  return (
    <SafeAreaView>
 <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.title}>Création de compte</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.titre}>Nom</Text>
          <TextInput
            placeholder="Nom"
            onChangeText={(value) => setNom(value)}
            value={nom}
            style={styles.input}
          />
          {nomError && <Text style={styles.error}>Le nom est invalide</Text>}


          <Text style={styles.titre}>Prenom</Text>
          <TextInput placeholder="Prenom" onChangeText={(value) => setPrenom(value)} value={prenom} style={styles.input} />
          {prenomError && <Text style={styles.error}>Le prenom est invalide</Text>}

          <Text style={styles.titre}>Date de naissance</Text>
          <TextInput
            placeholder="Entrez votre date de naissance (AAAA/MM/JJ)"
            onChangeText={(value) => setDateDeNaissance(value)} value={dateDeNaissance}
            style={styles.input}
            textContentType='birthdate' />
          {dateDeNaissanceError && <Text style={styles.error}>Le format est invalide (AAAA/MM/JJ)</Text>}


          <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonSignUp} activeOpacity={0.8}>
            <Text style={styles.textButton}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    </SafeAreaView>

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
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  error: {
    marginTop: 1,
    color: 'red',
    marginBottom: '30',
  },
});
