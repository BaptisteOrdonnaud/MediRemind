import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { deleteTraitement } from '../reducers/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DeleteMedicamentBtn({ userId, treatmentId }) {

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://10.9.1.92:3000/traitements`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ treatmentId, userId })
            });
            console.log('TEST FETCH', treatmentId)
            console.log('TEST FETCH user Id ', userId)

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du traitement');
            }

            dispatch(deleteTraitement(treatmentId));

        } catch (error) {
            console.error('Erreur lors de la suppression du traitement:', error.message);
        }
    };




    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, { width: windowWidth * 0.14, height: windowHeight * 0.07 }]} onPress={() => handleDelete()} >
            <FontAwesome name='trash-o' style={styles.icon} />
        </TouchableOpacity>

    );
}

export default DeleteMedicamentBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: windowHeight * 0.01,
        borderRadius: 45,
        marginBottom: windowHeight * 0.002,
    },
    icon: {
        color: '#A69AFC',
        fontSize: 48,
    }
});