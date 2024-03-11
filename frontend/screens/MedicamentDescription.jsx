import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteMedicamentBtn from '../components/DeleteMedicamentBtn';
import MedicamentInformation from '../components/MedicamentInformation';

export default function MedicamentDescriptionScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Nom du médicament</Text>
      </View>
      <View style={styles.contentContainer}>
        <MedicamentInformation/>
      </View>
      <View>
   <DeleteMedicamentBtn/>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1DFFF',
        alignItems: 'center',
        flexDirection: 'column',
        height:Dimensions.get('screen').height,
        width:Dimensions.get('screen').width
      },
      headerContainer: {
        backgroundColor: '#E1DFFF',
        flexDirection: 'row',
        width: '100%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
         
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
});