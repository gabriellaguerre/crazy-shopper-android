import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Home from './src/Home';
import List from './src/List';
import Done from './src/Done';


const Tab = createBottomTabNavigator()

function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name='Home'
          component={Home}
        />
        <Tab.Screen 
          name='List'
          component={List}
        />
         <Tab.Screen 
          name='Done'
          component={Done}
        />
   
    </Tab.Navigator>
    </NavigationContainer>
  );
}



export default App;
