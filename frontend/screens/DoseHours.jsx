import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DoseHoursScreen({ navigation }) {
  const [dose, setDose] = useState('');
  const [heure, setHeure] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setHeure(selectedDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Définir l'heure et la dose</Text>
        <Text>Choisissez le nombre de pilules à prendre:</Text>
        <TextInput
          placeholder="Numéro de pilule"
          keyboardType='numeric'
          onChangeText={(value) => setDose(value)}
          value={dose}
          style={styles.input}
        />

        <Text>Choisissez l'heure:</Text>

        <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
          <Text>{heure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          date={heure}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => navigation.navigate('OptionTreatment')}>
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
  datePickerButton: {
    backgroundColor: '#fff',
    height: 45,
    width: 280,
    borderRadius: 10,
    paddingLeft: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
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
