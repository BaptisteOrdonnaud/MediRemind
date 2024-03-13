import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Switch } from 'react-native';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setdelete } from '../reducers/tasks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Task({ task, isUrgent }) {
    const dispatch = useDispatch();
    const [done, setDone] = useState(false);

    console.log(done)

    const handleDelete = () => {
        dispatch(setdelete(task));
    };


    return (
        <View style={styles.task}>
            <View style={styles.urgentContent}>
                <Switch
                    trackColor={{ true: "#A69AFC" }}
                    thumbColor={done ? "#E1DFFF" : "#A69AFC"}
                    onValueChange={(value) => setDone(value)}
                    value={done}
                    style={styles.urgentBtn}
                />
                <Text style={styles.urgentText}>FAIT</Text>
            </View>
            <View style={styles.taskContent}>
                {isUrgent && <View style={styles.urgentTextList}>
                    <Text style={[styles.urgent, { color: 'white', fontSize: 12 }]}>URGENT</Text>
                </View>}
                <Text style={[styles.taskText, done && styles.strikeThrough]}>{task}</Text>
                <TouchableOpacity activeOpacity={0.8} style={[styles.container, { width: windowWidth * 0.18, height: windowHeight * 0.09 }]} onPress={() => handleDelete()} >
                    <FontAwesome name='trash-o' style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    task: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        marginBottom: 15,
    },
    taskSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskText: {
        fontSize: 16,
        margin: 5,

    },
    urgentContent: {
        flexDirection: 'column',
        margin: 15,
        padding: 5,
    },
    taskContent: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between', // Centrer horizontalement
        alignItems: 'center',
        padding: 7,
    },
    urgentText: {
        fontSize: 12,
        marginLeft: 5,
        marginTop: 5,
        textAlign: 'center',
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
    },
    urgentTextList: {
        justifyContent: 'center',
        fontSize: 12,
        backgroundColor: '#A69AFC',
        padding: 5,
        borderRadius: 10,
        margin: 2,
    },
    icon: {
        color: '#A69AFC',
        fontSize: 30,
    },
});
