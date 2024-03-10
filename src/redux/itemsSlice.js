import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = []

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, action) {
                state.push(action.payload)
        }
            
        },
})

export const selectAllItems = (state) => state.items;

export const { addItem } = itemsSlice.actions

export default itemsSlice.reducer;