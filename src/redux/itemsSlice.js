import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: '1', item: 'sugar', desc: 'sweetener', price: 2.92},
    {id: '2', item: 'juice', desc: 'apple juice', price: 3.62},
    ]

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: {
            reducer(state, action) {
                state.push(action.payload)
        },
            prepare(item, desc, price){
                return {
                    payload: {
                        id: nanoid(),
                        item,
                        desc,
                        price
                    }
                }
            }
        },
      
    }
})

export const selectAllItems = (state) => state.items;

export const { addItem } = itemsSlice.actions

export default itemsSlice.reducer;