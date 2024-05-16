import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
// import { addItem, updateItem, selectAllItems } from './redux/itemsSlice';
import { addStore, updateStore, selectAllStores } from './redux/storesSlice';
import { nanoid } from '@reduxjs/toolkit';




function AddStoreForm({navigation, route}) {
  const {store: thisStore} = route.params ? route.params : 0
 
  const stores = useSelector(selectAllStores)
  const dispatch = useDispatch()
 
  const [name, setName] = useState(thisStore ? thisStore.name : '')
  const [description, setDescription] = useState(thisStore ? thisStore.description : '')
  const [isStore, setIsStore] = useState(thisStore ? thisStore.isStore : true)

  useEffect(()=>{
    if(thisStore) {
      setName(thisStore.name);
      setDescription(thisStore.description);
      // setPrice(thisitem.price);
      // setStore(thisitem.store)
    }
  },[thisStore])

  const createStore = async () => {
    try {
      if(name) {
        const storeExist = stores.find(store=> store.name === name.toUpperCase())
        if(storeExist) {
          Alert.alert('Warning', `${name.toUpperCase()} is already in your list`)
        } else {
          const newStore = {id: nanoid(), name: name.toUpperCase(), description: description, isStore: isStore}
        dispatch(addStore(newStore))
        Alert.alert('Success', `Successfully added ${name.toUpperCase()} as a store`)
        setName('')
        setDescription('')
        // setPrice('')
        // setStore('')
        setIsStore(true)
        // setIsList(false)s
        // setIsDone(false)
        navigation.navigate("Stores List")
        const storesList = [...stores, newStore]
        const jsonValue = JSON.stringify(storesList)
        await AsyncStorage.setItem('Stores', jsonValue)
        }
        
      } else {
        Alert.alert('Warning', 'Please enter a store name')
      }
      } catch (error) {
        console.log(error)
    } 
  }

  const editStore = async () => {
    try {
        if(name) {
          const editStore = {id: thisStore.id, name: name.toUpperCase(), description, isStore}
          dispatch(updateStore(editStore))
          navigation.goBack()
          Alert.alert('Success', `Successfully edited ${name.toUpperCase()}`)
          setName('')
          setDescription('')
          // setPrice('')
          // setStore('')

          const updatedStores = stores.map(i => (i.id === editStore.id ? editStore : i));
          await AsyncStorage.setItem('Stores', JSON.stringify(updatedStores));
        } else {
          Alert.alert('Warning', 'Please enter all item details');
          await AsyncStorage.setItem('Stores', jsonValue)
          
        } 

    }catch (error) {
      console.log(error)
    }
   }

  const returnHome = () => {
      navigation.goBack()    
   }
   
    return (
    
      <View style={styles.container}>
        
        <TextInput 
            style={styles.input}
            placeholder='Enter Store Name'
            value={name}
            onChangeText={(value)=>setName(value)}
            />

        <TextInput 
            style={styles.input}
            placeholder='Enter Store Description (optional)'
            value={description}
            onChangeText={(value)=>setDescription(value)}
            multiline
            />

         {/* <TextInput 
            style={styles.input}
            placeholder='Store Name'
            value={store}
            onChangeText={(value)=>setStore(value)}
            /> */}

        <View>
          {!thisStore ? (
          <TouchableOpacity style={styles.addButton} onPress={createStore}>
              <Text style={styles.addText}>+ Add To Stores List</Text>
           </TouchableOpacity >
          ):(
          <TouchableOpacity  style={styles.editButton}  onPress={editStore}>  
            <Text style={styles.editText}>Confirm Edit</Text>
            </TouchableOpacity>
            )}
         
        </View>
      </View>
     
      
    )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  addItemButton: {
    borderRadius: 30,
    margin: 15,
    backgroundColor: 'green',   
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  editText: {
    fontSize: 20,
    color: 'white',
    margin: 15,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#275214', 
    borderRadius: 20, 
    margin: 20,
  },
  addText: {
    fontSize: 20,
    color: 'white',
    margin: 15,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#275214', 
    borderRadius: 20, 
    margin: 20,
  }
})

export default AddStoreForm