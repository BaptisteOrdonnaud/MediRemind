import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MedicamentTraitement(props) {



    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Image style={styles.image} source={require('../assets/TemplateImage.png')}/>
                    <View>
                        <Text style={styles.medicament}>{props.drugName}</Text>
                        <Text style={styles.qtPrendre}>{props.dosage}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.heureDePrise}>{props.heure}</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>J'ai pris ce médicament</Text>
                    <FontAwesome name='check-circle-o' style={styles.icon} />
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
        padding: '1%',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%'
    },
    image: {
        borderRadius: 9999,
        width: '15%',
        height: '100%',
        marginRight: '3%',
        marginLeft:'3%'
    },
    medicament: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtPrendre: {
        fontSize: 14,
        paddingTop:'4%'
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenely',
        padding: '7%',
    },
    heureDePrise: {
        backgroundColor: 'rgba(166, 154, 252, 0.8)',
        color: '#fff',
        paddingVertical: '1.5%',
        paddingHorizontal:'5%',
        borderRadius: 10,
        marginRight: '5%',
        marginLeft:'1%',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: '1.5%',
        paddingHorizontal: '2%',
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
        paddingLeft:'3%',
        fontSize:20,
    }
});
