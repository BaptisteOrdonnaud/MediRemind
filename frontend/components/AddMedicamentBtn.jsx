import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AddMedicamentBtn() {
    return (
        <View style={[styles.container, { width: windowWidth * 0.65,height:windowHeight * 0.16 }]}>
          
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    
                    <FontAwesome name='plusw' style={styles.icon} />
                </TouchableOpacity>
            </View>
       
    );
}

export default AddMedicamentBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.07,
        marginRight: windowWidth * 0.07,
        },
        button:{
            width: windowWidth * 0.85,
            height:windowHeight * 0.17, 
            alignItems: 'center',
            backgroundColor:'#A69AFC',
            marginTop:windowHeight * 0.026,
            borderRadius:15,
            marginLeft:windowWidth * 0.07
        },
        icon:{
            
        }
});
