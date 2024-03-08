import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function StockMedicamentHome(props) {
    return (
        <View style={[styles.container, { width: windowWidth * 0.52, height: windowHeight * 0.15 }]}>
            <Text style={styles.disponibilite}>À racheter</Text>
            <Text style={styles.medicament}>{props.drugName}</Text>
            <Text style={styles.qtPrendre}>Quantité restante : {props.qtRestant}</Text>
        </View>
    );
}

export default StockMedicamentHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.01,
        borderRadius: 15,
        marginLeft: windowWidth * 0.07,
        paddingHorizontal:windowWidth *0.03 ,
       paddingVertical:windowHeight *0.009,
    }, 
    disponibilite: {
        backgroundColor: '#E4B3D4',
        color: '#fff',
        paddingVertical: windowHeight *0.006,
        paddingHorizontal: windowWidth *0.02,
        borderRadius: 15,
        marginTop: windowHeight *0.005,
        alignItems:'center',
        width: windowWidth * 0.25
    },
    medicament: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: windowHeight *0.009,
    },
    qtPrendre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E4B3D4',
        marginTop: windowHeight *0.009 ,
    },
});
