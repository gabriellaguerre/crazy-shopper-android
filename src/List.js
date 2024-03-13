import React from 'react'
import { StyleSheet, Text, View, } from 'react-native';

function List({navigation, route}) {
  const { item: thisItem } = route.params ? route.params: 0

  console.log(thisItem, "THIS ITEM IN LIST")

  // const shoppingItems = useSelector(selectAllShoppingItems)


 
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
      backgroundColor: 'green'
    },
    text: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
    }
    
  });

export default List;
