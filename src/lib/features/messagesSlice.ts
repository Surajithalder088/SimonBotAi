"use client"

import  {createSlice,PayloadAction} from "@reduxjs/toolkit"



interface Message {
    author:"user"|"ai",
    content:string|JSON
    time:string
}
interface MessageState {
    messages:Message[]
}

const initialState:MessageState={
    messages:[]
}

export const messagesSlice:any=createSlice({
    name:"messages",
    initialState,
    reducers:{
        addNewMessage:(state,action:PayloadAction<Message>)=>{
            const {author,content,time}=action.payload;
           
           
                state.messages.push({author,content,time})
            },
            clearMessages:(state)=>{
                state.messages=[]
            },
    }
})

export const {addNewMessage,clearMessages}=messagesSlice.actions;

export default messagesSlice.reducer;
