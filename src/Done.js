import React , { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { selectAllDoneLists, deleteDoneList } from './redux/doneListsSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { selectAllItems, addItem } from './redux/itemsSlice';

function DoneList() {
  const items = useSelector(selectAllItems)
  const doneLists = useSelector(selectAllDoneLists)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(deleteDoneList());
    getDoneList()
  },[])

  const getDoneList = async () => {
    try {
       const jsonValue = await AsyncStorage.getItem('Done')
      
       if(jsonValue !== null){
        const itemsArray = JSON.parse(jsonValue)
        if(Array.isArray(itemsArray)){
          itemsArray.forEach(obj => {
        const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, store: obj.store };
        dispatch(addToDoneList(thisItem));
        });
        } else {
          console.error("Error loading items: Invalid data format")
        }
        
       }
    } catch (error) {
      console.error('Error loading items:', error)
      
    }

  }

  const deleteTheDoneList = async () =>{
    const clean = dispatch(deleteDoneList())
    await AsyncStorage.setItem('Done', JSON.stringify(clean))

  }

  const resetItemsList = async () => {
    const jsonValue = await AsyncStorage.getItem('Done')

    if(jsonValue !== null){
      const itemsArray = JSON.parse(jsonValue)
      if(Array.isArray(itemsArray)){
        itemsArray.forEach(async obj => {
          const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, store: obj.store };
          dispatch(addItem(thisItem));
          const renewItems = [...items, thisItem]
          const jsonListValue = JSON.stringify(renewItems)
          await AsyncStorage.setItem('Items', jsonListValue)
      });
    
      }
    }
  }


  return (
    <View style={styles.body}>
      
    {doneLists && doneLists.length > 0 ? (
     <FlatList 
       data={doneLists}
       renderItem={({ item }) => (
           <View style={styles.listContainer}>
             <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
             <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
             <Text style={styles.subtitle}>${item.price} at {item.store}</Text>
       
             <View style={styles.buttonsContainer}>
           <TouchableOpacity onPress={async()=>{await resetItemsList().then(()=>deleteTheDoneList())}}>
             <FontAwesome5 name={'check'} size={25} color={'green'} />
           </TouchableOpacity>
           {/* <TouchableOpacity onPress={()=>{}}>
             <FontAwesome5 name={'pen'} size={25} color={'blue'} />
           </TouchableOpacity>              
           <TouchableOpacity onPress={()=> {}}>
             <FontAwesome5 name={'trash'} size={25} color={'red'} />
           </TouchableOpacity> */}
           </View>
           </View>                
       )}
       keyExtractor={(item, index) => index.toString()}
      />

    ):(
     <View style={styles.empty}>
       <Text style={styles.emptyText}>Crazy Shopper</Text>
     </View>
    )}

       
 </View>      
)
}
const styles = StyleSheet.create({
body: {
 flex: 1,
 backgroundColor: '#000080',
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
 
}

});

export default DoneList;


