import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function TreatmentScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom } = user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
        <Text style={styles.headerText}>Hello {prenom + ' ' + nom}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.mainText}>Traitement</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Retirer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.treatmentContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.buttonModifContainer}>
              <TouchableOpacity style={styles.buttonModif} activeOpacity={0.8}>
                <Text style={styles.textButton}>Medicament</Text>
                <Text>Description</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // height:Dimensions.get('window').height,
  
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
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 9999,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20, // Ajout d'une marge en bas pour séparer les boutons des médicaments
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 200,
    borderRadius: 10,
    borderColor: '#7368BF',
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  textButton: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  treatmentContainer: {
    width: 350,
    alignItems: 'center',
    width:Dimensions.get('screen').width
  },
  buttonModifContainer: {
    marginTop: 10,
  },
  buttonModif: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 400,
    borderRadius: 10,
    borderColor: '#7368BF',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
});
