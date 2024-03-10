import { configureStore } from "@reduxjs/toolkit";
import listsReducer from './listsSlice'

export const store = configureStore({
    reducer: {
        lists: listsReducer
    }
})