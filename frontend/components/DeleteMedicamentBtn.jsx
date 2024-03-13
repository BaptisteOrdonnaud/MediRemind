import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DeleteMedicamentBtn({ navigation }) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, { width: windowWidth * 0.14, height: windowHeight * 0.07 }]} >
            <FontAwesome name='trash-o' style={styles.icon} />
        </TouchableOpacity>

    );
}

export default DeleteMedicamentBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.004,
        borderRadius: 45,
        marginBottom: windowHeight * 0.02,
    },
    icon: {
        color: '#A69AFC',
        fontSize: 54,
    }
});