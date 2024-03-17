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
                const {id, item, desc, price, store} = action.payload
                const existingItem = state.find(item => item.id === id)
                if(existingItem){
                        existingItem.item = item
                        existingItem.desc = desc
                        existingItem.price = price
                        existingItem.store = store
                }

        },
        deleteItem(state, action){
                const id = action.payload 
                console.log(id, 'IN SLICE')
                console.log(state.filter(item => item.id !== id),"STATE IN SLICE")

                return state.filter(item => item.id !== id);

        },
        deleteAll(state) {
                return initialState  
          }
            
        },
})

export const selectAllItems = (state) => state.items;

export const { addItem, updateItem, deleteItem, deleteAll } = itemsSlice.actions

export default itemsSlice.reducer;