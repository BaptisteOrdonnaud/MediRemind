import React from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, Alert, Pressable, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Stock({ qtDispo, qtRappel, openModal }) {

    const textColor = qtDispo >= qtRappel ? '#6DBEA1' : '#EDA774';


    return (
        <View style={[styles.container, { width: windowWidth * 0.9 }]}>

            <View style={styles.content}>
                <View style={styles.topContent}>
                    <View style={styles.itemContainer}>
                        <View style={[styles.disponibiliteContainer, { backgroundColor: textColor }]}>
                            <Text style={styles.disponibilite}>{qtRappel}</Text>
                        </View>
                        <TouchableOpacity onPress={openModal}>
                            <Text style={styles.medicament}>Comprimés restants </Text>
                            <FontAwesome name='chevron-right' style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight * 0.04,
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
        height: windowHeight * 0.08,
        width: windowWidth * 0.8,
        paddingLeft: windowWidth * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight * 0.004,
    },
    disponibiliteContainer: {
        borderRadius: 45,
        paddingVertical: windowHeight * 0.004,
        paddingHorizontal: windowHeight * 0.012,
    },
    disponibilite: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
    medicament: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: windowWidth * 0.09
    },
    icon: {
        fontSize: 20,
        marginLeft: windowWidth * 0.04,
    }
});
