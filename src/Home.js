import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem, deleteAll, updateItem, deleteItem } from './redux/itemsSlice';
import { selectAllLists, addItemToList } from './redux/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({navigation}) {
  const items = useSelector(selectAllItems)
 

  const lists = useSelector(selectAllLists)
 
  const dispatch = useDispatch()

 
  useEffect(()=>{
      dispatch(deleteAll());
      getList()
    },[])

    const getList = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('Items')
         if(jsonValue !== null){
          const itemsArray = JSON.parse(jsonValue)
        
          if(Array.isArray(itemsArray)){
            itemsArray.forEach(obj => {
          const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, store: obj.store, isItem:obj.isItem, isList: obj.isList, isDone: obj.isDone };
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
 
    // removeItem(item.id)
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
  //****************************END REMOVE ITEM************************** */

    const navigateToAddItemForm = (item) => {
      navigation.navigate('Item', { item })
    }
//**********************************EDITING AN ITEM*********************************** */
    // const editItem = async () => {
    //   try {
    //       if(item && desc && price && store) {
    //         const editItem = {id: thisitem.id, item, desc, price, store}
    //         dispatch(updateItem(editItem))
    //         navigation.goBack()
    //         Alert.alert('Success', `Successfully edited ${item}`)
    //         setItem('')
    //         setDesc('')
    //         setPrice('')
    //         setStore('')
  
    //         const updatedItems = items.map(i => (i.id === editItem.id ? editItem : i));
    //         await AsyncStorage.setItem('Items', JSON.stringify(updatedItems));
    //       } else {
    //         Alert.alert('Warning', 'Please enter all item details');
    //         await AsyncStorage.setItem('Items', jsonValue)
            
    //       } 
  
    //   }catch (error) {
    //     console.log(error)
    //   }
    //  }
//**************************************END EDITING**************************************** */
   
    const addToShoppingList = async (item) => {
      try {
        const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, store: item.store, isItem: false, isList: true, isDone: false}
        dispatch(updateItem(editItem))
        const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
        console.log(updatedItems, 'UPDATED ITEMS')
        const jsonItemValue = JSON.stringify(updatedItems)
        await AsyncStorage.setItem('Items', jsonItemValue)
        
        // dispatch(addItemToList(item))
        // const shoppingList = [...lists, item]
        // const jsonListValue = JSON.stringify(shoppingList)
        // await AsyncStorage.setItem('Lists', jsonListValue)
      } catch (error) {
        console.log(error)
      }    
       
    }

    const newItems = items.filter(item=> item.isItem === true).sort((a, b) => a.item.localeCompare(b.item));
    console.log(newItems, "NEW ITEMS")
    

    return (
     
       <View style={styles.body}>
        
         {newItems && newItems.length > 0 ? (
          <FlatList 
            data={newItems}
            renderItem={({ item }) => (
                <View style={styles.listContainer}>
                  <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                  <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                  <Text style={styles.subtitle}>${item.price} at {item.store}</Text>
               
                  <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{addToShoppingList(item); }}>
                  <FontAwesome5 name={'plus'} size={25} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigateToAddItemForm(item)}}>
                  <FontAwesome5 name={'pen'} size={25} color={'blue'} />
                </TouchableOpacity>              
                <TouchableOpacity onPress={()=> removeItem(item.id)}>
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
          source={require('./assets/crazy_shopper.png')}
        />
      </View>
         )}
     
         <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Item')}} >
           <FontAwesome5 name={'plus'} size={20} color={'white'}/>
          </TouchableOpacity>        
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
    logo: {
      width: 200,
      height: 150,
      margin: 20,
    },
    imageBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });

export default Home;
