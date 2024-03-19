import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addItemToList(state, action) {
            state.push(action.payload)
    },
       deleteItemFromList(state, action){
            const id = action.payload 
            return state.filter(item => item.id !== id);
    },
    deleteList(state) {
        return initialState  
  }
}

})

export const selectAllLists = (state) => state.lists

export const { addItemToList, deleteItemFromList, deleteList } = listsSlice.actions

export default listsSlice.reducer;