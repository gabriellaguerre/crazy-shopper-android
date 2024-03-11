import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, addItem, removeList } from './redux/itemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from '@reduxjs/toolkit';



function Home({navigation}) {
  const items = useSelector(selectAllItems)
 
  const dispatch = useDispatch()

  console.log(items, 'ITEMS IN HOME PAGE')
    
  useEffect(()=>{
      getList()
    },[])

    const getList = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('Items')
         console.log(jsonValue, 'JSON VALUE IN HOME')
         if(jsonValue !== null){

          const itemsArray = JSON.parse(jsonValue)
          itemsArray.forEach(obj => {
          const thisItem = { id: obj.id, item: obj.item, desc: obj.desc, price: obj.price };
          dispatch(addItem(thisItem));
          });
         }
      } catch (error) {
        console.error('Error loading items:', error)
        
      }
  
    }
    const deleteList = async () => {
      try {
      await AsyncStorage.clear()
       .then(dispatch(removeList()))
       .then(navigation.navigate('Home'))
     
        
        Alert.alert('Success', 'Successfully deleted all items')
      } catch (error) {
        console.log(error)
      }
     
    }
    // const navigateToAddItemForm = (item) => {
    //   navigation.n
    // }

    return (
     
       <View style={styles.main}>
         <Text style={styles.text}>Items List</Text>
         <FlatList 
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity 
                    style={styles.items}
                    onPress={()=>{
                    navigation.navigate('AddItemForm', { item })
                    }}
                    >
                <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
                <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
                <Text style={styles.subtitle}>${item.price}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
         />
       
         <TouchableOpacity 
          style={styles.button}
          onPress={()=>{
            navigation.navigate('AddItemForm')}}
          >
           <FontAwesome5 
            name={'plus'}
            size={20}
            color={'white'}
            />
          </TouchableOpacity>
          <Button 
            title='Delete list'
            color='red'
            onPress={deleteList}
          />
        
      </View>
   
      
    )

}
const styles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: 'yellow'
    },
    text: {
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
    items: {
      marginHorizontal: 10,
      marginVertical: 7,
      paddingLeft: 10,
      width: 300,
      backgroundColor: 'white',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 5, 
    },
    title: {
      color: 'black',
      fontSize: 30,
      margin: 5,
    },
    subtitle: {
      color: 'gray',
      fontSize: 20,
      margin: 5,
    }
    
  });

export default Home;
