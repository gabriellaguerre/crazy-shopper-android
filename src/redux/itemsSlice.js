import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = []

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, action) {
                state.push(action.payload)
        },
        updateItem(state, action){
                const {id, item, desc, price, isItem, isList, isDone, storeName} = action.payload
                const existingItem = state.find(item => item.id === id)
                if(existingItem){
                        existingItem.item = item
                        existingItem.desc = desc
                        existingItem.price = price
                        existingItem.isItem = isItem
                        existingItem.isList = isList
                        existingItem.isDone = isDone
                        existingItem.storeName = storeName

                }

        },
        deleteItem(state, action){
                const id = action.payload 
                return state.filter(item => item.id !== id);

        },
        deleteAllItems(state) {
                return initialState  
        },
        shoppingItems(state,action) {
                return state.filter(item => item.isList === true)
        }
            
        },
})

export const selectAllItems = (state) => state.items;

export const { addItem, updateItem, shoppingItems, deleteItem, deleteAllItems } = itemsSlice.actions

export default itemsSlice.reducer;