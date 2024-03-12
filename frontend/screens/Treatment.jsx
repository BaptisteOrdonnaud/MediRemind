import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr'; 
import MedicamentDansLeTabTraitement from '../components/MedicamentDansLeTabTraitement'; // Importez votre composant
import AddMedicamentBtn from '../components/AddMedicamentBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TreatmentScreen({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom,token } = user;
  const currentDate = moment().format('dddd D MMMM ');
  moment.locale('fr');
  const [medicaments, setMedicaments] = useState([]);
  
  

  useEffect(() => {
    fetch(`http://10.9.1.94:3000/traitements/${token}`)
    .then(response => response.json())
    .then(drug => {
        setMedicaments(drug.traitements);
      //  dispatch(enregistrerMedicament(medicaments))
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
                <Text style={styles.headerText}>Traitement du {currentDate}</Text>
            </View>
            <ScrollView>
                <View style={styles.contentContainer}>
                    {medicaments.map((traitement, i) => (
                        <MedicamentDansLeTabTraitement
                            key={i}
                            drugId={traitement.id} // Ajoutez l'ID du médicament
                            drugName={traitement.medicaments[0].product_name}
                            dosage={traitement.rappel.dose}
                            heure={moment(traitement.rappel.heure).format('HH:mm')}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
            <AddMedicamentBtn navigation={navigation}/>
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
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
