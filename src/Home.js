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
          const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price };
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
         {/* <Text style={styles.text}></Text> */}
         <View style={styles.item_row}>
         {items && items.length > 0 ? (
          <FlatList 
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity 
                    style={styles.item}
                    onPress={()=>{navigateToAddItemForm(item)                
                    }}
                    >
                <View style={styles.item_row}>
                  <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                <Text style={styles.subtitle}>${item.price}</Text>
                <Text style={styles.subtitle}>{item.store}</Text>
                <View style={styles.addToList}>
                <Button 
                  title='Add To Shopping List'
                  color='green'
                  onPress={()=>addToShoppingList(item.id, item.item)}
                  />
                  </View>
                  
                </View>
                <View style={styles.delete}>
                <TouchableOpacity
                   onPress={()=> removeItem(item.id, item.item)}>
                  <FontAwesome5 
                    name={'trash'}
                    size={25}
                    color={'red'}
                  />
                </TouchableOpacity>
                </View>
                </View>
                
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
           />

         ):(
          <View style={styles.empty}>
            <Text style={styles.emptyText}>THIS LIST IS EMPTY</Text>
          </View>
         ) 
         
         }
         </View>
         <TouchableOpacity 
          style={styles.button}
          onPress={()=>{
            navigation.navigate('Item')}}
          >
           <FontAwesome5 
            name={'plus'}
            size={20}
            color={'white'}
            />
          </TouchableOpacity>
          {/* <View style={styles.removeAll}>
          <Button 
            title='Delete ALL'
            color='red'
            borderRadius='30'
            onPress={deleteList}
          />
          </View> */}
        
      </View>      
    )
}
const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: 'gray'
    },
    text: {
      margin: 20,
      fontSize: 20,
      color: 'blue',
      fontWeight: 'bold'
    },
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
    delete: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      // marginRight: 10,
    },
    removeAll: {
      width: 100,
      height: 60,
      
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 10,
      bottom: 10,
    },
    item_row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    item_body: {
      flex: 1,
      justifyContent: 'center'
    },
    item: {
      marginHorizontal: 10,
      marginVertical: 7,
      paddingLeft: 10,
      marginTop: 10,
      width: 'auto',
      // height: 100,
      backgroundColor: 'white',
      justifyContent: 'center',
      borderRadius: 10,
      // elevation: 5, 
    },
    title: {
      color: 'black',
      fontSize: 30,
      alignSelf: 'center',
      // margin: 5,
    },
    subtitle: {
      color: 'gray',
      fontSize: 20,
      // margin: 5,
    },
    addToList: {
      width: 200,
      margin: 20,
      alignSelf: 'center'
    },
    empty: {
      flex: 1,
      alignItems:'center',
    },
    emptyText: {
      color: 'white',
      fontSize: 40,
    }
    
  });

export default Home;
