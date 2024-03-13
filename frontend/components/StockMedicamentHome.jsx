import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function StockMedicamentHome(props) {

    const getColorAndAvailability = () => {
        if (props.qtRestant >= props.qtRappel) {
            return { color: '#6DBEA1', availability: 'En stock' };
        } else {
            return { color: '#E4B3D4', availability: 'À racheter' };
        }
    };

    const { color, availability } = getColorAndAvailability();  

    return (
        <View style={styles.container}>
            <Text style={[styles.disponibilite, { backgroundColor: color }]}>{availability}</Text>
            <Text style={styles.medicament}>{props.drugName}</Text>
            <Text style={[styles.qtPrendre, { color: color }]}>Quantité restante : {props.qtRestant}</Text>
        </View>
    );
}

export default StockMedicamentHome;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginHorizontal: windowWidth * 0.07,
        padding: windowWidth * 0.03,
        marginTop: windowHeight * 0.01,
        height:windowHeight * 0.15,
        width: windowWidth *0.6
    },
    disponibilite: {
        backgroundColor: '#E4B3D4',
        color: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginTop: 5,
        alignSelf: 'flex-start', // Align text within the container
        overflow:'hidden'
    },
    medicament: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 9,
    },
    qtPrendre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E4B3D4',
        marginTop: 9,
    },
});
