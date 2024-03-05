import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const prenom = user.prenom
  const nom = user.nom

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
          <Text style={styles.headerText}>Hello {prenom + ' ' + nom}</Text>
        </View>
        <View style={styles.todayTreatment}>
          <Text>Traitement à prendre aujourd'hui!</Text>
        </View>
        <View style={styles.treatmentContainer}>

<View style={styles.treatment}>
  <Text>c'est à la place de ce text que les medicament arrive</Text>
  <TouchableOpacity style={styles.buttonModif} activeOpacity={0.8}  > 
        <Text style={styles.textButton}>Confirmer la prise</Text>
      </TouchableOpacity>
</View>


        </View>
        <StatusBar style="auto" />
      </View>
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
    backgroundColor: '#F0EFFF',
    flexDirection: 'row',
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 9999,
  },
  todayTreatment: {
    backgroundColor: 'white',
    width: 350,
    height: 200,
    marginTop: 200, // Adjust margin top as needed
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  treatmentContainer:{
    width: 350,
    height: '100%',
    marginTop: 20, // Adjust margin top as needed
    borderRadius: 10,
    
  },
  treatment: {
    backgroundColor: 'white',
    width: 350,
    height: 200,
    marginTop: 20, // Adjust margin top as needed
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonModif:{
    alignItems: 'center',
    paddingTop: 12,
    height: 45,
    width: 200,
    marginTop: '10%',
    backgroundColor: '#7368BF',
    borderRadius: 10,
    
  },
  textButton: {
    flex: 1,
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  }
});
