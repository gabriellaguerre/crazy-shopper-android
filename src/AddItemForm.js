import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addItem } from './redux/itemsSlice';



function AddItemForm({navigation}) {
 
  const dispatch = useDispatch()

  const [item, setItem] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')

  const createItem = async () => {
    if(item) {
      dispatch(addItem(item, desc, price)
      )
      Alert.alert('Success', `Successfully Added ${item}`)
      setItem('')
      setDesc('')
      setPrice('')
    } else {
      Alert.alert('Warning', 'Please enter an item')
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

        <View style={styles.addItemButton}>
          <Button 
          title='Add Item to List'
          color='green'
          onChangeText={(value)=>setItemName(value)}
          onPress={createItem}/>
        </View>
        <Button 
          title='Done'
          onPress={returnHome}/>
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