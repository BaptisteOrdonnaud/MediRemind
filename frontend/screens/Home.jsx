import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');



export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom } = user;

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
        <Text style={styles.headerText}>Hello {prenom + ' ' + nom}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.todayTreatment}>
          <Text>Traitement à prendre aujourd'hui!</Text>
        </View>
        <View style={styles.treatmentContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.treatment}>
              <Text>Traitement {item}</Text>
              <TouchableOpacity style={styles.buttonModif} activeOpacity={0.8}>
                <Text style={styles.textButton}>Confirmer la prise</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="light" />
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
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatmentContainer: {
    width: 350,
    marginTop: 20,
    borderRadius: 10,
  },
  treatment: {
    backgroundColor: 'white',
    width: 350,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Ajout de la position relative pour que le positionnement absolu fonctionne
  },
  buttonModif: {
    position: 'absolute', // Position absolue par rapport au parent (traitement)
    bottom: 10, // Marge depuis le bas
    right: 10, // Marge depuis la droite
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 170, // Largeur du bouton
    borderRadius: 10,
    borderColor: '#7368BF',
    borderWidth: 1,
  },
  textButton: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
