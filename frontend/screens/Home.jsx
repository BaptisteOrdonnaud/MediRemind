import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen(props) {
  return (
   <SafeAreaView style={styles.container}>
   <View style={styles.container}>
<View style={styles.headerContainer}>
<Image style={styles.image} source={require('../assets/TemplateImage.png')} />
<Text style={styles.headerText}>Hello Baptiste</Text>
</View>
      <View style={styles.calendarContainer}>
      <Calendar
          current={new Date()} // Affiche la semaine actuelle
          style={{ height: 100, width: '100%' }} // Hauteur pour une semaine et largeur totale
          hideExtraDays={true} // Masque les jours des autres semaines
          hideDayNames={false} // Affiche les noms des jours
          firstDay={1} // Démarre la semaine avec Lundi
          theme={{
            arrowColor: '#7368BF', // Couleur des flèches de navigation
            textSectionTitleColor: '#7368BF', // Couleur du titre de la section de texte
            todayTextColor: '#7368BF', // Couleur du texte pour la date d'aujourd'hui
          }}
        />
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
  },
  headerContainer: {
    backgroundColor:'#7368BF',
    flexDirection:'row',
    width:'100%',
    height:90,
    justifyContent:'center',
    alignItems:'center',
top:50,
  },
  headerText: {
    fontSize:20,
    fontWeight:'bold',
    marginLeft:'auto',
    marginRight:'auto',
  },
  image: {
    width: 50,
    height:50,
    marginLeft:10,
   },
   calendarContainer: {
    width: '100%',
    alignItems: 'center', // Centre le calendrier horizontalement
    marginTop: 20, // Espacement entre l'en-tête et le calendrier
   },
});