import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function MedicamentInformation(props) {
    return (
    <View style={[styles.container, { width: windowWidth * 0.9,height:windowHeight * 0.17 }]} >
       <View >
        <View style={styles.content}>
            <View style={styles.topContent}>
                <View style={styles.itemContainer}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
                    <View style={styles.textContainer}>
                        <Text style={styles.medicament}>nom du medicament</Text>
                    </View>
                </View>
                    <Text style={styles.medicamentComplet}>nom complet du medicament</Text>
            </View>
                 <View style={styles.middleContent}>
                 <View style={styles.itemContainer}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
                    <View style={styles.textContainer}>
                        <Text style={styles.medicament}>Détails de la prise</Text>
                    </View>
                </View>
                    <View style={styles.textHours}>
                        <Text style={styles.medicamentTime}>jours de prise nom du medicament</Text>
                        <Text style={styles.medicamentJour}>prise(s) par jour à : </Text>
                    </View>
                 </View>
                 <View style={styles.bottomContent}>
                 <View style={styles.itemContainer}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
                    <View style={styles.textContainer}>
                        <Text style={styles.medicament}>Durée</Text>
                    </View>
                </View>
                    <View style={styles.textdurée}>
                        <Text style={styles.medicamentDebut}>Début du traitement : </Text>
                        <Text style={styles.medicamentFin}>Fin du traitement : </Text>
                    </View>
                </View>
        </View>
            
        </View>
        
     </View>
    );
}

export default MedicamentInformation;

const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
    },
    content: {
        padding: '1%',
    },
    topContent: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.045,
        marginRight: windowWidth * 0.07,
        height:windowHeight * 0.15,
        width:windowWidth * 0.8,
        paddingLeft:windowWidth * 0.03
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
    medicamentComplet: {
        fontSize: 14,
        color: '#888',
        marginLeft: windowWidth * 0.07, // Ajuster la marge gauche selon vos besoins
        marginBottom: windowHeight * 0.02, // Ajouter une marge inférieure
        marginTop: windowHeight * 0.01
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
medicamentJour:{
    marginTop:windowHeight *0.025
},
    bottomContent: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.045,
        marginRight: windowWidth * 0.07,
        height:windowHeight * 0.2,
        width:windowWidth * 0.8,
        paddingLeft:windowWidth * 0.03
   },
   textdurée:{
    marginLeft: windowWidth * 0.045,
    marginVertical:windowHeight * 0.025
    },
    medicamentFin:{
        marginTop:windowHeight *0.025
    },
});
