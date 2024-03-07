import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddDrugsRestScreen({ navigation }) {
  const [drug, setDrug] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  // onPress={() => navigation.navigate('Frequence')}

  const handleSearch = (value) => {
    fetch(`http://10.9.1.94:3000/medicaments/${value}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        // console.log(data)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name='remove' style={styles.icon} />
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { display: isFocused ? 'none' : 'flex' }]}> Quel médicament souhaitez-vous ajouter?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Nom "
          onChangeText={(value) => {
            setDrug(value)
            handleSearch(value)
          }}
          value={drug}
          style={styles.input}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#36373E',
    display: 'flex',
    width: '70%',
    marginLeft: '7%',
    marginBottom: '6%'

  },
  buttonSignIn: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
  icon: {
    fontSize: 30,
    marginTop: '3%',
    marginLeft: '7%',
    color: '#36373E',
    marginBottom: '10%'
  },
  input: {
    backgroundColor: '#fff',
    height: '8%',
    width: '90%',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 3,
  },
});