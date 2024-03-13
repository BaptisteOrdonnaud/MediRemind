import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function DrugTime(props) {
    return (
    <View style={[styles.container, { width: windowWidth * 0.9,height:windowHeight * 0.17 }]} >
       <View >
        <View style={styles.content}>
                 <View style={styles.bottomContent}>
                 <View style={styles.itemContainer}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
                    <View style={styles.textContainer}>
                        <Text style={styles.medicament}>Durée</Text>
                    </View>
                </View>
                    <View style={styles.textdurée}>
                        <Text style={styles.medicamentDebut}>Début du traitement : <Text style={styles.color}>{props.debut}</Text></Text>
                        <Text style={styles.medicamentFin}>Fin du traitement : <Text style={styles.color}>{props.fin}</Text></Text>
                    </View>
                </View>
        </View>
            
        </View>
        
     </View>
    );
}

export default DrugTime;

const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight * 0.15,
        borderRadius: 20,
        // backgroundColor:'red'
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
        height: windowHeight * 0.045,
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
    color:{
        color:'#7368BF',
        fontSize:16,
        fontWeight:'bold',
    }
});
