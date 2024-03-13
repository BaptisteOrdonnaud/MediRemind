import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { setdelete } from '../reducers/tasks';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DeleteMedicamentBtn({ navigation,task }) {

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(setdelete(task));
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