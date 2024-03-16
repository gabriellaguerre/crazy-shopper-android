import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './itemsSlice'
import listsSlice from "./listsSlice";

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        lists: listsSlice
    }
})