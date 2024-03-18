import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem, deleteAll, deleteItem } from './redux/itemsSlice';
import { selectAllLists, addItemToList } from './redux/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({navigation}) {
  const items = useSelector(selectAllItems)
  console.log(items, "ITEMS IN HOME COMPONENT")

  const lists = useSelector(selectAllLists)
 
  const dispatch = useDispatch()
  
  useEffect(()=>{
      dispatch(deleteAll());
      getList()
    },[])

    const getList = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('Items')
         console.log(jsonValue, 'JSON VALUE IN GET LIST HOME COMPONENT')
         if(jsonValue !== null){
          const itemsArray = JSON.parse(jsonValue)
          // console.log(itemsArray,Array.isArray(itemsArray), 'ITEMS ARRAY')
          if(Array.isArray(itemsArray)){
            itemsArray.forEach(obj => {
          const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price, store: obj.store };
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
        dispatch(addItemToList(item))
        const shoppingList = [...lists, item]
        const jsonListValue = JSON.stringify(shoppingList)
        await AsyncStorage.setItem('Lists', jsonListValue)
      } catch (error) {
        console.log(error)
      }    
       
    }
    

    return (
     
       <View style={styles.body}>
        
         {items && items.length > 0 ? (
          <FlatList 
            data={items}
            renderItem={({ item }) => (
                <View style={styles.listContainer}>
                  <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                  <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                  <Text style={styles.subtitle}>${item.price} at {item.store}</Text>
               
                  <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>{addToShoppingList(item); removeItem(item.id)}}>
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
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Crazy Shopper</Text>
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
    }
    
  });

export default Home;
