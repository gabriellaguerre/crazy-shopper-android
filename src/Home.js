import React from 'react'
import { StyleSheet, Text, View, } from 'react-native';

function Home() {
 
    return (
       <View style={styles.main}>
         <Text style={styles.text}>Crazy Shopper</Text>
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
