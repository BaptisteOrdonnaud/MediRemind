import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'moment/locale/fr';
import MedicamentTraitement from '../components/MedicamentTraitement'
import StockMedicamentHome from '../components/StockMedicamentHome'
import Calendrier from '../components/Calendrier'
import moment from 'moment';


moment.locale('fr');
const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, token, isLoaded, idUser } = user;

  const currentDate = moment().format('dddd D MMMM YYYY');
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
  const [medicaments, setMedicaments] = useState([]);
  const [quantite, setQuantite] = useState([])
  const [verrif, setVerrif] = useState(null)
  
const medicamentsToTakeToday = medicaments.filter(traitement => {
    const rappelDate = moment(traitement.rappel.date).format('DD-MM-YYYY');
    return rappelDate === selectedDate;
});

const nbrMedocsAujourdhui = medicamentsToTakeToday.length;
 
useEffect(() => {
    fetch(`http://10.9.1.94:3000/traitements/${token}`)
      .then(response => response.json())
      .then(drug => {
        setMedicaments(drug.traitements);
        setQuantite(drug.traitements)
        // console.log(drug.traitements[0].medicaments[0].product_name)
        // console.log(drug.traitements[0].rappel.dose)
        // console.log(drug.traitements[0].rappel.heure)
      })
      .catch(error => {
        console.error('erreur lors de la reccuperation des données:', error);
      });
  }, [isLoaded]);



  return (
    <SafeAreaView style={[styles.container, { width: windowWidth * 1, height: windowHeight * 1 }]}>
      {/* <ScrollView> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bonjour {prenom} 👋🏼</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
     <Calendrier style={styles.date} onSelectDate={date => setSelectedDate(date)}/>
     <View style={styles.nombrePriseMedicament}>
     <View style={styles.nbrMedocsContainer}>
      <Text style={styles.nbrMedocsAujourdhui}>{nbrMedocsAujourdhui}</Text>
     </View>
      <Text style={styles.textPriseMedoc}>Médicaments à prendre aujourd'hui</Text>
     </View> 
     <View>
      <Text style={styles.mainText}>Vos traitements du jour</Text>
     </View>
     <ScrollView horizontal={true} contentContainerStyle={styles.containerMedicament}>
     {medicaments.map((traitement, index) => (
            <MedicamentTraitement
                key={index}
                idUser={idUser}
                treatmentId={traitement._id}
                drugName={traitement.medicaments[0].product_name}
                dosage={traitement.rappel.dose}
                heure={moment(traitement.rappel.heure).format('HH:mm')}
            />
        ))}
     </ScrollView>
      
     <View>
      <Text style={styles.mainText}>Votre inventaire</Text>
     </View>
     <ScrollView horizontal={true} contentContainerStyle={styles.containerStock}>
    {quantite.map((data,index) => (
    <StockMedicamentHome
      key={index}
      drugName={data.medicaments[0].product_name}
      qtRestant={data.qtDispo}
      qtRappel={data.qtRappel}
    />))} 
     </ScrollView> 
      {/* </ScrollView> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',

  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'column',
    width: windowWidth * 1,
    height: windowHeight * 0.08,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: windowWidth * 0.01,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    alignSelf: 'flex-start'
  },
  date:{
    width: windowWidth *1,
    height: windowHeight *1
  },
  nombrePriseMedicament: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.16,
    alignItems: 'center',
    backgroundColor: '#A69AFC',
    marginTop: windowHeight * 0.02,
    borderRadius: 15,
    marginLeft: windowWidth * 0.07
  },
  textPriseMedoc: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: windowHeight * 0.01,
  },
  nbrMedocsContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.2,
    height: windowHeight * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.02,
    borderRadius: 45,
  },
  nbrMedocsAujourdhui: {
    color: '#A69AFC',
    fontSize: 40,
    fontWeight: 'bold'
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.09,
    marginTop: windowHeight * 0.003,
    // backgroundColor:'green'

  },
  containerMedicament: {
    height: windowHeight * 0.19,
    flexDirection: 'row',
    // backgroundColor:'yellow',
    paddingVertical: windowWidth * 0.001,
    paddingHorizontal: windowHeight * 0.008
  },
  containerStock: {
    height: windowHeight * 0.125,
    flexDirection: 'row',
    // backgroundColor:'blue',
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.008

  }
});
