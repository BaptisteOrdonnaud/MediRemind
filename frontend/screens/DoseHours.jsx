import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function DoseHoursScreen({ navigation }) {
  const [dose, setDose] = useState(false);
  const [heure, setHeure] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Définir l'heure et la dose</Text>
        <Text>Choisi les nombres de pilules a prendre:</Text>
        <TextInput placeholder="Numéro de pilule" keyboardType='numeric' onChangeText={(value) => setDose(value)} value={dose} style={styles.input} />

        <Text>Choisi l'heure:</Text>

        <DateTimePicker
          testID="dateTimePicker"
          value={heure}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />


        <View>
          <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => navigation.navigate('OptionTreatment')}>
            <Text style={styles.textButton}>Suivant</Text>
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

  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
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
  input: {
    backgroundColor: '#fff',
    height: 45,
    width: 280,
    borderRadius: 10,
    paddingLeft: 20,
    margin: 5,
  },
});