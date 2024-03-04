    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';

    export default function AddDrugsScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.IgnoreBtn} activeOpacity={0.8}  onPress={() => navigation.navigate('TabNavigator')}>
            <Text style={styles.textButton}>Ignorer</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={require('../assets/TemplateImage.png')}/>
        <Text>TITRE AJOUT DE MEDICAMENT</Text>
        <TouchableOpacity style={styles.buttonSignIn} activeOpacity={0.8}  onPress={() => navigation.navigate('AddDrugs-part2')}>
            <Text style={styles.textButton}>Ajout médicament</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1DFFF',
        alignItems: 'center',
    },
    image: {
        marginTop: 30,
        marginBottom: 80,
    },
    buttonSignIn: {
        alignItems: 'center',
        paddingTop: 8,
        width: '80%',
        marginTop: 30,
        backgroundColor: '#A69AFC',
        borderRadius: 10,
    },
    IgnoreBtn: {
        backgroundColor:'transparent',
        position:'absolute',
        top: 70,
        right: 30,
    }
    });