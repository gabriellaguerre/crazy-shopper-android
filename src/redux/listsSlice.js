import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    listID: 1,
}

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        itemAdded(state, action) {
            state.list.push(action.payload)
        },
        idAugmented(state,action) {
            state.listID +=1
        }
    }
})

export const selectAllLists = (state) => state.lists;
export const { itemAdded, idAugmented } = listsSlice.actions
export default listsSlice.reducer;