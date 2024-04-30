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
                const {id, name } = action.payload
                const existingStore = state.find(store => store.id === id)
                if(existingStore){
                        existingStore.name = name
                }

        },
        deleteStore(state, action){
                const id = action.payload 
                return state.filter(store => store.id !== id);

        },
        deleteAll(state) {
            return initialState  
        },
        // shoppingItems(state,action) {
        //         return state.filter(item => item.isList === true)
        // }
            
        },
})

export const selectAllStores = (state) => state.stores;

export const { addStore, updateStore, deleteStore, deleteAll } = storesSlice.actions

export default storesSlice.reducer;