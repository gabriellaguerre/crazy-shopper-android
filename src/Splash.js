import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

function Splash({navigation}) {
        
    return (
      <View style={styles.body}>
        <Image 
          style={styles.logo}
          source={require('./assets/shopping-cart-logo.png')}
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
    backgroundColor: '#EBCAAD'
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
