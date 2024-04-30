import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './itemsSlice'
import storesReducer from './storesSlice'


export const store = configureStore({
    reducer: {
        items: itemsReducer,
        stores: storesReducer,
        
    }
})