import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { enregistrerTraitements } from '../reducers/user';
import { useState, useEffect } from 'react';

export default function OPtionTreatmentScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  console.log('Freq :', user.idMedoc);

  const handleSubmit = () => {
    fetch('http://10.9.1.92:3000/traitements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ medicaments: user.idMedoc, frequence: user.frequence, dure: user.duree, rappel: user.rappel, instruction: user.instruction, qtDispo: user.qtDispo, qtRappel: user.qtRappel, areTaken: false }),
    }).then(response => response.json())
      .then(data => {
        console.log('Données récupérées :', data);
        // if (data.result) {
        //   dispatch(enregistrerTraitements({
        //     medicaments: data.user.idMedoc, frequence: data.user.frequence,
        //     duree: data.user.duree,
        //     rappel: data.user.rappel,
        //     instruction: data.user.instruction,
        //     qtDispo: data.user.qtDispo,
        //     qtRappel: data.user.qtRappel,
        //   }));

        // }
        navigation.navigate('TabNavigator');
      }).catch(error => console.error('Erreur lors de la requête fetch :', error));

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>

      <Text style={styles.title}>Option de traitement</Text>
      <View style={styles.titleContainer}>

        <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => navigation.navigate('TreatmentTime')}>
          <Text style={styles.textButton}>Durée du traitement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => navigation.navigate('MedicamentStock')}>
          <Text style={styles.textButton}>Rappel de renouvellement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => navigation.navigate('TakingInstruction')}>
          <Text style={styles.textButton}>Ajouter des instructions ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => handleSubmit()}>
        <Text style={styles.textButton}>Enregistrer</Text>
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