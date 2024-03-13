import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function FlecheRetour({navigation}) {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} >
        <FontAwesome name='chevron-left' style={styles.icon} />
        </TouchableOpacity>
    );
}

export default FlecheRetour;

const styles = StyleSheet.create({
    icon:{
        fontSize: 24,
      }
});
