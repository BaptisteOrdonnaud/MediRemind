import React, { useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { enregistrerTraitements } from '../reducers/user';

export default function TreatmentTimeScreen({navigation}) {
  const dispatch = useDispatch();
  moment.locale('fr');
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const [date1, setDate1] = useState(new Date())
  const [date2, setDate2] = useState(new Date())

  const [showPicker, setShowPicker] = useState(false)
  const [showPicker2, setShowPicker2] = useState(false)

  const duree = {
    dateDebut: moment(date1).startOf('day').format(),
    dateFin: moment(date2).startOf('day').format(),
  }


  // VERSION DATE DU DEBUT ! 

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({type}, selectedDate) => {
    if (type === 'set'){
      const currentDate = selectedDate;
      setDate1(currentDate)

      if(Platform.OS === 'android'){
        toggleDatePicker();
        setDateDebut(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateDebut(formatDate(date1));
    toggleDatePicker();

  }

  const formatDate = (rawDate) => {
    let date = new Date(rawDate)
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;


    return `${day}/${month}/${year}`

  }


  // VERSION DATE DE FIN ! 

  const toggleDatePicker2 = () => {
    setShowPicker2(!showPicker2)
  }

  const onChange2 = ({type}, selectedDate) => {
    if (type === 'set'){
      const currentDate = selectedDate;
      setDate2(currentDate)

      if(Platform.OS === 'android'){
        toggleDatePicker2();
        setDateFin(formatDate(currentDate));
      }
    } else {
      toggleDatePicker2();
    }
  };
  
  const formatDate2 = (rawDate) => {
    let date = new Date(rawDate)
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;


    return `${day}/${month}/${year}`

  }
  
  const confirmIOSDate2 = () => {
    setDateFin(formatDate2(date2));
    toggleDatePicker2();

  }

  const dateSelected = () => {
    console.log(`DEBUT : ${moment(date1).startOf('day').format()} & FIN : ${moment(date2).startOf('day').format()}`)
    dispatch(enregistrerTraitements({ duree}));
    navigation.navigate('OptionTreatment')
  }


  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.headerText}>NOM DU MEDICAMENT</Text>
     <Text style={styles.title}>Quelle est la durée de ce traitement?</Text>
     <View style={styles.debutContainer}>
     <Text style={styles.label}>Date début du traitement :</Text>
            {showPicker && (
              <DateTimePicker locale="fr-FR" mode='date' display='spinner' value={date1} onChange={onChange} style={styles.datePicker} minimumDate={new Date()}/>
            )}

            {showPicker && Platform.OS === "ios" && (
              <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
                <TouchableOpacity style={[styles.button, styles.pickerButton, {backgroundColor: "#11182711"}]} onPress={toggleDatePicker}>
                  <Text style={[styles.buttonText, {color: "#7368BF"}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pickerButton, {backgroundColor: "#7368BF"}]} onPress={confirmIOSDate}>
                  <Text style={[styles.buttonText,]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

          

            {!showPicker && (
              <Pressable onPress={toggleDatePicker} style={styles.dateDebut}>
              <TextInput
                  placeholder="Date de début"
                  value={showPicker ? date1 : dateDebut}
                  onChangeText={setDateDebut}
                  style={styles.input}
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
            </Pressable>
            )}
     </View>

     <View style={styles.finContainer}>
        <Text style={styles.label}>Date de fin du traitement :</Text>
            {showPicker2 && (
              <DateTimePicker locale="fr-FR" mode='date' display='spinner' value={date2} onChange={onChange2} style={styles.datePicker} minimumDate={new Date()}/>
            )}

            {showPicker2 && Platform.OS === "ios" && (
              <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
                <TouchableOpacity style={[styles.button, styles.pickerButton, {backgroundColor: "#11182711"}]} onPress={toggleDatePicker2}>
                  <Text style={[styles.buttonText, {color: "#7368BF"}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pickerButton, {backgroundColor: "#7368BF"}]} onPress={confirmIOSDate2}>
                  <Text style={[styles.buttonText,]}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}       

            {!showPicker2 && (
              <Pressable onPress={toggleDatePicker2} style={styles.dateDebut}>
              
              <TextInput
                  placeholder="Date de fin"
                  value={showPicker2 ? date2 : dateFin}
                  onChangeText={setDateFin}
                  style={styles.input}
                  editable={false}
                  onPressIn={toggleDatePicker2}
                />
            </Pressable>
            )} 
     </View>
      <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={dateSelected}>
        <Text style={styles.textButton}>Suivant</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
    marginBottom: '5%'
  },
  debutContainer: {
    // backgroundColor: 'green',
    display: 'flex',
    width: '80%',
    marginBottom: '10%'
  },
  finContainer: {
    // backgroundColor: 'blue',
    width: '80%',
    display: 'flex'
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
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#36373E',
    textAlign: 'center',
    marginBottom: '6%'
  },
  textButton: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 3,
    width: '80%',
    paddingVertical: '4%'
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#075985',
  },
  dateDebut: {
    display: 'flex',
    alignItems: 'center',
  },
  
});