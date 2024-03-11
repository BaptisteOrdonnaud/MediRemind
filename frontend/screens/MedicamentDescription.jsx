import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import 'moment/locale/fr'; 
import DeleteMedicamentBtn from '../components/DeleteMedicamentBtn';
import MedicamentInformation from '../components/MedicamentInformation';
import DetailsTakingDrugs from '../components/DetailsTakingDrugs';
import DrugTime from '../components/DrugTime';

export default function MedicamentDescriptionScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom,token } = user;
  const currentDate = moment().format('dddd D MMMM ');
  moment.locale('fr');
  const [medicaments, setMedicaments] = useState([]);
  const [details, setDetails] = useState([]);
  const [duree, setDuree] = useState([]);
  

  useEffect(() => {
    fetch(`http://10.9.1.94:3000/traitements/${token}`)
    .then(response => response.json())
    .then(drug => {
        setMedicaments(drug.traitements);
       setDetails(drug.traitements)
       setDuree(drug.traitements)
        // console.log(drug.traitements[0].medicaments[0].product_name)
        // console.log(drug.traitements[0].rappel.dose)
        // console.log(drug.traitements[0].rappel.heure)
    })
    .catch(error => {
        console.error('erreur lors de la reccuperation des données:', error);
    });
},[]);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}></Text>
      </View>
      <ScrollView>

      <View style={styles.contentContainer}>
      {medicaments.map((traitement, index) => (
            <MedicamentInformation
                key={index}
                drugName={traitement.medicaments[0].form}
                completName={traitement.medicaments[0].product_name}
            />
        ))}
        {details.map((detail, index) => (         
        <DetailsTakingDrugs
          key={index}
          // frequence={detail.frequence}
          nbre={detail.rappel.dose}
          heure={moment(detail.rappel.heure).format('HH:mm')}
        />))}
         {duree.map((time, index) => (         
        <DrugTime
          key={index}
          debut={moment(time.duree.dateDebut).format('Do MMMM YYYY')}
          fin={moment(time.duree.dateFin).format('Do MMMM YYYY')}
        />))}
      </View>
      </ScrollView>
      <View>
   <DeleteMedicamentBtn/>
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
        height:Dimensions.get('screen').height,
        width:Dimensions.get('screen').width
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
});