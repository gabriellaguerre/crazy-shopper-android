import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './itemsSlice'
import listsSlice from "./listsSlice";
import doneListsSlice from "./doneListsSlice";

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        lists: listsSlice,
        doneLists: doneListsSlice,
    }
})