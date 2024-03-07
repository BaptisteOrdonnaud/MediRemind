import React ,{useState,useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, Dimensions,TouchableWithoutFeedback,useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/fr'; 
import MedicamentTraitement from '../components/MedicamentTraitement'
import StockMedicamentHome from '../components/StockMedicamentHome'
import Calendrier from '../components/Calendrier'
import moment from 'moment';


moment.locale('fr');
const windowDimensions = Dimensions.get('window');

export default function HomeScreen() {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom } = user;

const currentDate = moment().format('dddd D MMMM YYYY');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bonjour {prenom} 👋🏼</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
     <Calendrier/>
     <View style={styles.nombrePriseMedicament}>
     <View style={styles.nbrMedocsContainer}>
      <Text style={styles.nbrMedocsAujourdhui}>4</Text>
     </View>
      <Text style={styles.textPriseMedoc}>Médicaments a prendre aujourd'hui</Text>
     </View>
     <View>
      <Text style={styles.mainText}>Vos traitement du jour</Text>
     </View>
    <MedicamentTraitement/>
     <View>
      <Text style={styles.mainText}>votre inventaire</Text>
     </View>
     <StockMedicamentHome/>
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
    width:windowDimensions,
    height:windowDimensions
  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'column',
    width: '100%',
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft:20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:5,
    alignSelf:'flex-start',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    alignSelf:'flex-start'
  },
  nombrePriseMedicament: {
    width: '85%',
    height:'20%', 
    alignItems: 'center',
    backgroundColor:'#A69AFC',
    marginTop:'10%',
    borderRadius:15,
    marginLeft:'7%'
  },
textPriseMedoc: {
  fontSize:14,
  fontWeight:'bold',
  color:'white',
  justifyContent:'center',
  flexDirection:'column',
  alignItems:'center',
  marginTop:10,
},
nbrMedocsContainer:{
  backgroundColor:'white',
  width:90,
  height:90,
  alignItems:'center',
  justifyContent:'center',
  marginTop:35,
  borderRadius:45,
},
nbrMedocsAujourdhui:{
  color:'#A69AFC',
  fontSize:40,
  fontWeight:'bold'
},
mainText:{
  fontSize:24,
  fontWeight:'bold',
  marginLeft:'7%',
  marginTop:'10%'
},
});
