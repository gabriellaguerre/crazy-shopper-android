import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList, Image, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
// import { selectAllItems, addItem, deleteAll, updateItem, deleteItem } from './redux/itemsSlice';
import { selectAllStores, addStore, updateStore, deleteStore, deleteAll } from './redux/storesSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';


function Stores({navigation}) {
  const stores = useSelector(selectAllStores)
  const dispatch = useDispatch()
  
  const [modalVisible, setModalVisible] = useState(false)
  const [thisId, setThisId] = useState('')
  const [thisStore, setThisStore] = useState('')

 
  useEffect(()=>{
      dispatch(deleteAll());
      getStores()
    },[])

    const getStores = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('Stores')
         if(jsonValue !== null){
          const storesArray = JSON.parse(jsonValue)
        
          if(Array.isArray(storesArray)){
            storesArray.forEach(obj => {
          const thisStore = { id: obj.id, name: obj.name };
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
 
    
    const removeStore = async (id) => {
      try {
        dispatch(deleteStore(id))
        
        const newList = stores.filter(store => store.id !== id)
      
        const jsonStoreValue = JSON.stringify(newList)
        await AsyncStorage.setItem('Stores', jsonStoreValue)     
      } catch (error) {
        console.log(error)
      }
     
    }
 
    const navigateToAddItemForm = (item) => {
      navigation.navigate('Item', { item })
    }

   
    const addToShoppingList = async (item) => {
      try {
        const editStore = {id: stores.id, name: stores.name }
        dispatch(updateStore(editItem))
        const updatedStores = stores.map(store => store.id === editStore.id ? editStore : store)
        
        const jsonStoreValue = JSON.stringify(updatedStores)
        await AsyncStorage.setItem('Stores', jsonStoreValue)
        
    
      } catch (error) {
        console.log(error)
      }    
       
    }

    const newStores = stores.filter(store => store).sort((a, b) => a.store.localeCompare(b.store));
    
    

    return (
     
       <View style={styles.body}>
        <Modal 
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                 <Text style={styles.modalText}>Do you want to delete the {thisStore}?</Text>
            <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={()=>setModalVisible(!modalVisible)}>
              <Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={()=>{removeItem(thisId);setModalVisible(false)}}>
              <Text style={styles.deleteText}>Delete</Text></TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>
         {newStores && newStores.length > 0 ? (
          <FlatList 
            data={newStores}
            renderItem={({ store }) => (
                <View style={styles.listContainer}>
                  <Text style={styles.title} numberOfLines={1}>{store.name}</Text>
                  {/* <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                  <Text style={styles.subtitle}>{item.store}</Text> */}
               
                  <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{addToShoppingList(item); }}>
                  <FontAwesome5 name={'cart-plus'} size={25} color={'#32CD32'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigateToAddItemForm(item)}}>
                  <FontAwesome5 name={'pen'} size={25} color={'#000080'} />
                </TouchableOpacity>              
                <TouchableOpacity onPress={()=>{setModalVisible(true); setThisId(item.id); setThisStore(item.item)}}>
                  <FontAwesome5 name={'trash'} size={25} color={'red'} />
                </TouchableOpacity>
                </View>
                </View>                
            )}
            keyExtractor={(item, index) => index.toString()}
           />

         ):(
          <View style={styles.imageBody}>
        <Image 
          style={styles.logo}
          source={require('./assets/store-empty.png')}
        />
        <Text>NO STORES ARE ADDED YET</Text>
        <Text>CLICK ON THE PLUS BUTTON ON TOP OR BELOW</Text>
        <View style={styles.touchContainer}><TouchableOpacity style={styles.buttonEmpty} onPress={()=>{navigation.navigate('Store')}} >
                     <FontAwesome5 name={'plus'} size={20} color={'white'}/>
                    </TouchableOpacity></View>
      </View>
         )}
     
      </View>      
    )
}
const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#C0C0C0',
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
      // bottom: 55,
      right: 10,
      elevation: 5,
      top: 10,
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
    logo: {
      width: 100,
      height: 100,
      margin: 20,
    },
    imageBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonEmpty: {
      width: 40,
      height:40,
      borderRadius: 30,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
/*****************************MODAL******** */
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: '#B0E0E6',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
},
modalButtonsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 10,
},
cancelButton: {
  backgroundColor: 'blue', 
  borderRadius: 20,
},
cancelText: {
  fontSize: 20,
  color: 'white',
  margin: 15,
  fontWeight: 'bold',
},
deleteText: {
  fontSize: 20,
  color: 'white',
  margin: 15,
  fontWeight: 'bold',
},
deleteButton: {
  backgroundColor: '#FF0000', 
  borderRadius: 20, 
  margin: 20,
},  
  });

export default Stores;
