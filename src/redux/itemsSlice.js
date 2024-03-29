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
                const {id, item, desc, price, store, isItem, isList, isDone} = action.payload
                const existingItem = state.find(item => item.id === id)
                if(existingItem){
                        existingItem.item = item
                        existingItem.desc = desc
                        existingItem.price = price
                        existingItem.store = store
                        existingItem.isItem = isItem
                        existingItem.isList = isList
                        existingItem.isDone = isDone

                }

        },
        deleteItem(state, action){
                const id = action.payload 
                return state.filter(item => item.id !== id);

        },
        deleteAll(state) {
                return initialState  
        },
        shoppingItems(state,action) {
                return state.filter(item => item.isList === true)
        }
            
        },
})

export const selectAllItems = (state) => state.items;

export const { addItem, updateItem, shoppingItems, deleteItem, deleteAll } = itemsSlice.actions

export default itemsSlice.reducer;