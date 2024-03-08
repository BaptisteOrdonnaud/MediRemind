import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';
import { updateTraitements } from '../reducers/user';


export default function DoseHoursScreen({ navigation }) {
  const dispatch = useDispatch();

  const [dose, setDose] = useState('');
  const [heure, setHeure] = useState(new Date());
  const [isAlert, setIsAlert] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
  const handleDoseChange = (value) => {
    setDose(value);
  };

  const handleSubmit = () => {
    const valueSelectionnes = Object.values(dose, heure, isAlert);
    if (valueSelectionnes.some(value => value)) {
      dispatch(updateTraitements(dose, heure, isAlert));
      navigation.navigate('OptionTreatment');
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Doliprane</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Quand voulez-vous recevoir des rappels?</Text>
        <Text>Choisissez le de pilules à prendre:</Text>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Nombre de pilule(s)"
          keyboardType='numeric'
          onChangeText={handleDoseChange}
          value={dose}
          style={styles.input}
          returnKeyType='done'
        />

        <Text>Choisissez l'heure:</Text>

        <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
          <Text style={styles.textHeure}>{heure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          date={heure}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View>
          <Text style={styles.title}>Rappels bien visibles</Text>
        </View>
        <View style={styles.rappelContainer}>
          <Text>Activer les alerts</Text>

          <Switch
            value={isAlert}
            onValueChange={(value) => setIsAlert(value)}
            trackColor={{ true: "#A69AFC" }}
            thumbColor={isAlert ? "#E1DFFF" : "#A69AFC"}
          />

        </View>
        <View>
          <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => handleSubmit()}>
            <Text style={styles.textButton}>Valider</Text>
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

  textHeure: {
    color: '#A69AFC',
    fontWeight: '600',
    fontSize: 16,
  },

  rappelContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 45,
    width: 280,
    borderRadius: 10,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'space-around',

  }
});
