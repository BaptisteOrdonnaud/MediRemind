import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch,useSelector } from 'react-redux';
import { enregistrerAreTaken, updateIsTook } from '../reducers/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MedicamentTraitement(props) {

    const user = useSelector((state) => state.user.value);
    const { idUser } = user;
    const dispatch = useDispatch();

   
    const [medicationTaken, setMedicationTaken] = useState(false);

    const handleMedicationTaken = () => {
        
        fetch(`http://10.9.1.94:3000/traitements/markMedicationTaken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: idUser,
                treatmentId: props.treatmentId
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la mise à jour du médicament pris');
                }
            console.log(response)
              return response.json()
                
            })
            .then(() => {
                setMedicationTaken(true);
                dispatch(updateIsTook(true))

            })
            
    };
    
    return (
        <View style={[styles.container, { width: windowWidth * 0.75,height:windowHeight * 0.167 }]}>
            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.medicament}>{props.drugName}</Text>
                        <Text style={styles.qtPrendre}>Quantité à prendre: {props.dosage}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.heureDePrise}>{props.heure}</Text>
                {!props.isTook && (
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => handleMedicationTaken()}>
                    <Text style={styles.textButton}>J'ai pris ce médicament</Text>
                    <FontAwesome name='check-circle-o' style={styles.icon} />
                </TouchableOpacity>)}
            </View>
        </View>
    );
}

export default MedicamentTraitement;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.07,
        marginRight: windowWidth * 0.07,
        
    },
    content: {
        padding: '1%',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight * 0.01,
    },
    image: {
        borderRadius: 9999,
        width:windowWidth * 0.11 ,
        height: windowHeight *0.05,
        marginRight: windowWidth *0.03,
        marginLeft:windowWidth *0.03
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
        paddingTop:windowHeight *0.001 ,
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal:windowWidth *0.05,
        paddingVertical:windowHeight *0.02,
        marginBottom:windowHeight *0.07,
    
    },
    heureDePrise: {
        backgroundColor: 'rgba(166, 154, 252, 0.8)',
        color: '#fff',
        paddingVertical: windowHeight *0.005,
        paddingHorizontal:windowWidth *0.02,
        borderRadius: 10,
        marginRight: windowWidth *0.06,
        marginLeft:windowWidth *0.02,
        overflow:'hidden'
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: windowHeight *0.002,
        paddingHorizontal: windowWidth *0.02,
        borderRadius: 10,
        borderWidth:1,
        borderColor:'#7368BF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textButton: {
        color: '#7368BF',
        fontWeight: 'bold',
    },
    icon:{
        color:'#7368BF',
        paddingLeft:windowWidth *0.009,
        fontSize:20,
    }
});
