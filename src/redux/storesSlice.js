import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = []

const itemsSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        addStore(state, action) {
                state.push(action.payload)
        },
        updateStore(state, action){
                const {id, name } = action.payload
                const existingStore = state.find(item => item.id === id)
                if(existingStore){
                        existingStore.name = name
                }

        },
        deleteStore(state, action){
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

export const selectAllStores = (state) => state.stores;

export const { addItem, updateItem, shoppingItems, deleteItem, deleteAll } = storesSlice.actions

export default storesSlice.reducer;