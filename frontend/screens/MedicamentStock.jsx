import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enregistrerTraitements } from '../reducers/user';

export default function MedicamentStockScreen({ navigation }) {
  const dispatch = useDispatch();

  const [qtDispo, setQtDispo] = useState('');


  const handleDoseChange = (value) => {
    setQtDispo(value);
  };

  const handleSubmit = () => {
    const valueSelectionnes = Object.values(qtDispo);
    if (valueSelectionnes.some(value => value)) {
      dispatch(enregistrerTraitements(qtDispo));
      navigation.navigate('ReassortDrugs');
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Combien de Pilule(s) vous reste-t-il?</Text>
        <TextInput
          placeholder="Nombre de pilule(s)"
          keyboardType='numeric'
          onChangeText={handleDoseChange}
          value={qtDispo}
          style={styles.input}
          returnKeyType='done'
        />
      </View>
      <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => handleSubmit()}>
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: 'center',
  },
  titleContainer: {
    width: '90%',
    marginTop: '10%',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#36373E',
    display: 'flex',
    marginLeft: '7%',
    marginBottom: '6%',
  },
  input: {
    backgroundColor: '#fff',
    height: 45,
    width: 280,
    borderRadius: 10,
    paddingLeft: 20,
    margin: 5,
  },
  buttonSuivant: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    height: 40,
    width: 200,
    marginTop: '10%',
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
  textButton: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});