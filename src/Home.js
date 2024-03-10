import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem } from './redux/itemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from '@reduxjs/toolkit';



function Home({navigation}) {
  const items = useSelector(selectAllItems)
  // const newItems = Object.values(items)
  const dispatch = useDispatch()

  // console.log(newItems, 'newitems')

  console.log(items, 'ITEMS IN HOME PAGE')
    
  useEffect(()=>{
      getList()
    },[])

    const getList = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('Items')
         console.log(jsonValue, 'JSON VALUE IN HOME')
         if(jsonValue !== null){
          const itemsArray = JSON.parse(jsonValue)
          console.log(itemsArray, 'ITEMS ARRAY')
          // for(let i = 0; i < itemsArray.length; i++){
          //   let obj = itemsArray[i]
          //   let thisItem = {id: obj.id, item: obj.item, desc: obj.desc, price: obj.price}
          //   dispatch(addItem(thisItem))
          // }
          itemsArray.forEach(obj => {
            const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price };
            dispatch(addItem(thisItem));
          });
          
          // const itemsWithId = itemsArray.map(item => ({
          //   id: item.id || nanoid(),
          //   item: item.item,
          //   desc: item.desc,
          //   price: item.price
          // }))
          // itemsWithId.forEach(item => dispatch(addItem(item)))
         }
        //  await AsyncStorage.getItem('Items')
          // jsonValue.forEach((item) => {
          // const parsedItem = JSON.parse(item);
            // console.log(item,'ITEM')
         
          //  console.log(items)
          // const parsedItems = JSON.parse(items);
          // if(parsedItems && typeof parsedItems === 'object'){
          //   dispatch(addItem(parsedItems))
          // }
          // console.log(parsedItems, 'PARSED ITEMS')
          
         

        //  dispatch(addItem(jsonValue))
        //  .then(items => {
        //   const parsedItems = JSON.parse(items)
        //   if(parsedItems) {
        //     dispatch(addItem(JSON.parse(jsonValue)))
        //   }
        //  })
        //  if(jsonValue !== null) {
        //   console.log(JSON.parse(jsonValue), " IN GET LIST IN HOME")
        //   dispatch(addItem(JSON.parse(jsonValue)))
        //  } else {
        //   return (
        //     <View>
        //       <Text>The list is empty</Text>
        //     </View>
        //   )
         
      } catch (error) {
        console.error('Error loading items:', error)
        
      }
     
      // console.log(jsonValue, 'JSON VALUE IN HOME')
      // .then(items=>{
      //      const parsedLists = JSON.parse(items)
      //      if(parsedLists){
      //       
      //      }
      // })
      // .catch(err => console.log(err))
    }
    return (
     
       <View style={styles.main}>
         <Text style={styles.text}>Items List</Text>
         {items.map(item => (
            <Text key={item?.id}>{item?.item} {item?.desc} {item.price}</Text>
         ))}
         <TouchableOpacity 
          style={styles.button}
          onPress={()=>{
            navigation.navigate('AddItemForm')}}
          >
           <FontAwesome5 
            name={'plus'}
            size={20}
            color={'white'}
            />
          </TouchableOpacity>
        
      </View>
   
      
    )

}
const styles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: 'yellow'
    },
    text: {
      fontSize: 20,
      color: 'blue',
      fontWeight: 'bold'
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
      right: 10,
      elevation: 5,
    }
    
  });

export default Home;
