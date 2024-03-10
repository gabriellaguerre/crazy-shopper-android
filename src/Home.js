import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItems, itemAdded } from './redux/itemsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Home({navigation}) {
  const items = useSelector(selectAllItems)
  const dispatch = useDispatch()

  console.log(items)
    
  // useEffect(()=>{
  //     getList()
  //   },[])

  //   const getList = () => {
  //     AsyncStorage.getItem('Lists')
  //     .then(lists=>{
  //          const parsedLists = JSON.parse(lists)
  //          if(parsedLists && typeof parsedLists === 'object'){
  //           dispatch(itemAdded(parsedLists))
  //          }
  //     })
  //     .catch(err => console.log(err))
  //   }
    return (
     
       <View style={styles.main}>
         <Text style={styles.text}>Items List</Text>
         {items.map(item => (
            <Text key={item.id}>{item.item} {item.desc.substring(0,25)} {item.price}</Text>
         ))}
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
    }
    
  });

export default Home;
