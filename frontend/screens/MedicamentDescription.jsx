import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/fr';
import DeleteMedicamentBtn from '../components/DeleteMedicamentBtn';
import MedicamentInformation from '../components/MedicamentInformation';
import DetailsTakingDrugs from '../components/DetailsTakingDrugs';
import DrugTime from '../components/DrugTime';
import FlecheRetour from '../components/FlecheRetour';
import Stock from '../components/Stock';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MedicamentDescriptionScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom, token } = user;
  const currentDate = moment().format('dddd D MMMM ');
  moment.locale('fr');
  const [medicaments, setMedicaments] = useState([]);
  const [details, setDetails] = useState([]);
  const [duree, setDuree] = useState([]);
  const [stock, setStock] = useState([]);
  const [medicamentName, setMedicamentName] = useState("");



  useEffect(() => {
    fetch(`http://10.9.1.94:3000/traitements/${token}`)
      .then(response => response.json())
      .then(drug => {
        setMedicaments(drug.traitements);
        setDetails(drug.traitements)
        setDuree(drug.traitements)
        setStock(drug.traitements)
        setMedicamentName(drug.traitements[0].medicaments[0].product_name);
        // console.log(drug.traitements[0].medicaments[0].product_name)
        // console.log(drug.traitements[0].rappel.dose)
        // console.log(drug.traitements[0].rappel.heure)
      })
      .catch(error => {
        console.error('erreur lors de la reccuperation des données:', error);
      });
  }, []);

  return (
    <SafeAreaView style={[styles.container, { width: windowWidth * 1, height: windowHeight * 0.17 }]}>
      <View style={styles.headerContainer}>
        <FlecheRetour navigation={navigation} />
        <Text style={styles.headerText}>{medicamentName}</Text>
      </View>


      <View style={styles.contentContainer}>
        {medicaments.map((traitement, index) => (
          <MedicamentInformation
            key={index}
            drugName={traitement.medicaments[0].product_name}
            completName={traitement.medicaments[0].form}
          />
        ))}
        {details.map((detail, index) => {
          // Extraire les jours sélectionnés de la propriété "frequence"
          const selectedDays = [];
          for (const day in detail.frequence) {
            if (day !== '_id' && detail.frequence[day]) {
              selectedDays.push(day);
            }
          }

          return (
            <DetailsTakingDrugs
              key={index}
              frequence={selectedDays.join(', ')} // Passer les jours sélectionnés ici
              nbre={detail.rappel.dose}
              heure={moment(detail.rappel.heure).format('HH:mm')}
            />
          );
        })}
        {duree.map((time, index) => (
          <DrugTime
            key={index}
            debut={moment(time.duree.dateDebut).format('Do MMMM YYYY')}
            fin={moment(time.duree.dateFin).format('Do MMMM YYYY')}
          />))}
        {stock.map((stock, index) => (
          <Stock
            key={index}
            qtDispo={stock.qtDispo}
            qtRappel={stock.qtRappel}
          />))}
      </View>

      <View style={styles.btnContainer}>
        <DeleteMedicamentBtn />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    flexDirection: 'column',

  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'row',
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: windowWidth * 0.009
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: windowWidth * 0.07
  },
});