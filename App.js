import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Home from './src/Home';
import List from './src/List';
import Done from './src/Done';
import AddItemForm from './src/AddItemForm';
import Splash from './src/Splash';
import { selectAllItems } from './src/redux/itemsSlice';
import { useSelector } from 'react-redux';



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function App() {
  const shoppingItems = useSelector(selectAllItems)
  const shoppingList = shoppingItems.filter(item=> item.isList === true)
  const doneList = shoppingItems.filter(item => item.isDone === true)

  const [isSplash, setIsSplash] = useState(true);
 
  useEffect(()=>{
    setTimeout(() => {
      setIsSplash(false);
    }, 2500);
  },[])
   
  return (
    // <Provider store={store}>
    <NavigationContainer>
      {isSplash ? (
         <Stack.Navigator>
         <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
       </Stack.Navigator>
      ):(

     
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused, size, color, r}) => {
            let iconName;
            if(route.name==='Home') {
              iconName='home'
              size = focused ? 25 : 20
              color = focused ? 'blue' : 'black'
            } else if(route.name==='Shopping List') {
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
          tabBarShowLabel: false,
        }
        )}
        
      >
        <Tab.Screen 
          name='Home'
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name='Shopping List'
          component={List} 
          options={{ tabBarBadge: shoppingList.length ? shoppingList.length :  null}}
          
        />
         <Tab.Screen 
          name='Done'
          component={Done}
          options={{ tabBarBadge: doneList.length ? doneList.length :  null}}
        />
    </Tab.Navigator>  
      )}
    </NavigationContainer>
    //  </Provider>
  );
}

function HomeTabNavigator(){
  return(
   
      <Stack.Navigator>
         {/* <Stack.Screen 
          name='Splash'
          component={Splash}
          options={{ headerShown: false,
                     tabBarVisible: false,
          }}
         /> */}
      <Stack.Screen 
          name='All Items List'
          component={Home}
          // options={{ headerShown: false }}
         />
        <Stack.Screen 
          name='Item'
          component={AddItemForm}
          // options={{ headerShown: false }}
         />
      </Stack.Navigator>
  )
}


export default App;
