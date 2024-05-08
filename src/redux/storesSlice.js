import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = []

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        addStore(state, action) {
                state.push(action.payload)
        },
        updateStore(state, action){
                const {id, name, description, isStore } = action.payload
                const existingStore = state.find(store => store.id === id)
                if(existingStore){
                        existingStore.name = name
                        existingStore.description = description
                        existingStore.isStore = isStore
                }

        },
        deleteStore(state, action){
                const id = action.payload 
                // console.log(id, 'ddddddddddd')
                return state.filter(store => store.id !== id);

        },
        deleteAllStores(state) {
            return initialState  
        },
        // shoppingItems(state,action) {
        //         return state.filter(item => item.isList === true)
        // }
            
        },
})

export const selectAllStores = (state) => state.stores;

export const { addStore, updateStore, deleteStore, deleteAllStores } = storesSlice.actions

export default storesSlice.reducer;