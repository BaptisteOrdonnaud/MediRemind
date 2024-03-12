import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react'
import { addTask } from '../reducers/tasks';
import Task from '../components/Tasks';

export default function ListScreen() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tasks = useSelector((state) => state.tasks.value);

  const { prenom, nom } = user;

  const [task, setTask] = useState('');
  const [urgent, setUrgent] = useState(false);


  const handleAddTask = () => {
    const newTask = {
      task: task,
      isUrgent: urgent,
    }
    dispatch(addTask(newTask));
    setTask('');
    setUrgent(false);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={require('../assets/TemplateImage.png')} />
        <Text style={styles.headerText}>Hello {prenom + ' ' + nom}</Text>
      </View>
      <View style={styles.addContainer}>
        <TextInput
          onChangeText={(text) => setTask(text)}
          value={task}
          placeholder="Task"
          style={styles.input}
        />

        <View style={styles.urgentSection}>
          <Switch
            value={urgent}
            onValueChange={(value) => setUrgent(value)}
            style={styles.urgentCheckbox}
          />
          <Text style={styles.urgent}>URGENT</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleAddTask()}>
          <Text style={styles.textButton}>ADD TASK</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.mainText}>Ma liste</Text>
        <View style={styles.tasksContainer}>
          <Text>{allTasks}</Text>
        </View>
      </View>
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
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  urgentSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgentCheckbox: {
    marginRight: 5,
  },
  urgent: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tasksContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
