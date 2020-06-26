import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { API, graphqlOperation } from 'aws-amplify'
import { createDog } from '../User/graphql/mutations'
import { listDogs } from '../User/graphql/queries'

const initialState = { name: '', description: '' }

const Board = () => {
  const [formState, setFormState] = useState(initialState)
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    fetchDogs()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchDogs() {
    try {
      const dogData = await API.graphql(graphqlOperation(listDogs))
      const dogs = dogData.data.listDogs.items
      setDogs(dogs)
    } catch (err) {
      console.log('error fetching dogs')
    }
  }

  async function addDog() {
    try {
      const dog = { ...formState }
      setDogs([...dogs, dog])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createDog, { input: dog }))
    } catch (err) {
      console.log('error creating dog:', err)
    }
  }

  return (
    <View style={styles.container}>
      <Icon name="comments" size={30} color="#900" />
      <TextInput
        onChangeText={val => setInput('name', val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={val => setInput('description', val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <Button title="List Dog" onPress={addDog} />
      {dogs.map((dog, index) => (
        <View key={dog.id ? dog.id : index} style={styles.dog}>
          <Text style={styles.dogName}>{dog.name}</Text>
          <Text>{dog.description}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  dog: { marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  dogName: { fontSize: 18 }
})

export default Board
