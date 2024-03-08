import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HomeScreen from './src/Home';
import ListScreen from './src/List';
import DoneScreen from './src/Done';
import CreateListScreen from './src/CreateList';


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused, size, color, r}) => {
            let iconName;
            if(route.name==='Home') {
              iconName='home'
              size = focused ? 25 : 20
              color = focused ? 'blue' : 'black'
            } else if(route.name==='List') {
              iconName='list'
              size = focused ? 25 : 20
              color = focused ? 'blue' : 'black'
            } else if(route.name==='Done') {
              iconName='check-square'
              size = focused ? 25 : 20
              color = focused ? 'blue' : 'black'
            }
            return(
              <FontAwesome5 
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
          
        }
        )}
        tabBarOptions={{
          showLabel: false,
          activeBackgroundColor: 'Blue'
        }}
      >
        <Tab.Screen 
          name='Home'
          component={HomeTabNavigator}
        />
        <Tab.Screen 
          name='List'
          component={ListScreen}
          options={{ tabBarBadge: 3}}
        />
         <Tab.Screen 
          name='Done'
          component={DoneScreen}
          options={{ tabBarBadge: 2}}
        />
    </Tab.Navigator>  
    </NavigationContainer>
  );
}

function HomeTabNavigator(){
  return(
   
      <Stack.Navigator>
      <Stack.Screen 
          name='Home'
          component={HomeScreen}
         />
        <Stack.Screen 
          name='CreateList'
          component={CreateListScreen}
         />
      </Stack.Navigator>

   


  )
}


export default App;
