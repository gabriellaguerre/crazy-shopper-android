import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList, Image, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem } from './redux/itemsSlice';
import { selectAllStores, addStore, updateStore, deleteStore, deleteAllStores } from './redux/storesSlice';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Stores({navigation}) {
  const stores = useSelector(selectAllStores)
  const items = useSelector(selectAllItems)
  // const navigation = useNavigation();
  const dispatch = useDispatch()
  
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [thisStoreId, setThisStoreId] = useState('')
  const [thisStore, setThisStore] = useState('')
  const [editThisStore, setEditThisStore] = useState({})
  const [thisStoreDesc, setThisStoreDesc] = useState('')

  // console.log(stores, 'sssssssssssss')
  useEffect(()=>{
      dispatch(deleteAllStores());
      getStores()
      getList()
    },[])

    // useEffect(()=> {
    //   if(resetStack) {
    //     navigation.dispatch(CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'Stores List'}]
    //     })
    //   )
    //   setResetStack(false)
    //   }

    // },[resetStack, navigation])

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
      if(items.length > 0) {
      try {
        const editStore = {id: store.id, name: store.name, description: store.description, isStore:false }
        dispatch(updateStore(editStore))
        const updatedStores = stores.map(store => store.id === editStore.id ? editStore : store)
        
        const jsonStoreValue = JSON.stringify(updatedStores)
        await AsyncStorage.setItem('Stores', jsonStoreValue)
        // console.log({ editStore}, 'ooooooooo')
        navigation.navigate('Items List',{editStore})
    
      } catch (error) {
        console.log(error)
      }    
       
    } else {
      Alert.alert('Do This First','You Need to Create An Items List Before Creating a Shopping List')
    }
  }
    // filter(store=>store.isStore === true).
    const newStores = stores.filter(store=> store.isStore === true).sort((a, b) => a.name.localeCompare(b.name));
    // console.log(newStores, 'nnnnnnnnnnn')
    const hasStores = stores.length > 0
    const hasVisibleStores = newStores.length > 0;
    
    

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
              <TouchableOpacity style={styles.deleteButton} onPress={()=>{removeStore(thisStoreId);setModalVisible(false)}}>
              <Text style={styles.deleteText}>Yes, Delete {thisStore}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={()=>setModalVisible(!modalVisible)}>
              <Text style={styles.cancelText}>No, Cancel</Text></TouchableOpacity>
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
                <View style={styles.closeXView}>
              <TouchableOpacity style={styles.closeModalButton} onPress={()=>{setEditModalVisible(!editModalVisible)}}>
              <Text style={styles.closeX}>X</Text></TouchableOpacity></View>
              {thisStoreDesc ? (
              <View style={styles.storeData}>
              <Text style={styles.storeName}>{thisStore}</Text>
              <Text style={styles.storeDesc}>Description: {thisStoreDesc}</Text>
              </View>
              ):(
               <></>
              )}            
            <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.editModalButton} onPress={()=>{setEditModalVisible(!editModalVisible);navigateToAddStoreForm(editThisStore)}}>
              <Text style={styles.cancelText}>Edit {thisStore}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.deleteEditModalButton} onPress={()=>{setEditModalVisible(false);setModalVisible(true)}}>
              <Text style={styles.deleteText}>Delete {thisStore}</Text></TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>

         {hasStores && !hasVisibleStores ? (
            <View style={styles.blankScreen}/>
          ):(
          hasVisibleStores ? (
          <View style={styles.container}>
          <FlatList 
            data={newStores}
            numColumns={2} // Set the number of columns to 2
            renderItem={({ item: store }) => (
                <View style={styles.listContainer}>
                  <TouchableOpacity style={styles.storeButton} onPress={()=>{setEditModalVisible(!editModalVisible); 
                    setThisStore(store.name); 
                    setEditThisStore(store);
                    setThisStoreId(store.id); 
                    setThisStoreDesc(store.description)
                  }}
                    
                    >
                   <Image 
                    style={styles.logo}
                    source={require('./assets/store_pic.png')}
                  /></TouchableOpacity>
                  <Text style={styles.title} numberOfLines={1} >{store.name}</Text>
                  <Text style={styles.subtitle} numberOfLines={1} > {store.description}</Text>
                            
                  <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{createShoppingList(store)}}>
                  {/* <FontAwesome5 name={'cart-plus'} size={25} color={'#32CD32'} /> */}
                  <Text style={styles.createShoppingList}>Create Shopping List</Text>
                </TouchableOpacity>
             
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
         )
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
      backgroundColor: '#C0C0C0', 
    },
    listContainer: {
     
      marginHorizontal: 20,
      marginTop: 30,
      width: '40%',
      margin: 10,
      alignItems: 'center', 
      justifyContent: 'center',
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
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#6497b1',
      borderRadius: 5,
      elevation: 5,
      
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
      backgroundColor: '#094a85',
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
  backgroundColor: '#c3d2bd',
  borderRadius: 20,
  padding: 35,
  paddingTop: 55,
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
closeXView: {
  // alignSelf: 'flex-end',
  position: 'absolute',
    top: 20,
    right: 20, 
},
closeX: {
  color: 'black',
  fontSize: 23,
  fontWeight: 'bold',
  
},
modalButtonsContainer: {
  // flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 10,
},
cancelButton: {
  backgroundColor: '#094a85', 
  borderRadius: 20,
  width: '80%',
  elevation: 10,
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
  textAlign: 'center',
  // justifyContent: 'center',
},
deleteButton: {
  backgroundColor: '#FF0000', 
  borderRadius: 20, 
  margin: 20,
  // justifyContent: 'center',  // Center content vertically
  // alignItems: 'center',
  width: '80%',
  elevation: 10,
  // paddingVertical: 15,
},  
editModalButton: {
  backgroundColor: '#094a85', 
  borderRadius: 20,
  elevation: 10,
  
},
deleteEditModalButton: {
  backgroundColor: '#FF0000', 
  borderRadius: 20, 
  margin: 20,
  width: 'auto',
  elevation: 10,
},
storeData: {
  marginTop: 10,
  marginBottom: 30,
  backgroundColor: 'white',
  borderRadius: 10,
  elevation: 5,
},
storeName: {
  fontSize: 20,
  color: 'black',
  margin: 5,
  alignSelf: 'center',
},
storeDesc: {
  fontSize: 15,
  color: 'black',
  margin: 10,
},
  });

export default Stores;
