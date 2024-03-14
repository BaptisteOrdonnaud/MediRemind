import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
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

import Task from '../components/Tasks';
import { addTask } from '../reducers/tasks';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MedicamentDescriptionScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tasks = useSelector((state) => state.tasks.value);
 

  const { prenom, nom, token } = user;

  const currentDate = moment().format('dddd D MMMM ');
  moment.locale('fr');

  const [medicaments, setMedicaments] = useState([]);
  const [details, setDetails] = useState([]);
  const [duree, setDuree] = useState([]);
  const [stock, setStock] = useState([]);
  const [medicamentName, setMedicamentName] = useState("");
  const [qtDispo, setQtDispo] = useState('');
  const [qtRappel, setQtRappel] = useState('');

  const [task, setTask] = useState('');
  const [urgent, setUrgent] = useState(false);


  const addToList = () => {
    const isExisting = tasks.some(task => task.task === medicamentName);

    if (isExisting) {
      Alert.alert('Médicament déjà ajouté');
      return;
    }

    const newTask = {
      task: medicamentName,
      isUrgent: urgent,
    };

    dispatch(addTask(newTask));


    if (!isExisting) {
      const allTasks = tasks.map((task, id) => {
        return <Task key={id} task={task.medicamentName} isUrgent={task.isUrgent} />;
      })
    }
    navigation.navigate('Liste', { medicamentName });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };


  useEffect(() => {
    fetch(`http://10.9.1.94:3000/traitements/${token}`)
      .then(response => response.json())
      .then(drug => {
        setMedicaments(drug.traitements);
        setDetails(drug.traitements)
        setDuree(drug.traitements)
        setStock(drug.traitements)
        setMedicamentName(drug.traitements[0].medicaments[0].product_name);
        setQtDispo(drug.traitements[0].qtDispo);
        setQtRappel(drug.traitements[0].qtRappel);

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
        {stock.map((stockItem, index) => (
          <Stock
            key={index}
            qtDispo={stockItem.qtDispo}
            qtRappel={stockItem.qtRappel}
            openModal={openModal}
            onPress={() => setModalVisible(true)}
          />))}
      </View>

      <View style={styles.btnContainer}>
        <DeleteMedicamentBtn />
      </View>
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
              <FontAwesome name='remove' style={styles.icon} onPress={() => setModalVisible(false)} />
            </View>
            <View style={styles.contenue}>
              <Text style={styles.modalText}>{medicamentName}</Text>
              <Text>Il reste {qtRappel} comprimés</Text>
              <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8} onPress={() => addToList()}>
                <Text style={styles.textButton}>Ajouter a ma liste</Text>
                <View style={styles.btn}>
                  <FontAwesome name='plus' style={styles.icon} />
                </View>
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
    alignItems: 'center',
    flexDirection: 'column',

  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'row',
    width: '100%',
    height: '7%',
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
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '70%',
    height: '40%',
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
  remove: {
    alignSelf: 'flex-start',

  },
  buttonSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: '25%',
    width: '100%',
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: '#7368BF',
    borderRadius: 10,
  },
  textButton: {
    alignSelf: 'center',
    flex: 1,
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  contenue: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },

  icon: {
    color: '#A69AFC',
    fontSize: 20,
  },

  btn: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 23,
    height: 23,
    borderRadius: 45,
  },

})
