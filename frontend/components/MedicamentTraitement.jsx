import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function MedicamentTraitement() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')}/>
                    <View>
                        <Text style={styles.medicament}>Nom du médicament</Text>
                        <Text style={styles.qtPrendre}>Quantité à prendre</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.heureDePrise}>9:00</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>J'ai pris ce médicament</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MedicamentTraitement;

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height:'17%',
        backgroundColor: '#FFF',
        marginTop: '7%',
        borderRadius: 15,
        marginLeft: '7%',
    },
    content: {
        padding: 10,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        borderRadius: 9999,
        width: 50,
        height: 50,
        marginRight: 10,
    },
    medicament: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtPrendre: {
        fontSize: 14,
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    heureDePrise: {
        backgroundColor: '#A69AFC',
        opacity:80,
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal:15,
        borderRadius: 10,
        marginRight: 10,
        marginLeft:10,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'#7368BF'
    },
    textButton: {
        color: '#7368BF',
        fontWeight: 'bold',
    },
});
