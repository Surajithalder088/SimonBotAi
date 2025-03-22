"use client"

import  {createSlice,PayloadAction} from "@reduxjs/toolkit"



interface Message {
    author:"user"|"ai",
    content:string|JSON
    time:string
}
interface Chatid{
    chatid:string
}
interface MessageState {
    messages:Message[]
    chatid:string
}

const initialState:MessageState={
    messages:[],
    chatid:""
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
            initChat:(state,action:PayloadAction<string>)=>{
               
                state.chatid=action.payload;
            },
            removeChat:(state)=>{
                state.chatid=""
            }

    }
})

export const {addNewMessage,clearMessages,initChat,removeChat}=messagesSlice.actions;

export default messagesSlice.reducer;
