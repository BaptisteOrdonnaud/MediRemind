import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { enregistrerTraitements } from '../reducers/user';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

export default function TakingInstructionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    if (selectedOption) {
      const instruction = {
        avantRepas: selectedOption === 'avantRepas',
        pendantRepas: selectedOption === 'pendantRepas',
        apresRepas: selectedOption === 'apresRepas',
        aJeun: selectedOption === 'aJeun',
        peuImporte: selectedOption === 'peuImporte',
      };
      dispatch(enregistrerTraitements(instruction));
      navigation.navigate('OptionTreatment');
    } else {
      alert("Veuillez sélectionner une option.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Doit-il être pris avec de la nourriture?</Text>
        <View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="avantRepas"
              status={selectedOption === 'avantRepas' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('avantRepas')}
            />
            <Text style={styles.listText}>Avant le repas</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="pendantRepas"
              status={selectedOption === 'pendantRepas' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('pendantRepas')}
            />
            <Text style={styles.listText}>Pendant le repas</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="apresRepas"
              status={selectedOption === 'apresRepas' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('apresRepas')}
            />
            <Text style={styles.listText}>Après le repas</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="aJeun"
              status={selectedOption === 'aJeun' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('aJeun')}
            />
            <Text style={styles.listText}>À jeun</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="peuImporte"
              status={selectedOption === 'peuImporte' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('peuImporte')}
            />
            <Text style={styles.listText}>Peu importe</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => handleSubmit()}>
          <Text style={styles.textButton}>Suivant</Text>
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
  listText: {
    marginTop: 10,
    marginLeft: 10,
  },

  radioContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 7,
    margin: 5,
    borderRadius: 10,
    width: 200,
  },
});
