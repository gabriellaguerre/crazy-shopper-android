import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert } from 'react-native'
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
  const [price, setPrice] = useState(thisitem ? thisitem.price.toString() : '')
  const [store, setStore] = useState(thisitem ? thisitem.store : '')

  useEffect(()=>{
    if(thisitem) {
      setItem(thisitem.item);
      setDesc(thisitem.desc);
      setPrice(thisitem.price.toString());
      setStore(thisitem.store)
    }
  },[thisitem])

  const createItem = async () => {
    try {
      if(item && desc && price && store) {
        const newItem = {id: nanoid(), item: item, desc: desc, price: price, store: store}
        dispatch(addItem(newItem))
        Alert.alert('Success', `Successfully added ${item}`)
        setItem('')
        setDesc('')
        setPrice('')
        setStore('')
     
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
        if(item && desc && price && store) {
          const editItem = {id: thisitem.id, item, desc, price, store}
          dispatch(updateItem(editItem))
          navigation.goBack()
          Alert.alert('Success', `Successfully edited ${item}`)
          setItem('')
          setDesc('')
          setPrice('')
          setStore('')

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
            placeholder='Item'
            value={item}
            onChangeText={(value)=>setItem(value)}
            />

        <TextInput 
            style={styles.input}
            placeholder='Description'
            value={desc}
            onChangeText={(value)=>setDesc(value)}
            multiline
            />

        <TextInput 
            style={styles.input}
            placeholder='Price'
            value={price}
            onChangeText={(value)=>setPrice(value)}
            />
          <TextInput 
            style={styles.input}
            placeholder='Store Name'
            value={store}
            onChangeText={(value)=>setStore(value)}
            />

        <View style={styles.addItemButton}>
          {!thisitem ? (
          <Button 
               title='Add Item to List'
               color='green'
              //  onChangeText={(value)=>setItemName(value)}
               onPress={createItem}/>
          ):(
          <Button 
            title='Update Item'
            color='blue'
            // onChangeText={(value)=>setItemName(value)}
            onPress={editItem}
            />
            )}
         
        </View>
        {!thisitem && 
        <Button 
          title='Done'
          onPress={returnHome}/>
        }
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
    width: '100%',
    // height: 50,
    margin: 10,
    

  }
})

export default AddItemForm