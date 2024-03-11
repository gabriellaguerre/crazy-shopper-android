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
                const {id, item, desc, price} = action.payload
                const existingItem = state.find(item => item.id === id)
                if(existingItem){
                        existingItem.item = item
                        existingItem.desc = desc
                        existingItem.price = price
                }

        },
        deleteItem(state, action){

        },
        deleteAllList(state, action){
                state = initialState
        }
            
        },
})

export const selectAllItems = (state) => state.items;

export const { addItem, updateItem, deleteItem, deleteAllList } = itemsSlice.actions

export default itemsSlice.reducer;