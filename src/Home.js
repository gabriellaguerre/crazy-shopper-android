import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem, deleteAll, deleteItem } from './redux/itemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';




function Home({navigation}) {
  const items = useSelector(selectAllItems)
 
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
    // const deleteList = async () => {
    //   try {
    //   await AsyncStorage.clear()
    //    .then(dispatch(deleteAll()))       
    //     Alert.alert('Success', 'Successfully deleted all items')
    //   } catch (error) {
    //     console.log(error)
    //   }
     
    // }

    const removeItem = async (id, item) => {
      try {
        const removeOne = dispatch(deleteItem({id}))
        await AsyncStorage.setItem('Items', JSON.stringify(removeOne))     
        Alert.alert('Success', `Successfully deleted ${item}`)
      } catch (error) {
        console.log(error)
      }
     
    }

    const navigateToAddItemForm = (item) => {
      navigation.navigate('Item', { item })
    }

    const addToShoppingList = (id, item) => {
      navigation.navigate('List', { item })
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
                {/* <View style={styles.addToList}> */}
                  <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>addToShoppingList(item.id, item.item)}>
                  <FontAwesome5 name={'plus'} size={25} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigateToAddItemForm(item)}}>
                  <FontAwesome5 name={'pen'} size={25} color={'blue'} />
                </TouchableOpacity>              
                <TouchableOpacity onPress={()=> removeItem(item.id, item.item)}>
                  <FontAwesome5 name={'trash'} size={25} color={'red'} />
                </TouchableOpacity>
                </View>
                </View>                
            )}
            keyExtractor={(item, index) => index.toString()}
           />

         ):(
          <View style={styles.empty}>
            <Text style={styles.emptyText}>THIS LIST IS EMPTY</Text>
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
      backgroundColor: 'gray',
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
