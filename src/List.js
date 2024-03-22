import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { selectAllItems, updateItem } from './redux/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function List() {
  const items = useSelector(selectAllItems)
  const dispatch = useDispatch()

  
  const addToDoneList = async (item) => {
    try {
      const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, store: item.store, isItem: false, isList: false, isDone: true}
      dispatch(updateItem(editItem))
      const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
      const jsonItemValue = JSON.stringify(updatedItems)
      await AsyncStorage.setItem('Items', jsonItemValue)

  } catch (error) {
    console.log(error)
  }    
   
}
const returnItem = async (item) => {
  try {
    const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, store: item.store, isItem: true, isList: false, isDone: false}
    dispatch(updateItem(editItem))
    const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
    const jsonItemValue = JSON.stringify(updatedItems)
    await AsyncStorage.setItem('Items', jsonItemValue)

} catch (error) {
  console.log(error)
}    
 
}
  
  const newItems = items.filter(item=> item.isList === true)
                        .sort((a, b) => {
                          const storeComparison = a.store.localeCompare(b.store);
                          if(storeComparison !== 0) {
                            return storeComparison
                          }
                          return a.item.localeCompare(b.item);
                        })

  
    return (
      <>
     
      <View style={styles.body}>
   
      {newItems && newItems.length > 0 ? (
       <FlatList 
         data={newItems}
         renderItem={({ item }) => (
             <View style={styles.listContainer}>
               <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
               <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
               <Text style={styles.subtitle}>{item.store}</Text>
         
               <View style={styles.buttonsContainer}>
               <TouchableOpacity onPress={()=>{ returnItem(item)}}>
                   <FontAwesome5 name={'arrow-left'} size={25} color={'blue'} />
               </TouchableOpacity>

             <TouchableOpacity onPress={()=>{ addToDoneList(item); }}>
               <FontAwesome5 name={'check'} size={25} color={'green'} />
             </TouchableOpacity>
                          
             {/* <TouchableOpacity onPress={()=> {}}>
               <FontAwesome5 name={'trash'} size={25} color={'red'} />
             </TouchableOpacity> */}
             </View>
             </View>                
         )}
         keyExtractor={(item, index) => index.toString()}
        />

      ):(
        <View style={styles.imageBody}>
        <Image 
          style={styles.logo}
          source={require('./assets/crazy_shopper.png')}
        />
      </View>
      )}
  
         
   </View>      
   </>
 )
}
const styles = StyleSheet.create({
 body: {
   flex: 1,
   backgroundColor: '#4169E1',
 },
 listContainer: {
   marginHorizontal: 40,
   width: '90%',
   margin: 10,
   alignSelf: 'center',
   backgroundColor: 'white',
   paddingLeft: 10,
   paddingRight: 10,
   borderRadius: 20,
   elevation: 5,
 },

/*****Add Item Round Blue Button */    
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
 }, 
 buttonsContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   margin: 10,
  
 },
 title: {
   color: 'black',
   fontSize: 30,
   alignSelf: 'center',
 },
 subtitle: {
   color: 'gray',
   fontSize: 20,
 },

/**********When List is Empty*******/
 empty: {
   flex: 1,
   alignItems:'center',
   justifyContent: 'center'
 },
 emptyText: {
   color: 'white',
   fontSize: 40,
 },
 text: {
  fontSize: 30,
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: 'white',
},
logo: {
  width: 200,
  height: 150,
  margin: 20,
},
imageBody: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4169E1'
},
 
});

export default List;
