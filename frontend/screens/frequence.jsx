import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';

export default function FrequenceScreen({ navigation }) {
  const [lundi, setLundi] = useState(false);
  const [mardi, setMardi] = useState(false);
  const [mercredi, setMercredi] = useState(false);
  const [jeudi, setJeudi] = useState(false);
  const [vendredi, setVendredi] = useState(false);
  const [samedi, setSamedi] = useState(false)
  const [dimanche, setDimanche] = useState(false);

  const handleDay = () => {

    setLundi(true)
    console.log(lundi)
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
          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8}
            onPress={handleDay} >
            <Text style={styles.textButton}>Lun</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8} >
            <Text style={styles.textButton}>Mar</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />

          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8} >
            <Text style={styles.textButton}>Mer</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />

          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8} >
            <Text style={styles.textButton}>Jeu</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />

          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8} >
            <Text style={styles.textButton}>Ven</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />

          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8} >
            <Text style={styles.textButton}>Sam</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />

          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOff} activeOpacity={0.8} >
            <Text style={styles.textButton}>Dim</Text>
            <FontAwesome name='check-circle-o' style={styles.icon} />

          </TouchableOpacity>
        </View>
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
    marginTop: '20%'
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
    height: 180,
    margin: 5,
    padding: 20,
  },

  joursTextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    alignSelf: 'flex-start'
  },
  buttonOn: {
    width: '30%',
    height: 40,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonOff: {
    width: '12%',
    height: 60,
    backgroundColor: 'white',
    borderColor: '#A69AFC',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  textButton: {
    flex: 1,
    color: '#A69AFC',
    fontWeight: '600',
    fontSize: 16,
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
  }
});