"use client"

import { JsonValue } from "@prisma/client/runtime/library"
import  {createSlice,PayloadAction} from "@reduxjs/toolkit"



interface Message {
    author:string,
    content:string|JsonValue|null
    time:string
}

interface MessageState {
    messages:Message[]
    chatid:string|undefined
    isGenerating:boolean
    temp:boolean
}

const initialState:MessageState={
    messages:[],
    chatid:"",
    isGenerating:false,
    temp:false
}

export const messagesSlice=createSlice({
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
            initChat:(state,action:PayloadAction<string|any |undefined>)=>{
               
                state.chatid=action.payload;
            },
            removeChat:(state)=>{
                state.chatid=""
            },
            generating:(state)=>{
                state.isGenerating=true
            },
            notGenerating:(state)=>{
                state.isGenerating=false
            },
            trueTemp:(state)=>{
                state.temp=true
            },
            falseTemp:(state)=>{
                state.temp=false
            }

    }
})

export const {addNewMessage,clearMessages,initChat,removeChat,generating,notGenerating,trueTemp,falseTemp}=messagesSlice.actions;

export default messagesSlice.reducer;
