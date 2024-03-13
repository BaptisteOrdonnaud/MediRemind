import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Switch, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useState } from 'react'
import { addTask } from '../reducers/tasks';
import Task from '../components/Tasks';
import moment from 'moment';
import { Alert } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';


moment.locale('fr');

export default function ListScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tasks = useSelector((state) => state.tasks.value);

  const { prenom, nom } = user;

  const [task, setTask] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const currentDate = moment().format('dddd D MMMM YYYY');


  const handleAddTask = () => {
    if (!task.trim()) {
      Alert.alert('Champ Vide', 'Veuillez entrer un médicament avant de l\'ajouter.');
      return;
    }

    const newTask = {
      task: task,
      isUrgent: urgent,
    }
    dispatch(addTask(newTask));
    setTask('');
    setUrgent(false);
    setShowAddButton(true);
  }

  console.log(tasks)

  const allTasks = tasks.map((task, id) => {
    return <Task key={id} task={task.task} isUrgent={task.isUrgent} />;
  })
    .sort((a, b) => {
      if (a.props.isUrgent && !b.props.isUrgent) {
        return -1;
      } else if (!a.props.isUrgent && b.props.isUrgent) {
        return 1;
      } else {
        return 0;
      }
    });


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Bonjour {prenom} 👋🏼</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        <ScrollView style={styles.listContainer}>
          <Text style={styles.mainText}>Ma liste</Text>
          <View style={styles.tasksContainer}>
            {allTasks}
          </View>
          <View style={styles.containerBtn}>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => setShowAddButton(true)}>
              <FontAwesome name='plus' style={styles.icon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {showAddButton && <View style={styles.card} >
          <View style={styles.urgentSection}>
            <TextInput
              onChangeText={(text) => setTask(text)}
              value={task}
              placeholder="Ajouter un nouveau médicament"
              style={styles.input}
            />
            <View style={styles.urgentContent}>
              <Switch
                value={urgent}
                onValueChange={(value) => setUrgent(value)}
                style={styles.urgentCheckbox}
                trackColor={{ true: "#A69AFC" }}
                thumbColor={urgent ? "#E1DFFF" : "#A69AFC"}
              />
              <Text style={styles.urgent}>URGENT</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => { handleAddTask(), setShowAddButton(false) }}>
                <Text style={styles.textButton}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>}
        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: 20,

  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    alignSelf: 'flex-start'
  },

  mainText: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },

  addContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    height: '18%',
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  topSection: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  input: {
    justifyContent: 'center',
    alignContent: 'space-between',
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  urgentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    width: '95%',
    textAlign: 'center',

  },
  urgentContent: {
    flexDirection: 'column',
  },
  urgentCheckbox: {
    transform: [{ scaleX: .7 }, { scaleY: .7 }],
  },
  urgent: {
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 30,
    width: '95%',
    backgroundColor: '#A69AFC',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tasksContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },

  listContainer: {
    width: '95%',
    margin: 10,
    flexDirection: 'column',
  },
  icon: {
    color: '#A69AFC',
    fontSize: 30,
  },
  containerBtn: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  btn: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 45,
  },
});

