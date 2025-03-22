"use client"

import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../features/messagesSlice"
import userSlice from "../features/userSlice";
export const store=configureStore({
    reducer:{
            messages:messagesReducer,
            users:userSlice
           
    },
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch