import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { enregistrerTraitements } from '../reducers/user';
import { useState, useEffect } from 'react';
import FlecheRetour from '../components/FlecheRetour';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function OPtionTreatmentScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [duree, setDuree] = useState(false);
  const [rappel, setRappel] = useState(false);
  const [instruction, setInstruction] = useState(false);


  // console.log('IdMedoc:', user.idMedoc, 'freq:', user.frequence, 'rappel:', user.rappel, 'dispo:', user.qtDispo, 'qtRappel:', user.qtRappel, 'instructions', user.instruction, 'areTaken:', user.areTaken);


  const handleSubmit = () => {
    const userData = {
      userId: user.idUser,
      medicamentId: user.idMedoc,
      frequence: JSON.stringify(user.frequence),
      duree: JSON.stringify(user.duree),
      rappel: JSON.stringify(user.rappel),
      instruction: JSON.stringify(user.instruction),
      qtDispo: user.qtDispo,
      qtRappel: user.qtRappel,
      isTook: false,
    };
    console.log('FETCH:', userData)

    if(duree && rappel && instruction){
      fetch('http://10.9.1.94:3000/traitements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then(response => response.json())
        .then(data => {
          if (data.result) {
            // dispatch(enregistrerTraitements({
            //   medicamentId: data.medicaments.idMedoc,
            //   frequence: data.frequence,
            //   duree: data.duree,
            //   rappel: data.rappel,
            //   instruction: data.instruction,
            //   qtDispo: data.qtDispo,
            //   qtRappel: data.qtRappel,
            //   areTaken: data.areTaken
            // }));
            console.log('Données récupérées :', data.result);
            navigation.navigate('TabNavigator');
          }
        }).catch(error => console.error('Erreur lors de la requête fetch :', error));
    } else {
      alert("Veuillez remplir tous les champs.");
    }

  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBack}>
        <FlecheRetour navigation={navigation} />
      </View>
      <Text style={styles.headerText}>{user.nomMedoc}</Text>

      <Text style={styles.title}>Option de traitement</Text>
      <View style={styles.titleContainer}>

        <TouchableOpacity style={styles.buttonOption} activeOpacity={0.8} onPress={() => { 
          setDuree(true)
          navigation.navigate('TreatmentTime')
          }}>
          <View style={styles.optionLeft}>
        <FontAwesome name='calendar' style={styles.iconLeft} />
          <Text style={styles.textButtonOption}>Durée du traitement</Text>
          </View>
          <FontAwesome name='check-circle' style={[styles.iconRight, { color: duree ? '#6DBEA1' : '#DBE4EA' }]} />
        </TouchableOpacity>




        <TouchableOpacity style={styles.buttonOption} activeOpacity={0.8} onPress={() => {
          setRappel(true)
          navigation.navigate('MedicamentStock')
          }}>
          <View style={styles.optionLeft}>
          <FontAwesome name='clock-o' style={styles.iconLeft} />
          <Text style={styles.textButtonOption}>Rappel de renouvellement</Text>
          </View>
          <FontAwesome name='check-circle' style={[styles.iconRight, { color: rappel ? '#6DBEA1' : '#DBE4EA' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOption} activeOpacity={0.8} onPress={() => {
          setInstruction(true)
          navigation.navigate('TakingInstruction')
          }}>
          <View style={styles.optionLeft}>
        <FontAwesome name='edit' style={styles.iconLeft} />
          <Text style={styles.textButtonOption}>Ajouter des instructions ?</Text>
          </View>
          <FontAwesome name='check-circle' style={[styles.iconRight, { color: instruction ? '#6DBEA1' : '#DBE4EA' }]} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonSuivant} activeOpacity={0.8} onPress={() => handleSubmit()}>
        <Text style={styles.textButton}>Enregistrer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
  },
  buttonOption: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: '10%',
    width: '100%',
    paddingVertical: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textButtonOption: {
    
  },
  goBack: {
    width: '100%',
    marginTop: '4%',
    marginBottom: '4%',
    paddingLeft: '7%',
  },
  iconRight:{
    fontSize:20,
    marginRight: '6 %',
  },
  iconLeft:{
    color: '#36373E',
    fontSize:17,
    marginLeft: '10%',
    marginRight: '7%'
  },
  optionLeft: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
  
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
    marginTop: '10%',
    marginBottom: '5%',
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
});