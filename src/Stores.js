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
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [thisStoreId, setThisStoreId] = useState('')
  const [thisStore, setThisStore] = useState('')
  const [editThisStore, setEditThisStore] = useState({})

  // console.log(stores, 'sssssssssssss')
  useEffect(()=>{
      dispatch(deleteAll(stores));
      getStores()
    },[])

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
 
    
    const removeStore = async (id) => {
      try {
        // console.log(id, 'iiiiiiiiiiiiiii')
        dispatch(deleteStore(id))
        
        const newStoreList = stores.filter(store => store.id !== id)
      
        const jsonStoreValue = JSON.stringify(newStoreList)
        await AsyncStorage.setItem('Stores', jsonStoreValue)     
      } catch (error) {
        console.log(error)
      }
     
    }
 
    const navigateToAddStoreForm = (store) => {
      navigation.navigate('Store', { store })
    }

   
    const createShoppingList = async (store) => {
      try {
        const editStore = {id: store.id, name: store.name, description: store.description, isStore:false }
        dispatch(updateStore(editStore))
        const updatedStores = stores.map(store => store.id === editStore.id ? editStore : store)
        
        const jsonStoreValue = JSON.stringify(updatedStores)
        await AsyncStorage.setItem('Stores', jsonStoreValue)
        
    
      } catch (error) {
        console.log(error)
      }    
       
    }
    // filter(store=>store.isStore === true).
    const newStores = stores.filter(store=> store.isStore === true).sort((a, b) => a.name.localeCompare(b.name));
    // console.log(newStores, 'nnnnnnnnnnn')
    
    

    return (
     
       <View style={styles.body}>
        <Modal 
          // animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                 <Text style={styles.modalText}>Do you want to delete {thisStore}?</Text>
            <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={()=>setModalVisible(!modalVisible)}>
              <Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={()=>{removeStore(thisStoreId);setModalVisible(false)}}>
              <Text style={styles.deleteText}>Delete</Text></TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>
{/*****************************************************************Store Image Modal**************************************************/}
          <Modal 
          // animationType='slide'
          transparent={true}
          visible={editModalVisible}
          onRequestClose={()=>setEditModalVisible(!editModalVisible)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                 {/* <Text style={styles.modalText}>Do you want to delete the {thisStore}?</Text> */}
            <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.editModalButton} onPress={()=>{setEditModalVisible(!editModalVisible);navigateToAddStoreForm(editThisStore)}}>
              <Text style={styles.cancelText}>Edit {thisStore}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.deleteEditModalButton} onPress={()=>{setEditModalVisible(false);setModalVisible(true)}}>
              <Text style={styles.deleteText}>Delete {thisStore}</Text></TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>
         {newStores && newStores.length > 0 ? (
          <View style={styles.container}>
          <FlatList 
            data={newStores}
            numColumns={2} // Set the number of columns to 2
            renderItem={({ item: store }) => (
                <View style={styles.listContainer}>
                  <TouchableOpacity style={styles.storeButton} onPress={()=>{setEditModalVisible(!editModalVisible); setThisStore(store.name); setEditThisStore(store);setThisStoreId(store.id)}}>
                   <Image 
                    style={styles.logo}
                    source={require('./assets/store_pic.png')}
                  /></TouchableOpacity>
                  <Text style={styles.title} numberOfLines={1}>{store.name}</Text>
                  <Text style={styles.subtitle} numberOfLines={1}> {store.description}</Text>
                            
                  <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{createShoppingList(store)}}>
                  {/* <FontAwesome5 name={'cart-plus'} size={25} color={'#32CD32'} /> */}
                  <Text style={styles.createShoppingList}>Create Shopping List</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>{navigateToAddStoreForm(store)}}>
                  <FontAwesome5 name={'pen'} size={25} color={'#000080'} />
                </TouchableOpacity>              
                <TouchableOpacity onPress={()=>{setModalVisible(true); setThisStoreId(store.id); setThisStore(store.name)}}>
                  <FontAwesome5 name={'trash'} size={25} color={'red'} />
                </TouchableOpacity> */}
                </View>
                </View>                
            )}
            keyExtractor={(item, index) => index.toString()}
           />
          </View>
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C0C0C0', // Set the background color if needed
    },
    listContainer: {
      marginHorizontal: 20,
      marginTop: 30,
      // width: '40%',
      margin: 10,
      alignSelf: 'center',
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 20,
      elevation: 5,
    },
    /*****Store Button */  
    storeButton: {
      backgroundColor: '#DDDDDD',
      borderRadius: 80,
      marginTop: 5,
      alignItems: 'center',
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
      // marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#6497b1',
      borderRadius: 5,
      
    },
    title: {
      color: 'black',
      fontSize: 20,
      alignSelf: 'center',
      marginTop: 10,
    },
    subtitle: {
      color: 'gray',
      fontSize: 10,
    },
    createShoppingList: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      // marginLeft: 5,
      // marginRight: 5,
      // marginBottom: 5,
      margin: 5,
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
editModalButton: {
  backgroundColor: 'blue', 
  borderRadius: 20,
},
deleteEditModalButton: {
  backgroundColor: '#FF0000', 
  borderRadius: 20, 
  margin: 20,
}
  });

export default Stores;
