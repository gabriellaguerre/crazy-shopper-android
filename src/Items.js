import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList, Image, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem, deleteAllItems, updateItem, deleteItem } from './redux/itemsSlice';
import { updateStore, selectAllStores } from './redux/storesSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';


function Items({navigation, route, handleDoneClick}) {
 
 
  const { editStore } = route.params ? route.params : 0
  // console.log(editStore, 'editStoreeeeee')
 
  const items = useSelector(selectAllItems)
  const stores = useSelector(selectAllStores)

  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const [thisId, setThisId] = useState('')
  const [thisItem, setThisItem] = useState('')
  const [showMenu, setShowMenu] = useState({})
  
  

 
  useEffect(()=>{
      dispatch(deleteAllItems());
      getList()
    },[])

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
 
    
    const removeItem = async (id) => {
      try {
        dispatch(deleteItem(id))
        
        const newList = items.filter(item=>item.id !== id)
      
        const jsonItemValue = JSON.stringify(newList)
        await AsyncStorage.setItem('Items', jsonItemValue)     
      } catch (error) {
        console.log(error)
      }
     
    }
 
    const navigateToAddItemForm = (item) => {
      navigation.navigate('Item', { item })
    }

   
    const addToShoppingList = async (item) => {
      try {
        const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, isItem: false, isList: true, isDone: false, storeName: editStore ? editStore.name : null}
        dispatch(updateItem(editItem))
        const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
        
        const jsonItemValue = JSON.stringify(updatedItems)
        await AsyncStorage.setItem('Items', jsonItemValue)
        
    
      } catch (error) {
        console.log(error)
      }    
       
    }
    const handleDone = () => {
      navigation.navigate('List')
      navigation.goBack() 
    }

    const returnStore = async (store) => {
      try {
      
        const editStore = {id: store.id, name: store.name, description: store.description, isStore: true}
        dispatch(updateStore(editStore))
        const updatedStores = stores.map(store=>store.id === editStore.id ? editStore : store)
        const jsonStoreValue = JSON.stringify(updatedStores)
        await AsyncStorage.setItem('Stores', jsonStoreValue)
           
    
    } catch (error) {
      console.log(error)
    }    
     
    }
    const returnItems = async () => {
      try {
        // console.log(items, 'items in return items')
         const renewItems = items.filter(item => item.storeName === editStore.name)
         renewItems.map(async (item) => {
          const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, storeName: null, isItem: true, isList: false, isDone: false }
          dispatch(updateItem(editItem))
          const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
          const jsonItemValue = JSON.stringify(updatedItems)
          await AsyncStorage.setItem('Items', jsonItemValue)
        })

    
    } catch (error) {
      console.log(error)
    }    
     
    }
    const toggleShowMenu = (id) => {
      setShowMenu(prevState => ({ ...prevState, [id]: !prevState[id] }));
    }

    const newItems = items.filter(item=> item.isItem === true).sort((a, b) => a.item.localeCompare(b.item));
    
    const hasItems = items.length > 0;
    const hasVisibleItems = newItems.length > 0;


    return (
     
       <View style={styles.body}>
        {!editStore && (
           <Text style={styles.totalItems}>Total Items: {items.length}</Text>
        )}
       
        <Modal 
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                 <Text style={styles.modalText}>Do you want to delete {thisItem}?</Text>
            <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={()=>setModalVisible(!modalVisible)}>
              <Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={()=>{removeItem(thisId);setModalVisible(false)}}>
              <Text style={styles.deleteText}>Delete</Text></TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>
          {editStore && (
           <View>
           <View style={styles.bothButtons}> 
            <TouchableOpacity style={styles.doneTouchable} onPress={()=>handleDone()}><Text style={styles.done}> Done </Text></TouchableOpacity>
            </View>
            <View style={styles.createShoppingListHeader}><Text style={styles.createShoppingList}>Choose Items For {editStore.name}</Text></View>
            </View>
          )}
         {hasItems && !hasVisibleItems ? (
          <View style={styles.blankScreen}/>
         ):(
          hasVisibleItems ? (
          <FlatList 
            data={newItems}
            renderItem={({ item }) => (
              
                <View >
               
                {editStore ? (
                  <View style={styles.storeListContainer}>
                  <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                  {/* <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text> */}
                   <TouchableOpacity onPress={()=>{addToShoppingList(item); }}>
                  {/* <FontAwesome5 name={'cart-plus'} size={25} color={'#32CD32'} /> */}
                <Image 
                style={styles.storeAddToCart}
                // color={'green'}
                source={require('./assets/add-to-cart-3046.png')}/>
                </TouchableOpacity>
                  </View>
                ):(
                  <View style={styles.listContainer}>

                 <View style={styles.itemAndCart}>
                  <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                  <TouchableOpacity  onPress={()=>{addToShoppingList(item); }}>
                <Image style={styles.addToCart} source={require('./assets/add-to-cart-3046.png')}/>
                </TouchableOpacity>
                </View>
               
                  {item.desc ? (
                    <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                  ):(
                   <></>
                  )}

                  <TouchableOpacity onPress={()=>{toggleShowMenu(item.id)}}>
                  {showMenu[item.id] ? (
                     <Image 
                     style={styles.arrows}
                     source={require('./assets/arro-up-3100.png')}
                   />
                  ):(
                  <Image 
                  style={styles.arrows}
                  source={require('./assets/arrow-down-3101.png')}
                />
                  )}
                 </TouchableOpacity>
                 
               
                 {showMenu[item.id] ? (
                 <View style={styles.buttonsContainer}>
                
                
                <TouchableOpacity  style={styles.fontButton}onPress={()=>{navigateToAddItemForm(item)}}>
                  {/* <FontAwesome5 name={'pen'} size={25} color={'#000080'} /> */}
               <Image 
                style={styles.addToCart}
                // color={'green'}
                source={require('./assets/pencil-5824.png')}/>
                </TouchableOpacity>              
                <TouchableOpacity  style={styles.fontButton} onPress={()=>{setModalVisible(true); setThisId(item.id); setThisItem(item.item)}}>
                  {/* <FontAwesome5 name={'trash'} size={25} color={'red'} /> */}
                <Image 
                style={styles.addToCart}
                // color={'green'}
                source={require('./assets/trash-can-10417.png')}/>
                </TouchableOpacity>
                </View>
                 ):(
                  <></>
                 )}
              
                </View>
               
               )}
              

                </View>                
            )}
            keyExtractor={(item, index) => index.toString()}
           />

         ):(
          <View style={styles.imageBody}>
          <Image 
          style={styles.logo}
          source={require('./assets/list.png')}
        />
        {editStore && newItems.length === 0? (
          <View>
            <Text>PLEASE CREATE AN ITEMS LIST</Text>
          </View>
        ):(
          <>
          <Text>NO ITEMS ARE ADDED YET</Text>
        <Text>CLICK ON THE PLUS BUTTON ON TOP OR BELOW</Text>
        <View style={styles.touchContainer}><TouchableOpacity style={styles.buttonEmpty} onPress={()=>{navigation.navigate('Item')}} >
                     <FontAwesome5 name={'plus'} size={20} color={'white'}/>
                    </TouchableOpacity></View>
                    </>
        )}
         
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
    totalItems: {
      margin: 10,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#094a85'
    },
    listContainer: {
      justifyContent: 'space-between',
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
    storeListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      width: '90%',
      height: 80,
      margin: 20,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 20,
      elevation: 5,
    },
    storeAddToCart: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    createShoppingList: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
    },
    createShoppingListHeader: {
      
    },
    goBack: {
      // marginLeft: 5,
      // marginRight: 5,
      margin: 5,
    },
    goBackImage: {
      width: 30,
      height: 30,
      margin: 5,
    },
    goBackTouchable: {
      // backgroundColor: 'yellow',
      margin: 5,
      borderRadius: 10,
      flexDirection: 'row',
    },
    done: {
      margin: 10,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    doneTouchable: {
      margin: 10,
      backgroundColor: 'green',
      borderRadius: 10,
      width: '30%',
      alignSelf: 'flex-end'  

    },
    fontButton: {
      // elevation: 10,
    },
    addToCart: {
      width: 25,
      height: 25,
      margin: 5,
      // elevation: 10,
    },
    arrows: {
      width: 15,
      height: 15,
      margin: 10,
    },
    
  itemAndCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    // marginRigth: 10,
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
      // alignItems: 'space-between',
      justifyContent: 'space-around',
      // marginHorizontal: 40,
      // paddingHorizontal: 10,
      // marginRight: 80,
      marginBottom: 10,
     
    },
    eachButton: {
      marginHorizontal: 15,
    },
    title: {
      flex: 1,
      color: 'black',
      fontSize: 20,
      // alignSelf: 'center',
    },
    subtitle: {
      color: 'gray',
      fontSize: 15,
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
},
deleteButton: {
  backgroundColor: '#FF0000', 
  borderRadius: 20, 
  margin: 20,
  elevation: 10,
},  
  });

export default Items;
