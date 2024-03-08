import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTraitements } from '../reducers/user';

export default function FrequenceScreen({ navigation }) {
  const dispatch = useDispatch();

  const [lundi, setLundi] = useState(false);
  const [mardi, setMardi] = useState(false);
  const [mercredi, setMercredi] = useState(false);
  const [jeudi, setJeudi] = useState(false);
  const [vendredi, setVendredi] = useState(false);
  const [samedi, setSamedi] = useState(false)
  const [dimanche, setDimanche] = useState(false);


  const frequence = {
    lundi,
    mardi,
    mercredi,
    jeudi,
    vendredi,
    samedi,
    dimanche
  }

  const handleLundi = () => {
    setLundi((prevState) => !prevState)
    console.log(lundi)
  };
  const handleMar = () => {
    setMardi((prevState) => !prevState)

  };
  const handleMer = () => {
    setMercredi((prevState) => !prevState)
  };
  const handleJeu = () => {
    setJeudi((prevState) => !prevState)
  };
  const handleVen = () => {
    setVendredi((prevState) => !prevState)
  };
  const handleSam = () => {
    setSamedi((prevState) => !prevState)
  };
  const handleDim = () => {
    setDimanche((prevState) => !prevState)
  };

  const handleSubmit = () => {
    const joursSelectionnes = Object.values(frequence);
    if (joursSelectionnes.some(jour => jour)) {
      dispatch(updateTraitements(frequence));
      navigation.navigate('DoseHours');
    } else {
      alert("Veuillez sélectionner au moins un jour.");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> À quelle fréquence prenez-vous le médicament ?</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.joursText}>Jours spécifiques de la semaine:</Text>
        <View style={styles.daysContainer}>
          <TouchableOpacity style={[styles.buttonDay, lundi ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8}
            onPress={handleLundi} >
            <Text style={styles.text}>Lun</Text>
            {lundi && <FontAwesome name='check-circle-o' style={styles.icon} />}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonDay, mardi ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8} onPress={handleMar} >
            <Text style={styles.text}>Mar</Text>
            {mardi && <FontAwesome name='check-circle-o' style={styles.icon} />}

          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonDay, mercredi ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8} onPress={handleMer}>
            <Text style={styles.text}>Mer</Text>
            {mercredi && <FontAwesome name='check-circle-o' style={styles.icon} />}

          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonDay, jeudi ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8} onPress={handleJeu} >
            <Text style={styles.text}>Jeu</Text>
            {jeudi && <FontAwesome name='check-circle-o' style={styles.icon} />}

          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonDay, vendredi ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8} onPress={handleVen}>
            <Text style={styles.text}>Ven</Text>
            {vendredi && <FontAwesome name='check-circle-o' style={styles.icon} />}

          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonDay, samedi ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8} onPress={handleSam}>
            <Text style={styles.text}>Sam</Text>
            {samedi && <FontAwesome name='check-circle-o' style={styles.icon} />}

          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonDay, dimanche ? styles.buttonOn : styles.buttonOff]} activeOpacity={0.8} onPress={handleDim} >
            <Text style={styles.text}>Dim</Text>
            {dimanche && <FontAwesome name='check-circle-o' style={styles.icon} />}

          </TouchableOpacity>

        </View>

      </View>
      <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => handleSubmit()}>
        <Text style={styles.textButton}>Valider</Text>
      </TouchableOpacity>
    </SafeAreaView >
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
    marginTop: '10%'
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#36373E',
    display: 'flex',
    marginLeft: '7%',
    marginBottom: '6%'

  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%',
    height: 200,
    margin: 15,
    padding: 20,
  },

  joursTextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    alignSelf: 'flex-start'
  },
  buttonDay: {

    width: '30%',
    height: 40,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonOn: {
    backgroundColor: '#A69AFC',
  },
  buttonOff: {
    backgroundColor: 'white',
    borderColor: '#A69AFC',
    borderWidth: 3,
  },

  text: {
    flex: 1,
    color: '#A69AFC',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },

  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  icon: {
    color: '#7368BF',
    paddingLeft: '3%',
    fontSize: 20,
    paddingBottom: 10,
  },

  buttonSuivant: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    height: '10%',
    width: '80%',
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