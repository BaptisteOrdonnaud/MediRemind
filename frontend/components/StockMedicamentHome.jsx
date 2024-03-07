import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function StockMedicamentHome() {
    return (
        <View style={styles.medicamentInventaire}>
        <Text style={styles.disponibilité}> à racheter</Text>
        <Text style={styles.medicament}>Nom du médicament</Text>
        <Text style={styles.qtPrendre}>Quantité restante 3</Text>
     </View>
    );
}

export default StockMedicamentHome;

const styles = StyleSheet.create({
    medicamentInventaire: {
        width: '55%',
        height:'15%', 
        alignItems: 'flex-start',
        backgroundColor:'#FFF',
        marginTop:'7%',
        borderRadius:15,
        marginLeft:'7%'
      },
      disponibilité:{
        backgroundColor: '#E4B3D4',
        opacity:80,
        color: '#fff',
        paddingVertical: 7,
        paddingHorizontal:10,
        borderRadius: 15,
        marginLeft:'7%',
        marginTop:'5%'
      },
      medicament: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop:'4%',
        marginLeft:'7%'
    },
    qtPrendre:{
        fontSize:16,
        fontWeight:'bold',
        color:'#E4B3D4',
        marginTop:'4%',
        marginLeft:'7%'
    }
});