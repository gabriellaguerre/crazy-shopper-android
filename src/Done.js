// import React from 'react'
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { selectAllItems, updateItem } from './redux/itemsSlice';

// function DoneList({navigation}) {
//   const items = useSelector(selectAllItems)
//   const dispatch = useDispatch()

//   const resetItemsList = async () => {
//     const renewItems = items.filter(item => item.isDone === true)
//     renewItems.forEach(async (item) => {
//       const editItem = {id: item.id, item: item.item, desc: item.desc, price: item.price, storeName: null, isItem: true, isList: false, isDone: false }
//       dispatch(updateItem(editItem))
//       const updatedItems = items.map(item=>item.id === editItem.id ? editItem : item)
//       const jsonItemValue = JSON.stringify(updatedItems)
//       await AsyncStorage.setItem('Items', jsonItemValue)
//     })
    
    
//   }
//   const newItems = items.filter(item => item.isDone === true).sort((a, b) => a.item.localeCompare(b.item));

//   return (
//     <View style={styles.body}>
      
//     {newItems && newItems.length > 0 ? (
//      <FlatList 
//        data={newItems}
//        renderItem={({ item }) => (
//            <View style={styles.listContainer}>
//              <Text style={styles.title} numberOfLines={1}>{item.item}</Text>
//              <Text style={styles.subtitle} numberOfLines={1}> {item.desc}</Text>
//              <Text style={styles.subtitle}>{item.store}</Text>
       
//              <View style={styles.buttonsContainer}>
//            </View>
//            </View>                
//        )}
//        keyExtractor={(item, index) => index.toString()}
//       />

//     ):(
//       <View style={styles.imageBody}>
//       <Image 
//         style={styles.logo}
//         source={require('./assets/done-list.png')}
//       />
   
//     </View>
//     )}
//      <TouchableOpacity style={styles.button} onPress={async()=>{await resetItemsList().then(navigation.navigate('Stores'))}}>
//        <FontAwesome5 name={'hand-peace'} size={25} color={'white'} />
//     </TouchableOpacity>  
       
//  </View>      
// )
// }
// const styles = StyleSheet.create({
// body: {
//  flex: 1,
//  backgroundColor: '#B0E0E6',
// },
// listContainer: {
//  marginHorizontal: 40,
//  width: '90%',
//  margin: 10,
//  alignSelf: 'center',
//  backgroundColor: 'white',
//  paddingLeft: 10,
//  paddingRight: 10,
//  borderRadius: 20,
//  elevation: 5,
// },

// /*****Add Item Round Blue Button */    
// button: {
//  width: 60,
//  height: 60,
//  borderRadius: 30,
//  backgroundColor: '#2F4F4F',
//  justifyContent: 'center',
//  alignItems: 'center',
//  position: 'absolute',
//  bottom: 10,
//  right: 10,
//  elevation: 5,
// }, 
// buttonsContainer: {
//  flexDirection: 'row',
//  alignItems: 'center',
//  justifyContent: 'center',
//  margin: 10,

// },
// title: {
//  color: 'black',
//  fontSize: 30,
//  alignSelf: 'center',
// },
// subtitle: {
//  color: 'gray',
//  fontSize: 20,
// },

// /**********When List is Empty*******/
// empty: {
//  flex: 1,
//  alignItems:'center',
//  justifyContent: 'center'
// },
// emptyText: {
//  color: 'white',
//  fontSize: 40,
 
// },
// text: {
//   fontSize: 30,
//   fontWeight: 'bold',
//   fontStyle: 'italic',
//   color: 'white',
// },
// logo: {
//   width: 100,
//   height: 100,
//   margin: 20,
// },
// imageBody: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: '#B0E0E6'
// },

// });

// export default DoneList;


