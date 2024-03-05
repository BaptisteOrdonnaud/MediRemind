import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function ListScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom } = user;


  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.headerContainer}>
        <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
        <Text style={styles.headerText}>Hello {prenom + ' ' + nom}</Text>
      </View>
      <Text style={styles.mainText}>Ma liste</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'row',
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 9999,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});