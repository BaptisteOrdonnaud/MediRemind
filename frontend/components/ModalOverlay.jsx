import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ModalOverlay({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={onPress}
        />
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
