import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

function Splash({navigation}) {
    
    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace('All Items List')
        },2500)
    },[])
    
    return (
      <View style={styles.body}>
        <Image 
          style={styles.logo}
          source={require('./assets/crazy_shopper.png')}
        />
        <Text style={styles.text}> Crazy Shopper </Text>
      </View>
    )
 
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6495ED'
    // backgroundColor: '#9400D3'
  },
  logo: {
    width: 200,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
})

export default Splash
