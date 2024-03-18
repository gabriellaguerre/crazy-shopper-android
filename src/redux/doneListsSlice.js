import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const doneListsSlice = createSlice({
    name: 'doneLists',
    initialState,
    reducers: {
        addItemToDoneList(state, action) {
            state.push(action.payload)
    },
    //    deleteItemFromList(state, action){
    //         const {id} = action.payload 
    //         return state.filter(list => list.id !== id);
    // },
    deleteDoneList(state) {
        return initialState  
  }
}

})

export const selectAllDoneLists = (state) => state.doneLists

export const { addItemToDoneList,  deleteDoneList } = doneListsSlice.actions

export default doneListsSlice.reducer;