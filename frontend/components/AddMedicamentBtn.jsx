import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AddMedicamentBtn({ navigation }) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, { width: windowWidth * 0.13, height: windowHeight * 0.06 }]} onPress={() => navigation.navigate('AddDrugs-part2')}>
            <FontAwesome name='plus' style={styles.icon} />
        </TouchableOpacity>

    );
}

export default AddMedicamentBtn;

const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: windowHeight * 0.026,
        borderRadius: 999,
        // marginBottom: windowHeight * 0.04,
    },
    icon: {
        color: '#A69AFC',
        fontSize: 32,
    }
});
