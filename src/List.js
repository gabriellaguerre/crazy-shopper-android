import React, { useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { selectAllItems, addItem, updateItem, deleteAllItems } from './redux/itemsSlice';
import { selectAllStores, addStore, updateStore, deleteAllStores } from './redux/storesSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function List() {
  const items = useSelector(selectAllItems)
  const stores = useSelector(selectAllStores)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(deleteAllStores());
    dispatch(deleteAllItems());
    getList()
    getStores()
  },[])

  console.log(stores, 'ssss')
  console.log(items, 'iii')


  const getStores = async () => {
    try {
       const jsonValue = await AsyncStorage.getItem('Stores')
       if(jsonValue !== null){
        const storesArray = JSON.parse(jsonValue)
      
        if(Array.isArray(storesArray)){
          storesArray.forEach(obj => {
        const thisStore = { id: obj.id, name: obj.name, description: obj.description, isStore: obj.isStore };
        dispatch(addStore(thisStore));
        });
        } else {
          console.error("Error loading items: Invalid data format")
        }
        
       }
    } catch (error) {
      console.error('Error loading items:', error)
      
    }

  }
  const getList = async () => {
    try {
       const jsonValue = await AsyncStorage.getItem('Items')
       if(jsonValue !== null){
        const itemsArray = JSON.parse(jsonValue)
      
        if(Array.isArray(itemsArray)){
          itemsArray.forEach(obj => {
        const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, isItem:obj.isItem, isList: obj.isList, isDone: obj.isDone, storeName: obj.storeName };
        dispatch(addItem(thisItem));
        });
        } else {
          console.error("Error loading items: Invalid data format")
        }
        
       }
    } catch (error) {
      console.error('Error loading items:', error)
      
    }

  }

  
  const addToDoneList = async (item) => {
    try {
      const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, isItem: false, isList: false, isDone: true, storeName: ''}
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
    const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, isItem: true, isList: false, isDone: false, storeName: ''}
    dispatch(updateItem(editItem))
    const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
    const jsonItemValue = JSON.stringify(updatedItems)
    await AsyncStorage.setItem('Items', jsonItemValue)

} catch (error) {
  console.log(error)
}    
 
}

const returnStore = async (store) => {
  try {
  
    const editStore = {id: store.id, name: store.name, description: store.description, isStore: true}
    dispatch(updateStore(editStore))
    const updatedStores = stores.map(store=>store.id === editStore.id ? editStore : store)
    const jsonStoreValue = JSON.stringify(updatedStores)
    await AsyncStorage.setItem('Stores', jsonStoreValue)

   
    const renewItems = items.filter(item => item.storeName === store.name)
    renewItems.forEach(async (item) => {
      const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, storeName: '', isItem: true, isList: false, isDone: false }
      dispatch(updateItem(editItem))
      const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
      const jsonItemValue = JSON.stringify(updatedItems)
      await AsyncStorage.setItem('Items', jsonItemValue)
    })
    

} catch (error) {
  console.log(error)
}    
 
}
  
  const newItems = items.filter(item=> item.isList === true && item.storeName === '')
                        // .sort((a, b) => {
                        //   const storeComparison = a.store.localeCompare(b.store);
                        //   if(storeComparison !== 0) {
                        //     return storeComparison
                        //   }
                        //   return a.item.localeCompare(b.item);
                        // })
                        .sort((a, b) => a.item.localeCompare(b.item))

  const newStores = stores.filter(store => store.isStore === false).sort((a,b)=> a.name.localeCompare(b.name))
  
  const storeItems = (storeName) => {
    return items.filter(item=> item.isList && item.storeName === storeName)
                .sort((a, b) => a.item.localeCompare(b.item))
                .map((item) => (
                  <View style={styles.listContainer} key={item.id}>
                  <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                  <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                  <View style={styles.buttonsContainer}>
               <TouchableOpacity onPress={()=>{ returnItem(item)}}>
                   <FontAwesome5 name={'arrow-left'} size={25} color={'blue'} />
               </TouchableOpacity>

             <TouchableOpacity onPress={()=>{ addToDoneList(item); }}>
               <FontAwesome5 name={'check'} size={25} color={'green'} />
             </TouchableOpacity>
             </View>
                  </View>
                ))}
  
  // console.log(storeItems, 'ssssssssssss')
  
  return (
      <>
      <View style={styles.body}>
      {newStores && newStores.length > 0 &&
       <FlatList 
       data={newStores}
       renderItem={({ item }) => (
           <View style={styles.listContainer}>
             <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
             <Text style={styles.subtitle} numberOfLines={1}> {item.description}</Text>
             {storeItems(item.name)}
       
             <View style={styles.buttonsContainer}>
             <TouchableOpacity onPress={()=>{returnStore(item)}}>
                 <FontAwesome5 name={'arrow-left'} size={25} color={'blue'} />
             </TouchableOpacity>
           </View>
           </View>                
       )}
       keyExtractor={(item, index) => index.toString()}
      />      
      }
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
             </View>
             </View>                
         )}
         keyExtractor={(item, index) => index.toString()}
        />

      ):(
        newStores && newStores.length === 0 && 
         <View style={styles.imageBody}>
        <Image 
          style={styles.logo}
          source={require('./assets/fullyTransparentCart.png')}
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
   backgroundColor: '#f6b4c1',
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
  backgroundColor: '#f6b4c1'
},
 
});

export default List;
