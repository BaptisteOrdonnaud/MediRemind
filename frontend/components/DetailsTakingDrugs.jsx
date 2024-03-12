import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function DetailsTakingDrugs(props) {

    const getSelectedDays = () => {
        const selectedDays = [];
        for (const day in props.frequence) {
            if (props.frequence[day]) {
                selectedDays.push(day);
            }
        }
        return selectedDays.join(', '); // Formater les jours sélectionnés en une chaîne de texte
    };


    return (
    <View style={[styles.container, { width: windowWidth * 0.9,height:windowHeight * 0.17 }]} >
       <View >
        <View style={styles.content}>
             <View style={styles.middleContent}>
                 <View style={styles.itemContainer}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
                    <View style={styles.textContainer}>
                        <Text style={styles.medicament}>Détails de la prise</Text>
                    </View>
                </View>
                    <View style={styles.textHours}>
                        <Text style={styles.medicamentTime}>{props.frequence}</Text>
                        <Text style={styles.medicamentJour}>{props.nbre} prise(s) par jour à :  </Text>
                        <Text style={styles.time}>{props.heure}</Text>
                    
                    </View>
                 </View>
                
        </View>
            
        </View>
        
     </View>
    );
}

export default DetailsTakingDrugs;

const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight * 0.002,
        borderRadius: 20,
    },
    content: {
        padding: '1%',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight * 0.02,
    },
    image: {
        borderRadius: 9999,
        width: windowWidth * 0.1,
        height: windowHeight * 0.05,
        marginRight: windowWidth * 0.03,
        marginLeft: windowWidth * 0.018,
    },
    textContainer: {
        flex: 1,
    },
    medicament: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    middleContent: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.045,
        marginRight: windowWidth * 0.07,
        height:windowHeight * 0.27,
        width:windowWidth * 0.8,
        paddingLeft:windowWidth * 0.03
    },
textHours:{
marginLeft: windowWidth * 0.045,
marginVertical:windowHeight * 0.025
},
medicamentTime:{
color:'#7368BF',
fontSize:14,
fontWeight:'bold'
},
medicamentJour:{
    marginTop:windowHeight *0.025
},
  time:{
    color:'#7368BF',
    fontSize:16,
    fontWeight:'bold',
    marginTop:windowHeight * 0.01
  } 
});
