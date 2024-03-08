    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import SvgUri from 'react-native-svg-uri';
    import FontAwesome from 'react-native-vector-icons/FontAwesome';

    export default function AddDrugsScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.IgnoreBtn} activeOpacity={0.8}  onPress={() => navigation.navigate('TabNavigator')}>
            <Text style={styles.buttonIgnorer}>Ignorer</Text>
        </TouchableOpacity>
        <SvgUri
        width="250"
        height="250"
        source={require('../assets/reminder.svg')}
      />
        <Text style={styles.title}>Ajoutez votre premier médicament afin d'être averti par un rappel</Text>
        <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('AddDrugs-part2')}>
            <Text style={styles.textButton}>Ajouter un médicament</Text>
            <FontAwesome name='plus-circle' style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.legal}>En continuant, vous acceptez nos Termes et que vous avez lu notre Politique de confidentialité</Text>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1DFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '20%'
    },
    buttonSignIn: {
        alignItems: 'center',
        height: 45,
        width: 286,
        marginTop: '10%',
        backgroundColor: '#7368BF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    IgnoreBtn: {
        marginTop: '7%',
        marginBottom: '14%',
        marginLeft: '75%',
    },
    icon: {
        fontSize: 20,
        marginLeft: 10,
        color: '#fff'
    },
    legal: {
        fontSize: 12,
        paddingHorizontal: '5%',
        marginTop: '35%',
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#fff',
        height: 45,
        width: 286,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 3,
      },
});