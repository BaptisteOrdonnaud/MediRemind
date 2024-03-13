import { StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';


function TestModal(props, i, navigation) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed")
                }}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Hello
                        </Text>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text>Modal</Text>
            </Pressable>
        </View>
    );
}

export default TestModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'pink',
    },

});
