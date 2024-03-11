import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { enregistrerTraitements } from '../reducers/user';

function SearchResult(props, i, navigation) {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.drugContainer} onPress={() => {
                console.log(`ID : ${props.id}, nom: ${props.drugName}`)
                dispatch(enregistrerTraitements({ idMedoc: props.id }));
                props.navigation.navigate('Frequence')
            }}>
                <Text style={styles.drugTitle}>{props.drugName}</Text>
                <FontAwesome key={i} name='chevron-right' style={styles.icon} />

            </TouchableOpacity>
        </View>
    );
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: '5%',
        borderRadius: 10,
        marginBottom: '5%'

    },
    drugContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    drugTitle: {
        fontSize: 16,
        paddingHorizontal: '5%'
    },
    icon: {
        fontSize: 20,
        color: '#A69AFC',
    },
});
