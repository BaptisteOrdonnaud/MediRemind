import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function SearchResult() {
    return (
        <View style={styles.container}>
            <Text>SEARCH RESULT</Text>
        </View>
    );
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E1DFFF',
    },
});
