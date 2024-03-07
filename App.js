/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


function App() {
  

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Crazy Shopper</Text>
    </View>
  );
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

export default App;
