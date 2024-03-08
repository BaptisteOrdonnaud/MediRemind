
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { updateTraitements } from '../reducers/user';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

export default function TakingInstructionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState('first');

  const [avantRepas, setAvantRepas] = useState(false);
  const [pendantRepas, setPendantRepas] = useState(false);
  const [apresRepas, setApresRepas] = useState(false);
  const [aJeun, setAJeun] = useState(false);
  const [peuImporte, setPeuImporte] = useState(false);

  const instruction = {
    avantRepas,
    pendantRepas,
    apresRepas,
    aJeun,
    peuImporte,
  }


  const handleSubmit = () => {
    const valueSelectionnes = Object.values(instruction);
    if (valueSelectionnes.some(value => value)) {
      dispatch(updateTraitements(instruction));
      navigation.navigate('OptionTreatment');
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Doit-il être pris avec de la norriture?</Text>
        <View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="avantRepas"
              status={avantRepas ? 'checked' : 'unchecked'}
              onPress={() => setAvantRepas(!avantRepas)}
            />
            <Text style={styles.listText}>Avant le repas</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="pendantRepas"
              status={pendantRepas ? 'checked' : 'unchecked'}
              onPress={() => setPendantRepas(!pendantRepas)}
            />
            <Text style={styles.listText}>Pendant le repas</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="apresRepas"
              status={apresRepas ? 'checked' : 'unchecked'}
              onPress={() => setApresRepas(!apresRepas)}
            />
            <Text style={styles.listText}>Pendant le repas</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="aJeun"
              status={aJeun ? 'checked' : 'unchecked'}
              onPress={() => setAJeun(!aJeun)}
            />
            <Text style={styles.listText}>À jeun</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="peuImporte"
              status={peuImporte ? 'checked' : 'unchecked'}
              onPress={() => setPeuImporte(!peuImporte)}
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