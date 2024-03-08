import React from 'react'
import { Button, StyleSheet, Text, View, } from 'react-native';
import CreateList from './CreateList';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';



function Home({navigation}) {
 
    return (
     
       <View style={styles.main}>
         <Text style={styles.text}>Crazy Shopper</Text>
         <Button 
          title='Add Item'
          onPress={()=>navigation.navigate('CreateList')}
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
    }
    
  });

export default Home;
