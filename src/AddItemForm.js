import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem, selectAllItems } from './redux/itemsSlice';
import { nanoid } from '@reduxjs/toolkit';




function AddItemForm({navigation, route}) {
  const {item: thisitem} = route.params ? route.params : 0
 
  const items = useSelector(selectAllItems)
  const dispatch = useDispatch()

  const [item, setItem] = useState(thisitem ? thisitem.item : '')
  const [desc, setDesc] = useState(thisitem ? thisitem.desc : '')
  // const [price, setPrice] = useState(thisitem ? thisitem.price : 0)
  // const [store, setStore] = useState(thisitem ? thisitem.store : '')
  const [isItem, setIsItem] = useState(thisitem ? thisitem.isItem : true)
  const [isList, setIsList] = useState(thisitem ? thisitem.isList : false)
  const [isDone, setIsDone] = useState(thisitem ? thisitem.isDone : false)

  useEffect(()=>{
    if(thisitem) {
      setItem(thisitem.item);
      setDesc(thisitem.desc);
      // setPrice(thisitem.price);
      // setStore(thisitem.store)
    }
  },[thisitem])

  const createItem = async () => {
    try {
      if(item) {
        const newItem = {id: nanoid(), item: item, desc: desc, storeName: null, isItem: isItem, isList: isList, isDone: isDone}
        dispatch(addItem(newItem))
        Alert.alert('Success', `Successfully added ${item}`)
        setItem('')
        setDesc('')
        // setPrice('')
        // setStore('')
        setIsItem(true)
        setIsList(false)
        setIsDone(false)
        // navigation.navigate("Items List")
        navigation.goBack()
        const itemsList = [...items, newItem]
        const jsonValue = JSON.stringify(itemsList)
        await AsyncStorage.setItem('Items', jsonValue)
      } else {
        Alert.alert('Warning', 'Please enter an item')
      }
      } catch (error) {
        console.log(error)
    } 
  }

  const editItem = async () => {
    try {
        if(item) {
          const editItem = {id: thisitem.id, item, desc, storeName, isItem, isList, isDone}
          dispatch(updateItem(editItem))
          navigation.goBack()
          Alert.alert('Success', `Successfully edited ${item}`)
          setItem('')
          setDesc('')
          // setPrice('')
          // setStore('')

          const updatedItems = items.map(i => (i.id === editItem.id ? editItem : i));
          await AsyncStorage.setItem('Items', JSON.stringify(updatedItems));
        } else {
          Alert.alert('Warning', 'Please enter all item details');
          await AsyncStorage.setItem('Items', jsonValue)
          
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
            placeholder='Enter Item Name'
            value={item}
            onChangeText={(value)=>setItem(value)}
            />

        <TextInput 
            style={styles.input}
            placeholder='Enter Item Description (optional)'
            value={desc}
            onChangeText={(value)=>setDesc(value)}
            multiline
            />

         {/* <TextInput 
            style={styles.input}
            placeholder='Store Name'
            value={store}
            onChangeText={(value)=>setStore(value)}
            /> */}

        <View>
          {!thisitem ? (
          <TouchableOpacity style={styles.addButton} onPress={createItem}>
              <Text style={styles.addText}>+ Add To Items List</Text>
           </TouchableOpacity >
          ):(
          <TouchableOpacity  style={styles.editButton}  onPress={editItem}>  
            <Text style={styles.editText}>Edit This Item</Text>
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
    backgroundColor: '#000080', 
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
    backgroundColor: 'blue', 
    borderRadius: 20, 
    margin: 20,
  }
})

export default AddItemForm