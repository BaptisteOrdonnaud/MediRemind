import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchResult from '../components/SearchResult';
import { useDispatch } from 'react-redux';

export default function AddDrugsRestScreen({ navigation }) {

  const dispatch = useDispatch();
  const [drug, setDrug] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [allDrugs, setAllDrugs] = useState([]);
  const [drugs, setDrugs] = useState([]);

  const handleSearch = (value) => {
    fetch(`http://10.9.1.94:3000/medicaments/${value}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        setAllDrugs(data);
      })
  }

  useEffect(() => {
    if (allDrugs && Array.isArray(allDrugs)) {
      setDrugs(allDrugs.map((dataDrug, i, _id) => (
        <SearchResult key={i} drugName={dataDrug.product_name} id={dataDrug._id} navigation={navigation}/>
      )));
    }
  }, [allDrugs]);

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name='remove' style={styles.icon} onPress={() => navigation.navigate('Home')} />
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { display: isFocused ? 'none' : 'flex' }]}> Quel médicament souhaitez-vous ajouter?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Nom du médicament "
          onChangeText={(value) => {
            setDrug(value)
            handleSearch(value)
          }}
          value={drug}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {drugs}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    // backgroundColor: 'yellow',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '10%',
    // backgroundColor: 'green',
  },
  titleContainer: {
    display: 'flex',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#36373E',
    textAlign: 'center',
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
    height: '60%',
    width: '90%',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 3,
  },
});