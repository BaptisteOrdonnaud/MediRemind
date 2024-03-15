import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import Calendrier from '../components/Calendrier';
import MedicamentDansLeTabTraitement from '../components/MedicamentDansLeTabTraitement';
import AddMedicamentBtn from '../components/AddMedicamentBtn';
import { updateIsLoaded } from '../reducers/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TreatmentScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom, token, isLoaded, isTook } = user;
  const currentDate = moment().format('dddd D MMMM ');
  moment.locale('fr');
  const [medicaments, setMedicaments] = useState([]);




  useEffect(() => {
    fetch(`http://10.9.1.94:3000/traitements/${token}`)
      .then(response => response.json())
      .then(drug => {
        setMedicaments(drug.traitements);
        //  dispatch(enregistrerMedicament(drug.traitements))
        // console.log(drug.traitements[0].medicaments[0].product_name)
        // console.log(drug.traitements[0].rappel.dose)
        // console.log(drug.traitements[0].rappel.heure)
      })
      .catch(error => {
        console.error('erreur lors de la reccuperation des données:', error);
      });
  }, [isLoaded, isTook]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Traitement du {currentDate}</Text>
      </View>
      <Calendrier style={styles.calendar}  />
      <ScrollView style={styles.contentContainer} 
showsVerticalScrollIndicator={false}>
        <View >
          {medicaments.map((traitement, i) => (
            <MedicamentDansLeTabTraitement
              key={i}
              drugId={traitement._id}
              isTook={traitement.isTook}
              drugName={traitement.medicaments[0].product_name}
              dosage={traitement.rappel.dose}
              heure={moment(traitement.rappel.heure).format('HH:mm')}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
      <AddMedicamentBtn style={styles.addMedoc} navigation={navigation} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // height: windowHeight * 1,
    // width:windowWidth *1,
  },

  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'row',
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contentContainer:{
    marginTop: '2%',    width: '100%',
    overflow:'hidden',
    marginLeft: '3.7%',
  }
});
