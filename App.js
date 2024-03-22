import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import { TouchableOpacity, StyleSheet, View } from 'react-native';



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function App({navigation}) {
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
          options={{ tabBarBadge: shoppingList.length ? shoppingList.length :  null,
                     headerTitleAlign: 'center',
                     headerStyle: {backgroundColor: '#4169E1'},
                     headerTintColor: '#B0E0E6',
                     headerTitleStyle: {fontWeight: 'bold', fontSize: 25}
          }}
          
        />
         <Tab.Screen 
          name='Done'
          component={Done}
          options={{ tabBarBadge: doneList.length ? doneList.length :  null,
                    headerTitleAlign: 'center',
                    headerStyle: {backgroundColor: '#B0E0E6'},
                    headerTintColor: '#2F4F4F',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 25}
          
          }}
        />
    </Tab.Navigator>  
      )}
    </NavigationContainer>
    //  </Provider>
  );
}

function HomeTabNavigator(){
  const navigation = useNavigation();
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
          options={{ headerTitleAlign: 'center',
                     headerRight: ()=> <View style={styles.touchContainer}><TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Item')}} >
                     <FontAwesome5 name={'plus'} size={20} color={'white'}/>
                    </TouchableOpacity></View>,
                    headerStyle: {backgroundColor: '#C0C0C0'},
                    headerTintColor: '#696969',
                    headerTitleStyle: {fontWeight: 'bold', fontSize: 25}
                     
                  }}
         />
        <Stack.Screen 
          name='Item'
          component={AddItemForm}
          // options={{ headerShown: false }}
         />
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchContainer: {
    marginRight: 10,
  }
})

export default App;
