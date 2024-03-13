import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Stock(props) {
    const textColor = props.qtDispo >= props.qtRappel ? '#6DBEA1' : '#EDA774';

    return (
        <View style={[styles.container, { width: windowWidth * 0.9 }]}>
            <View style={styles.content}>
                <View style={styles.topContent}>
                    <View style={styles.itemContainer}>
                        <View style={[styles.disponibiliteContainer, { backgroundColor: textColor }]}>
                            <Text style={styles.disponibilite}>{props.qtDispo}</Text>
                        </View>
                        <Text style={styles.medicament}>Comprimés restants </Text>
                    <FontAwesome name='chevron-right' style={styles.icon} />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Stock;

const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight * 0.04,
        borderRadius: 20,
    },
    content: {
        padding: '1%',
    },
    topContent: {
        backgroundColor: '#FFF',
        marginTop: windowHeight * 0.02,
        borderRadius: 20,
        marginLeft: windowWidth * 0.045,
        marginRight: windowWidth * 0.07,
        height: windowHeight * 0.12,
        width: windowWidth * 0.8,
        paddingLeft: windowWidth * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight * 0.004,
    },
    disponibiliteContainer: {
        borderRadius: 45,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    disponibilite: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
    medicament: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: windowWidth * 0.09
    },
    icon:{
        fontSize:20,
        marginLeft:windowWidth * 0.04,
    }
});
