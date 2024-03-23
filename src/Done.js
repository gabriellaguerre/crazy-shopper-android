import React , { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { selectAllDoneLists, addItemToDoneList, deleteDoneList } from './redux/doneListsSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { selectAllItems, updateItem } from './redux/itemsSlice';

function DoneList({navigation}) {
  const items = useSelector(selectAllItems)
  // const doneLists = useSelector(selectAllDoneLists)
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(deleteDoneList());
  //   getDoneList()
  // },[])

  // const getDoneList = async () => {
  //   try {
  //      const jsonValue = await AsyncStorage.getItem('Done')
      
  //      if(jsonValue !== null){
  //       const itemsArray = JSON.parse(jsonValue)
  //       if(Array.isArray(itemsArray)){
  //         itemsArray.forEach(obj => {
  //       const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, store: obj.store };
  //       dispatch(addItemToDoneList(thisItem));
  //       });
  //       } else {
  //         console.error("Error loading items: Invalid data format")
  //       }
        
  //      }
  //   } catch (error) {
  //     console.error('Error loading items:', error)
      
  //   }

  // }

  // const deleteTheDoneList = async () =>{
  //   const clean = dispatch(deleteDoneList())
  //   await AsyncStorage.setItem('Done', JSON.stringify(clean))

  // }

  const resetItemsList = async () => {
    const renewItems = items.filter(item => item.isDone === true)
    renewItems.forEach(async (item) => {
      const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, store: item.store, isItem: true, isList: false, isDone: false }
      dispatch(updateItem(editItem))
      const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
      const jsonItemValue = JSON.stringify(updatedItems)
      await AsyncStorage.setItem('Items', jsonItemValue)
    })
    // const jsonValue = await AsyncStorage.getItem('Done')

    // if(jsonValue !== null){
    //   const itemsArray = JSON.parse(jsonValue)
    //   if(Array.isArray(itemsArray)){
    //     await Promise.all(itemsArray.forEach(async obj => {
    //       const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, store: obj.store };
    //       dispatch(addItem(thisItem));
    //       const renewItems = [...items, thisItem]
    //       const jsonListValue = JSON.stringify(renewItems)
    //       await AsyncStorage.setItem('Items', jsonListValue)
          
    //   }));
    
  }
  const newItems = items.filter(item => item.isDone === true).sort((a, b) => a.item.localeCompare(b.item));

  return (
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
           {/* <TouchableOpacity onPress={}>
             <FontAwesome5 name={'check'} size={25} color={'green'} />
           </TouchableOpacity> */}
                      
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
      {/* <Text style={styles.text}> Crazy Shopper </Text> */}
    </View>
    )}
     <TouchableOpacity style={styles.button} onPress={async()=>{await resetItemsList().then(navigation.navigate('Home'))}}>
       <FontAwesome5 name={'hand-peace'} size={25} color={'white'} />
    </TouchableOpacity>  
       
 </View>      
)
}
const styles = StyleSheet.create({
body: {
 flex: 1,
 backgroundColor: '#B0E0E6',
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
 backgroundColor: '#2F4F4F',
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
 justifyContent: 'center',
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
  backgroundColor: '#B0E0E6'
},

});

export default DoneList;


