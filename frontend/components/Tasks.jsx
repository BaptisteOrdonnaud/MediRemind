import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Switch } from 'react-native';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setdelete } from '../reducers/tasks'; // Assurez-vous de l'import correct de setdelete
import DeleteMedicamentBtn from '../components/DeleteMedicamentBtn'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Task({ task }) {
    const dispatch = useDispatch();
    const [done, setDone] = useState(false);
    const [urgent, setUrgent] = useState(false);

    console.log(done)

    const handleDelete = () => {
        dispatch(setdelete(task)); // Correction de la syntaxe ici
    };

    let style = {}
    if (done) {
        style = { textDecoration: 'line-through' }
    }
    return (
        <View style={styles.task}>
            <View style={styles.taskSection}>
                <View>
                    <Text style={[styles.taskText, style]}>{task}</Text> // Utilisation de Text pour afficher la tâche
                    <View style={styles.urgentCheckbox}>
                        <Switch
                            value={urgent}
                            onValueChange={(value) => setUrgent(value)}
                        />
                        <Text style={styles.urgentText}>URGENT</Text>
                    </View>
                </View>
                <DeleteMedicamentBtn onPress={handleDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    taskText: {
        fontSize: 16,
        marginRight: 10,
    },
    urgentCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    urgentText: {
        fontSize: 14,
        marginLeft: 5,
    },
});
