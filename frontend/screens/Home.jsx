import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, Modal, Alert, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'moment/locale/fr';
import MedicamentTraitement from '../components/MedicamentTraitement'
import StockMedicamentHome from '../components/StockMedicamentHome'
import Calendrier from '../components/Calendrier'
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


moment.locale('fr');
const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ route, navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, token, isLoaded, idUser, isTook } = user;

  const currentDate = moment().format('dddd D MMMM YYYY');
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
  const [medicaments, setMedicaments] = useState([]);
  const [quantite, setQuantite] = useState([])
  const [verrif, setVerrif] = useState(null)

  const [modalVisible, setModalVisible] = useState(false);

  const medicamentsToTakeToday = medicaments.filter(traitement => {
    const rappelDate = moment(traitement.rappel.date).format('DD-MM-YYYY');
    return rappelDate === selectedDate;
  });

  const nbrMedocsAujourdhui = medicamentsToTakeToday.filter(traitement => !traitement.isTook).length;

  // console.log(route)

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
    
  }, [isLoaded, isTook]);

  useEffect(() => {
    if (route.params && route.params.needModal) {
      setModalVisible(true);
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container, { width: windowWidth * 1, height: windowHeight * 1 }]}>
      {/* <ScrollView> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bonjour {prenom} 👋🏼</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <Calendrier style={styles.date} onSelectDate={date => setSelectedDate(date)} />
      <View style={styles.nombrePriseMedicament}>
        <View style={styles.nbrMedocsContainer}>
          <Text style={styles.nbrMedocsAujourdhui}>{nbrMedocsAujourdhui}</Text>
        </View>
        <Text style={styles.textPriseMedoc}>Médicaments à prendre aujourd'hui</Text>
      </View>
      <View>
        <Text style={styles.mainText}>Vos traitements du jour</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerMedicament}>
        {medicaments && medicaments.map((traitement, index) => (
          <MedicamentTraitement
            key={index}
            idUser={idUser}
            treatmentId={traitement._id}
            isTook={traitement.isTook}
            drugName={traitement.medicaments[0].product_name}
            dosage={traitement.rappel.dose}
            heure={moment(traitement.rappel.heure).format('HH:mm')}
          />
        ))}
      </ScrollView>

      <View>
        <Text style={styles.mainText}>Votre inventaire</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerStock}>
        {quantite && quantite.map((data, index) => (
          <StockMedicamentHome
            key={index}
            drugName={data.medicaments[0].product_name}
            qtRestant={data.qtDispo}
            qtRappel={data.qtRappel}
          />))}
      </ScrollView>
      {/* </ScrollView> */}
      <StatusBar style="auto" />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onTouchOutside={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.remove}>
              <FontAwesome name='remove' style={styles.iconRemove} onPress={() => setModalVisible(false)} />
            </View>
            <View style={styles.contenue}>
              <Text style={styles.modalText}><Text style={styles.nomMedoc}>{user.nomMedoc}</Text> ajouté avec succès!</Text>
              <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8} onPress={() => { navigation.navigate('AddDrugs-part2'); setModalVisible(false); }}>
                <Text style={styles.textButton}>Nouveau médicament</Text>
                <FontAwesome name='plus-circle' style={styles.icon} />
              </TouchableOpacity>
            </View>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
            </Pressable>
          </View>
        </View>
      </Modal>
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
  nomMedoc: {
    color: '#7368BF'
  },
  date: {
    width: windowWidth * 1,
    height: windowHeight * 1
  },
  nombrePriseMedicament: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.16,
    alignItems: 'center',
    backgroundColor: '#A69AFC',
    marginTop: windowHeight * 0.02,
    borderRadius: 15,
    marginLeft: windowWidth * 0.07,
    marginBottom: '2%',
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
    marginTop: windowHeight * 0.006,
    
  },
  containerMedicament: {
    height: windowHeight * 0.19,
    flexDirection: 'row',
    // backgroundColor:'yellow',
    paddingVertical: windowWidth * 0.001,
    paddingHorizontal: windowHeight * 0.008,
  },
  containerStock: {
    // height: windowHeight * 0.3,
    flexDirection: 'row',
    // backgroundColor:'red',
    // paddingVertical: windowHeight * 0.01,
    // paddingHorizontal: windowWidth * 0.008
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '85%',
    height: '30%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonSignIn: {
    justifyContent: 'center',
    height: '25%',
    marginTop: '10%',
    backgroundColor: '#7368BF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textButton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
    color: '#fff'
  },
  remove: {
    alignSelf: 'flex-end',
  },
  iconRemove: {
    color: '#A69AFC',
    fontSize: 20,
  },
});
