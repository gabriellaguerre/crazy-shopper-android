import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Items from './src/Items';
import List from './src/List';
// import Done from './src/Done';
import AddItemForm from './src/AddItemForm';
import AddStoreForm from './src/AddStoreForm';
import CreateShoppingListForm from './src/CreateShoppingListForm';
import Stores from './src/Stores';
import Splash from './src/Splash';
import { selectAllItems } from './src/redux/itemsSlice';
import { useSelector } from 'react-redux';
import { TouchableOpacity, StyleSheet, View } from 'react-native';



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function App() {
  const shoppingItems = useSelector(selectAllItems)
  const shoppingList = shoppingItems.filter(item=> item.isList === true)
  // const doneList = shoppingItems.filter(item => item.isDone === true)
  const itemsList = shoppingItems.filter(item=> item.isItem)

  const [isSplash, setIsSplash] = useState(true);
 
  useEffect(()=>{
    setTimeout(() => {
      setIsSplash(false);
    }, 2500);
  },[])

    
  return (
 
    <NavigationContainer>
      {isSplash ? (
         <Stack.Navigator>
         <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
       </Stack.Navigator>
      ):(

     
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if(route.name==='Items') {
              iconName='list'
              size = focused ? 25 : 20
              // color = focused ? 'blue' : 'black'
            } else if(route.name==='Stores') {
                iconName='store'
                size = focused ? 25 : 20
                // color = focused ? 'green' : 'black'
                
            }else if(route.name==='Grocery List') {
              iconName='cart-arrow-down'
              size = focused ? 25 : 20
              // color = focused ? '#7b5a60' : 'black'
            }
            // } else if(route.name==='Done List') {
            //   iconName='check-square'
            //   size = focused ? 25 : 20
            //   color = focused ? '#2F4F4F' : 'black'
            // } 
            return(
              <FontAwesome5 
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
          // tabBarOptions={
          //   activeTintColor: 'blue',
          //   inactiveTintColor: 'gray'

          // }}
        //   tabBarLabelStyle: ({color})=> {
        //     if(route.name==='Stores') {
        //       // iconName='store'
        //       // size = focused ? 25 : 20
        //       color = focused ? 'green' : 'black'
        //   }
        // }
      }
        )}
        
      >
        <Tab.Screen 
          name='Stores'
          component={StoresTabNavigator}
          options={{headerShown: false,
                    tabBarLabelStyle: {fontSize: 15}}}
        />
        <Tab.Screen 
          name='Grocery List'
          component={List} 
          options={{ tabBarBadge: shoppingList.length ? shoppingList.length :  null,
                     headerTitleAlign: 'center',
                     headerStyle: {backgroundColor: '#C0C0C0'},
                     headerTintColor: '#696969',
                     headerTitleStyle: {fontWeight: 'bold', fontSize: 25},
                     tabBarLabelStyle: {fontSize: 15}                 
          }}
          
        />
         {/* <Tab.Screen 
          name='Done List'
          component={Done}
          options={{ tabBarBadge: doneList.length ? doneList.length :  null,
                    headerTitleAlign: 'center',
                    headerStyle: {backgroundColor: '#B0E0E6'},
                    headerTintColor: '#2F4F4F',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 25},
                    tabBarLabelStyle: {fontSize: 15}
          }}
        /> */}
          <Tab.Screen 
          name='Items'
          component={ItemsTabNavigator}
          options={{ headerShown: false,
                    tabBarLabelStyle: {fontSize: 15},
                    tabBarBadge: itemsList.length ? itemsList.length :  null, 
                    }}
        />
    </Tab.Navigator>  
      )}
    </NavigationContainer>
 
  );
}

function ItemsTabNavigator(){
  const navigation = useNavigation();
  return(
   
      <Stack.Navigator>
     
      <Stack.Screen 
          name='Items List'
          component={Items}
          options={{ headerTitleAlign: 'center',
                     headerRight: ()=> <View style={styles.touchContainer}><TouchableOpacity style={styles.buttonItem} onPress={()=>{navigation.navigate('Item')}} >
                     <FontAwesome5 name={'plus'} size={20} color={'white'}/>
                    </TouchableOpacity></View>,
                    headerStyle: {backgroundColor: '#C0C0C0'},
                    headerTintColor: '#094a85',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 25},
                    
                     
                  }}
         />
        <Stack.Screen 
          name='Item'
          component={AddItemForm}
         />       
      </Stack.Navigator>
  )
}

function StoresTabNavigator(){
  const navigation = useNavigation();
  return(
   
      <Stack.Navigator>
     
      <Stack.Screen 
          name='Stores List'
          component={Stores}
          options={{ headerTitleAlign: 'center',
                     headerRight: ()=> <View style={styles.touchContainer}><TouchableOpacity style={styles.buttonStore} onPress={()=>{navigation.navigate('Store')}} >
                     <FontAwesome5 name={'plus'} size={20} color={'white'}/>
                    </TouchableOpacity></View>,
                    headerStyle: {backgroundColor: '#C0C0C0'},
                    headerTintColor: '#275214',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 25}
                     
                  }}
         />
        <Stack.Screen 
          name='Store'
          component={AddStoreForm}
         />
         <Stack.Screen 
          name='Items List'
          component={Items}
          options={{headerShown: false}}
         />
      
      </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  buttonStore: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#275214',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonItem: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#094a85',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchContainer: {
    marginRight: 10,
  }
})

export default App;
