import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch,useSelector } from 'react-redux';
import { enregistrerAreTaken } from '../reducers/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MedicamentDansLeTabTraitement({ drugId, drugName, dosage, heure, navigation }) {
    const [medicationTaken, setMedicationTaken] = useState(false);
    const areTaken = useSelector(state => state.user.value.areTaken);
    const dispatch = useDispatch();
    
    const handleMedicationTaken = () => {
        setMedicationTaken(true);
        
    };

    const handleMedicationNotTaken = () => {
        setMedicationTaken(false);
      
    };

    return (
        <TouchableOpacity 
            style={styles.container} 
            activeOpacity={0.8} 
            onPress={() => navigation.navigate('MedicamentDescription', {
                drugId: drugId,
                drugName: drugName,
                dosage: dosage,
                heure: heure
            })}
        >
            <View style={[styles.container, { width: windowWidth * 0.8, height: windowHeight * 0.15 }]}>
                <View style={styles.content}>
                    <View style={styles.leftContent}>
                        <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
                        <View style={styles.textContainer}>
                            <Text style={styles.medicament}>{drugName}</Text>
                            <Text style={styles.qtPrendre}>Quantité à prendre: {dosage}</Text>
                        </View>
                        {medicationTaken ? (
                            <FontAwesome name='check-circle-o' style={[styles.iconCheck]} />
                        ) : (
                            <FontAwesome name='clock-o' style={styles.iconWait} />
                        )}
                        <Text style={styles.heureDePrise}>{heure}</Text>
                    </View>
                </View>
                {!medicationTaken && (
                    <View style={styles.bottomContent}>
                        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleMedicationTaken}>
                            <Text style={styles.textButton}>J'ai pris ce médicament</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPrendPas} activeOpacity={0.8} onPress={handleMedicationNotTaken}>
                            <Text style={styles.textButtonPas}>Je ne le prendrai pas</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

export default MedicamentDansLeTabTraitement;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.045,
        marginRight: windowWidth * 0.07,
    },
    content: {
        paddingVertical: windowHeight * 0.011,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        borderRadius: 9999,
        width: windowWidth * 0.15,
        height: windowHeight * 0.07,
        marginRight: windowWidth * 0.02,
        marginLeft: windowWidth * 0.018
    },
    textContainer: {
        flex: 1,
    },
    medicament: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtPrendre: {
        fontSize: 14,
        paddingTop: windowHeight * 0.001,
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: windowWidth * 0.002,
        paddingVertical: windowHeight * 0.01,
    },
    heureDePrise: {
        backgroundColor: 'rgba(166, 154, 252, 0.8)',
        color: '#fff',
        paddingVertical: windowHeight * 0.005,
        paddingHorizontal: windowWidth * 0.02,
        borderRadius: 10,
        marginRight: windowWidth * 0.01,
        marginLeft: windowWidth * 0.02,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: windowHeight * 0.002,
        paddingHorizontal: windowWidth * 0.02,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7368BF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonPrendPas: {
        backgroundColor: '#fff',
        paddingVertical: windowHeight * 0.002,
        paddingHorizontal: windowWidth * 0.01,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E4B3B3',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: windowWidth * 0.04
    },
    textButton: {
        color: '#7368BF',
        fontWeight: 'bold',
    },
    textButtonPas: {
        color: '#E4B3B3',
        fontWeight: 'bold',
    },
    iconWait: {
        color: '#EDA774',
        paddingLeft: windowWidth * 0.009,
        fontSize: 20,
    },
    iconCheck: {
        color: '#6DBEA1',
        paddingLeft: windowWidth * 0.009,
        fontSize: 24,
    },
});
